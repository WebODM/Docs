---
title: Using Podman
---

As an alternative to Docker, one may choose to run WebODM using [Podman](https://podman.io). To do so, simply install your distribution's podman package as well as its compatibility layer for docker. For example, on Alpine Linux:

```bash
apk add podman podman-docker
```

The Podman command line bears strong resemblance to the Docker one, so referring to the past section and replacing every `docker` command invocation with `podman` is likely sufficient to teach its basic use.

### Running Rootlessly

Podman's main advantage over Docker is that it doesn't need a root daemon. Most distributions set up rootless mode for you automatically, but if yours doesn't, you'll need to grant your user a range of subordinate UIDs and GIDs:

```bash
sudo usermod --add-subuids 10000-75535 $(whoami)
sudo usermod --add-subgids 10000-75535 $(whoami)
```

Log out and back in afterward so the change takes effect. General background on rootless mode is available [in Podman's official documentation](https://docs.podman.io/en/latest/markdown/podman.1.html#rootless-mode). The rest of this guide assumes a rootless setup unless a step says otherwise.

### Migrating from Docker to Podman

Given the number of options `webodm.sh` provides for deployment, migrating between the two may require some manual work before switching platforms. Docker's containers write files as root by default, so if WebODM's information was stored in directories using the `--media-dir` and `--db-dir` flags, that data needs to be handed back to the user who'll be running the rootless Podman containers. `sudo` is still required for this one step, since only root can change ownership of files Docker left owned by root. You should be safe to recursively chown the whole git repository if your `media-dir` and `db-dir` live within it:

```bash
sudo chown -R $(whoami) WebODM
```

If `webodm.sh` was used without flags, then a different intervention is necessary to migrate their data.

```bash
docker volume export webodm-dbdata > webodm-dbdata.tar
docker volume export webodm-appmedia > webodm-appmedia.tar
```

Regardless of data location, you'll now need to uninstall Docker completely from your system according to your operating system's documentation. Note that, by default, the `webodm.sh` script may have taken the liberty of installing docker-compose for you. To clean that up, run the following:

```bash
rm ~/.docker/cni-plugins-docker-compose
```

Now, install Podman according to your operating system's documentation. If you needed to export the media and db dirs from Docker before, you may now use it to import the volumes.

```bash
podman volume import webodm-dbdata webodm-dbdata.tar
podman volume import webodm-appmedia webodm-appmedia.tar
```

It is recommended that you log out and log back in to your system at this point to ensure all environment variables are properly sourced.

Running `webodm.sh` now should result in user data persisting between the switch.

If your distribution enforces SELinux (Fedora, RHEL, and similar), you don't need to relabel anything by hand for a custom settings file or manual SSL certificates. WebODM's compose files already add the `:z`/`:Z` suffixes to those bind mounts, so `settings_override.py` and your certificate files pick up the right context automatically.

### GPU Passthrough

Docker requests an NVIDIA GPU through the `nvidia-container-toolkit` runtime. Podman doesn't support that mechanism. It resolves GPUs through the Container Device Interface (CDI) instead, using a device entry like `nvidia.com/gpu=all`, the same way this project's own devcontainer requests a GPU.

`webodm.sh` only picks the CDI-based compose file when `podman-compose` is the compose backend actually driving your containers. If it instead falls back to a Docker Compose binary, or the `docker compose` plugin, talking to Podman over its Docker-compatible socket, GPU passthrough won't work reliably: the default node container starts, but with no GPU attached, and `webodm.sh` prints a warning telling you to install `podman-compose`. You'll also need CDI device specs generated for your GPU ahead of time. Check the NVIDIA Container Toolkit's CDI support documentation for the steps that apply to your hardware.

If GPU support on the default node matters to you, make sure `podman-compose` is installed and is what `webodm.sh` picks up, rather than relying on the Docker Compose fallback described below.

### For Versions of podman-compose < 1.5.0

podman-compose versions lower than 1.5.0 lack support for environment variables in docker-compose files. If your distribution does not provide an up to date version in its repositories, you can choose to either provide your own up-to-date binary or use [Docker Compose](https://docs.docker.com/compose/install/linux/#install-the-plugin-manually) with podman itself. Keep in mind that falling back to Docker Compose disables GPU passthrough on the default node, for the reason described above, so this workaround is best reserved for setups that don't need GPU support. In either case, you'll need to update the compose_providers line of the `/etc/containers/containers.conf` file.

If you choose to use Docker Compose instead of podman-compose, you might need to configure a few extra environment variables to tell WebODM where to send its Docker API requests to. The following environment configuration resulted in WebODM successfully spawning in Alpine Linux 3.22, though it should be fairly agnostic across distros.

```bash
export WEBODM_PODMAN_SOCKET=$(podman info --format '{{.Host.RemoteSocket.Path}}')
mkdir -p $(dirname WEBODM_PODMAN_SOCKET)
export DOCKER_HOST=unix://$WEBODM_PODMAN_SOCKET
```

Finally, start WebODM as such:

```bash
podman system service --time=0 unix://$WEBODM_PODMAN_SOCKET & ./webodm.sh start
```

### macOS

In theory, [installing](https://podman-desktop.io/docs/installation/macos-install) and running Podman Desktop from the official website should be all you need to use the `webodm.sh` script. Install and configure it for both [Docker compatibility](https://podman-desktop.io/docs/migrating-from-docker/customizing-docker-compatibility#enable-docker-compatibility) and [Compose functionality](https://podman-desktop.io/docs/compose/setting-up-compose).
