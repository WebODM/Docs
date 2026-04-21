---
title: Installation
template: doc
---

:::tip[Did You Know?]

You can skip the installation and run WebODM from [webodm.net](https://webodm.net), which supports the development of the software ❤ Try it for [free](https://webodm.net).

:::

## Installation on your machine

If you're on Windows or macOS, the easiest way is to [download](https://webodm.org/download) the installer for your platform.

If you're on Linux, you need to use docker (see below).

### Docker

To install WebODM on your machine with docker, first install:

  - [Git](https://git-scm.com/downloads)
  - [Docker](https://www.docker.com/)

Windows and macOS users should install Docker Desktop. Then:

1. Give Docker enough CPUs (default 2) and RAM (>4Gb, 16Gb better but leave some for the operating system) by going to `Settings -- Resources`
2. Select where on your hard drive you want virtual hard drives to reside (`Settings -- Resources -- Advanced`).

Then:

* Open Git Bash (Windows), or from the command line (Mac / Linux / WSL), type:

```bash
git clone https://github.com/WebODM/WebODM --config core.autocrlf=input --depth 1
cd WebODM
./webodm.sh start
```

* If you face any issues at the last step on Linux, make sure your user is part of the docker group:

```bash
sudo usermod -aG docker $USER
exit
(restart shell by logging out and then back-in)
./webodm.sh start
```

🎉 **Congratulations!** You should be up and running. Open a browser to http://localhost:8000

To stop WebODM press CTRL+C or run:

```
./webodm.sh stop
```

To update WebODM to the latest version use:

```
./webodm.sh update
```

:::note[Disk Storage]

By default data is stored in docker named volumes. See [Where Are My Files Stored?](/faq/#where-are-my-files-stored)

To change that, see below.

:::


If you are planning to process large amounts of data or you're running out of disk space, configure `--media-dir` and/or `--node-dir`:

```
./webodm.sh restart --media-dir /storage/media --node-dir /storage/node
```

| Argument      | Description                                                                                                                                              |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--node-dir`  | Path where temporary files will be stored during processing when using the default node. Safe the change.                                                                 |
| `--media-dir` | Where all files related to a project and task are permanently stored. Try not change this folder after the first startup, unless as part of a [migration](#backup-and-restore). |

## Installation on other machines

### Google Compute, Amazon AWS

These steps are for Google Cloud, but can also be used for Amazon AWS, and other cloud platforms with small modifications:

1. Launch a Google Cloud instance of Ubuntu LTS.
2. Open the SSH terminal - Google offers SSH via the website.
3. Run `sudo apt-get update`
4. Run `sudo apt-get upgrade`
5. Install [docker-compose](https://docs.docker.com/compose/install/). Do not install via apt for 24.04 onward.
6. Run `sudo apt-get install python-pip`
7. Run `git clone https://github.com/WebODM/WebODM --config core.autocrlf=input --depth 1`
8. cd WebODM (Linux is case sensitive)
9. `sudo ./webodm.sh start`
10. You now can access WebODM via the public IP address for your Google instance. Remember the default port of 8000.
11. Check that your instance's firewall is allowing inbound TCP connections on port 8000! If you forget this step you will not be able to connect to WebODM.
12. Open http://publicip:8000

To setup the firewall on Google Cloud, open the instance, on the middle of the instance settings page find NIC0. Open it, and then add the TCP Port 8000 for ingress, and egress on the firewall.


### NAS (Qnap)

If you use [Lightning](https://webodm.net) or another processor node the requirements for WebODM are low enough for it to run on a fairly low power device such as a NAS. Testing has been done on a Qnap-TS264 with 32Gb of RAM (Celeron  N5095 processor)
To install WebODM on a Qnap NAS:

1. Enable ssh access to the NAS in control panel
2. Install git. This might be easily achieved using the [qgit qkpg](https://www.myqnap.org/product/qgit/)
3. Follow the “Installation with Docker” instructions above.
4. A new "webodm" application should appear in container station along with four individual containers for the app.
5. WebODM should be available at port 8000 of the NAS.
6. Setup a Lightning account online and configure it within "processing nodes". It's also possible to setup a more powerful computer to run processing tasks instead of Lightning.


## Advanced Setups

### Manage Processing Nodes

WebODM can be linked to one or more processing nodes that speak the [NodeODX API](https://github.com/WebODM/NodeODX/blob/master/docs/index.adoc), such as [NodeODX](https://github.com/WebODM/NodeODX), [NodeMICMAC](https://github.com/OpenDroneMap/NodeMICMAC/), [ClusterODX](https://github.com/WebODM/ClusterODX) and [Lightning](https://webodm.net). The default configuration includes a "node-odx-1" processing node which runs on the same machine as WebODM, just to help you get started. As you become more familiar with WebODM, you might want to install processing nodes on separate machines.

Adding more processing nodes will allow you to run multiple jobs in parallel.

You can also setup a [ClusterODX](https://github.com/WebODM/ClusterODX) node to run a single task across multiple machines with [distributed split-merge](https://docs.opendronemap.org/large/?highlight=distributed#getting-started-with-distributed-split-merge) and process dozen of thousands of images more quickly, with less memory.

If you don't need the default "node-odx-1" node, simply pass `--default-nodes 0` flag when starting WebODM:

`./webodm.sh restart --default-nodes 0`.

Then from the web interface simply manually remove the "node-odx-1" node.


### Enable SSL

WebODM has the ability to automatically request and install a SSL certificate via [Let’s Encrypt](https://letsencrypt.org/), or you can manually specify your own key/certificate pair.

 - Setup your DNS record (webodm.myorg.com --> IP of server).
 - Make sure port 80 and 443 are open.
 - Run the following:

```bash
./webodm.sh restart --ssl --hostname webodm.myorg.com
```

That's it! The certificate will automatically renew when needed.

If you want to specify your own key/certificate pair, simply pass the `--ssl-key` and `--ssl-cert` option to `./webodm.sh`. See `./webodm.sh --help` for more information.

Note! You cannot pass an IP address to the hostname parameter! You need a DNS record setup.

### Enable OIDC Authentication

WebODM supports [OIDC](https://openid.net/) (OpenID Connect) authentication, which means you can provide a Single Sign On (SSO) experience using an auth provider like Google. To enable one or more providers, create a `local_settings.py` file with the following:

```python
OIDC_AUTH_PROVIDERS = [
    {
        'name': 'Google',
        'icon': 'fab fa-google', # valid Font-Awesome icon, or leave blank 
        'client_id': '<OAUTH2_CLIENT_ID>',
        'client_secret': '<OAUTH2_CLIENT_SECRET>',
        'auth_endpoint': 'https://accounts.google.com/o/oauth2/v2/auth',
        'token_endpoint': 'https://oauth2.googleapis.com/token',
        'userinfo_endpoint': 'https://openidconnect.googleapis.com/v1/userinfo'
    },
    # Add more providers below
]

# Optional, set restrictions on who can login
# if not set, anyone with a Google email can login
OIDC_AUTH_EMAILS = ["@myorg.com", "user@gmail.com"]
```

The `client_id` and `client_secret` values are given by the auth provider. You'll need to register an application. With Google, you can do that from the [Google Cloud Console](https://console.cloud.google.com).

When registering the application, set the **Authorized redirect URIs** with:

 * `https://webodm.myorg.com/oidc/callback/`

The endpoint URLs are often published at a `.well-known/openid-configuration` URL. For example, Google publishes theirs at https://accounts.google.com/.well-known/openid-configuration.

Then restart WebODM with:

```
./webodm.sh restart --settings /path/to/local_settings.py
```

### Enable IPv6

Your installation must first have a public IPv6 address.
To enable IPv6 on your installation, you need to activate IPv6 in Docker by adding the following to a file located at /etc/docker/daemon.json:

```bash
{
  "ipv6": true,
  "fixed-cidr-v6": "fdb4:4d19:7eb5::/64"
}
```
Restart Docker:
`systemctl restart docker`

To add IPv6, simply run:

`./webodm.sh restart --ipv6`

Note: When using `--ssl` mode, you cannot pass an IP address to the hostname parameter; you must set up a DNS AAAA record. Without `--ssl` mode enabled, access the site at (e.g., http://[2001:0db8:3c4d:0015::1]:8000). The brackets around the IPv6 address are essential!
You can add a new NodeODX node in WebODM by specifying an IPv6 address. Don't forget to include brackets around the address! e.g., [2001:0db8:fd8a:ae80::1]

### Enable MicMac

WebODM can use [MicMac](https://github.com/OpenDroneMap/micmac) as a processing engine via [NodeMICMAC](https://github.com/OpenDroneMap/NodeMICMAC/). To add MicMac, simply run:

`./webodm.sh restart --with-micmac`

This will create a "node-micmac-1" processing node on the same machine running WebODM. Please note that NodeMICMAC is in active development and is currently experimental. If you find issues, please [report them](https://github.com/OpenDroneMap/NodeMICMAC/issues) on the NodeMICMAC repository.

## Common Troubleshooting

| Symptoms                                                                                                                        | Possible Solutions                                                                                                                                                                                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Run out of memory                                                                                                               | Make sure that your Docker environment has enough RAM allocated: [MacOS Instructions](http://stackoverflow.com/a/39720010), [Windows Instructions](https://docs.docker.com/desktop/settings/windows/#advanced)                                                                                                                                            |
| On Windows, docker-compose fails with `Failed to execute the script docker-compose`                                             | Make sure you have enabled VT-x virtualization in the BIOS                                                                                                                                                                                                                                                                                                |
| Cannot access WebODM using Microsoft Edge on Windows 10                                                                         | Try to tweak your internet properties according to [these instructions](http://www.hanselman.com/blog/FixedMicrosoftEdgeCantSeeOrOpenVirtualBoxhostedLocalWebSites.aspx)                                                                                                                                                                                  |
| Getting a `No space left on device` error, but hard drive has enough space left                                                 | Docker on Windows by default will allocate only 20GB of space to the default docker-machine. You need to increase that amount. See [this link](http://support.divio.com/local-development/docker/managing-disk-space-in-your-docker-vm) and [this link](https://www.howtogeek.com/124622/how-to-enlarge-a-virtual-machines-disk-in-virtualbox-or-vmware/) |
| Cannot start WebODM via `./webodm.sh start`, error messages are different at each retry                                         | You could be running out of memory. Make sure you have enough RAM available. 2GB should be the recommended minimum, unless you know what you are doing                                                                                                                                                                                                    |
| On Windows, the storage space shown on the WebODM diagnostic page is not the same as what is actually set in Docker's settings. | From Hyper-V Manager, right-click "DockerDesktopVM", go to Edit Disk, then choose to expand the disk and match the maximum size to the settings specified in the docker settings. Upon making the changes, restart docker.                                                                                                                                |
| On Linux or WSL, Warning: `GPU use was requested, but no GPU has been found`                                                    | Run `nvidia-smi` (natively) or `docker run --rm --gpus all nvidia/cuda:11.2.2-devel-ubuntu20.04 nvidia-smi` (docker) to check with [NVIDIA driver](https://www.nvidia.com/drivers/unix/) and [NVIDIA Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html).                                     |

## Common Administration Tasks

It's fairly straightforward to manage an installation of WebODM. Here's a list of common operations you might need to do:

### Reset Admin Password

If you forgot the password you picked the first time you logged into WebODM, to reset it just type:

```bash
./webodm.sh start && ./webodm.sh resetadminpassword newpass
```

The password will be reset to `newpass`. The command will also tell you what username you chose.

### Backup and Restore

If you want to move WebODM to another system, you just need to transfer the docker volumes (unless you are storing your files on the file system).

On the old system:

```bash
mkdir -v backup
docker run --rm --volume webodm_dbdata:/temp --volume `pwd`/backup:/backup ubuntu tar cvf /backup/dbdata.tar /temp
docker run --rm --volume webodm_appmedia:/temp --volume `pwd`/backup:/backup ubuntu tar cvf /backup/appmedia.tar /temp
```

Your backup files will be stored in the newly created `backup` directory. Transfer the `backup` directory to the new system, then on the new system:

```bash
ls backup # --> appmedia.tar  dbdata.tar
./webodm.sh down # Make sure WebODM is down
docker run --rm --volume webodm_dbdata:/temp --volume `pwd`/backup:/backup ubuntu bash -c "rm -fr /temp/* && tar xvf /backup/dbdata.tar"
docker run --rm --volume webodm_appmedia:/temp --volume `pwd`/backup:/backup ubuntu bash -c "rm -fr /temp/* && tar xvf /backup/appmedia.tar"
./webodm.sh start
```

### Update

If you use docker, updating is as simple as running:

```bash
./webodm.sh update
```

### Customizing and Extending

Small customizations such as changing the application colors, name, logo, or adding custom CSS/HTML/Javascript can be performed directly from the Customize -- Brand/Theme panels within WebODM. No need to fork or change the code.

More advanced customizations can be achieved by [writing plugins](/plugin-development-guide/). This is the preferred way to add new functionality to WebODM since it requires less effort than maintaining a separate fork. The plugin system features server-side signals that can be used to be notified of various events, a ES6/React build system, a dynamic client-side API for adding elements to the UI, a built-in data store, an async task runner, hooks to add menu items and functions to rapidly inject CSS, Javascript and Django views.

To learn more, start from the [plugin development guide](https://docs.webodm.org/plugin-development-guide/). It's also helpful to study the source code of [existing plugins](https://github.com/WebODM/WebODM/tree/master/coreplugins).

If a particular hook / signal for your plugin does not yet exist, [request it](https://github.com/WebODM/WebODM/issues). We are adding hooks and signals as we go.


## Hardware Requirements

To run a standalone installation of WebODM (the user interface), including the processing component ([NodeODX](https://github.com/WebODM/NodeODX)), we recommend at a minimum:

* 100 GB free disk space
* 16 GB RAM

Don't expect to process more than a few hundred images with these specifications. To process larger datasets, add more RAM linearly to the number of images you want to process:

| Number of Images | RAM or RAM + Swap (GB) |
| ---------------- | ---------------------- |
| 40               | 4                      |
| 250              | 16                     |
| 500              | 32                     |
| 1500             | 64                     |
| 2500             | 128                    |
| 3500             | 192                    |
| 5000             | 256                    |

:::note

These are conservative estimates. A lot of factors influence memory usage, such as image dimensions, flight altitude and processing settings. So you might be able to process more images with less memory than reported above.

:::

A CPU with more cores will speed up processing, but can increase memory usage. GPU acceleration is also supported on Linux and WSL. To make use of your CUDA-compatible graphics card, make sure to pass `--gpu` when starting WebODM. You need the nvidia-docker installed in this case, see https://github.com/NVIDIA/nvidia-docker and https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html#docker for information on docker/NVIDIA setup.

WebODM runs best on Linux, but works well on Windows and Mac too.

WebODM by itself is just a user interface and does not require many resources. WebODM can be loaded on a machine with just 1 or 2 GB of RAM and work fine without [NodeODX](https://github.com/WebODM/NodeODX). You can use a processing service such as [webodm.net](https://webodm.net) or run NodeODX on a separate, more powerful machine.