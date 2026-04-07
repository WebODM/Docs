---
title: Using Podman
---

As an alternative to Docker, one may choose to run WebODM using [Podman](https://podman.io). To do so, simply install your distribution's podman package as well as its compatibility layer for docker. For example, on Alpine Linux:

```bash
apk add podman podman-docker
```

The Podman command line bears strong resemblance to the Docker one, so referring to the past section and replacing every `docker` command invocation with `podman` is likely sufficient to teach its basic use.

### Migrating from Docker to Podman

Unfortunately, given the number of options `webodm.sh` provides for deployment, migrating between the two may require some manual work before switching platforms. If WebODM's information was stored in directories using the `--media-dir` and `--db-dir` flags, then the data within those needs to be owned by the user running the Podman containers. If running rootlessly, be sure to set this to your current user. You should be safe to recursively chown the whole git repository as such if your `media-dir` and `db-dir` lives within it:

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

### For Versions of podman-compose < 1.5.0

podman-compose versions lower than 1.5.0 lack support for environment variables in docker-compose files. If your distribution does not provide an up to date version in its repositories, you can choose to either provide your own up-to-date binary or use [Docker Compose](https://docs.docker.com/compose/install/linux/#install-the-plugin-manually) with podman itself. In either case, you'll need to update the compose_providers line of the `/etc/containers/containers.conf` file.

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

### Configuring Podman to Run Rootlessly

A major benefit of using Podman instead of Docker is due to its ability to run rootlessly. Your specific operating system may or may not configure this for you manually, but generic instructions on doing so can be found [in Podman's official documentation](https://docs.podman.io/en/latest/markdown/podman.1.html#rootless-mode). To surmise, executing the following commands is likely what you'll need to do:

```bash
sudo usermod --add-subuids 10000-75535 $(whoami)
sudo usermod --add-subgids 10000-75535 $(whoami)
```

### macOS

In theory, [installing](https://podman-desktop.io/docs/installation/macos-install) and running Podman Desktop from the official website should be all you need to use the `webodm.sh` script. Install and configure it for both [Docker compatibility](https://podman-desktop.io/docs/migrating-from-docker/customizing-docker-compatibility#enable-docker-compatibility) and [Compose functionality](https://podman-desktop.io/docs/compose/setting-up-compose).
