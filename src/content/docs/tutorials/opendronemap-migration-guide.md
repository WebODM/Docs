---
title: OpenDroneMap Migration Guide
---

:::note

On April 6th 2026, [WebODM split from OpenDroneMap](https://webodm.org/blog/announcement/). See below how to migrate to make sure you continue to receive the latest software updates from the WebODM team.

:::

This guide covers the steps needed to migrate from OpenDroneMap's ecosystem to WebODM's. In most cases, migrating is just a matter of switching to the new docker images or packages.

### WebODM

* If you're using the [native installers](https://webodm.org/download) simply download and install the latest version.

* If you're using docker, running `./webodm.sh update` will upgrade the software to the latest version and automatically point to the new repositories. 

:::note
If you purchased an installer prior to April 6th 2026, you can upgrade by installing the [latest version](https://webodm.org/download) over the previous folder. For example, if you installed WebODM in `C:\WebODM`, install it over that folder to upgrade.

If you have an installation under `C:\OpenDroneMap`, rename the folder to `C:\WebODM` and install over that folder.

Make a backup copy of the folder before doing the upgrade, just in case.
:::

If you manually added processing nodes or modified the docker .yml files, just make sure the processing nodes uses `webodm/nodeodx` instead of `opendronemap/nodeodm`. Make sure you are using `webodm/webodm_webapp` and not `opendronemap/webodm_webapp`. See the [this file](https://github.com/WebODM/WebODM/blob/master/docker-compose.nodeodm.yml).

### ODM

[ODM](https://github.com/OpenDroneMap/ODM) is replaced by [ODX](https://github.com/WebODM/ODX). Change the docker image from `opendronemap/odm` to `webodm/odx`:

```bash
docker run -ti --rm -v /my/project:/datasets/code webodm/odx --project-path /datasets
```

#### Reasons To Migrate

 * ODX is substantially faster
 * ODX is substantially smaller in size to download
 * ODX will work with all your DJI images, ODM [does not](https://github.com/OpenDroneMap/ODM/issues/2077).
 * ODX will create crack-free 3D models, ODM [does not](https://github.com/OpenDroneMap/ODM/issues/1929)
 * ODX will create 3D tiles in the correct orientation, ODM [does not](https://github.com/OpenDroneMap/ODM/issues/2073)
 * ODX merges split-merge orthophotos quickly, ODM [does not](https://github.com/OpenDroneMap/ODM/issues/2034)
 * ODX supports checkpoints, ODM [does not](https://github.com/OpenDroneMap/ODM/issues/1302)
 * ODX supports GPU feature matching, ODM [does not](https://github.com/OpenDroneMap/ODM/issues/1951)

There's [plenty of other improvements](https://github.com/WebODM/ODX/releases) that have been added to ODX that ODM does not have.

#### Developers
:::note

This information is for developers. If you didn't make changes to ODM, you can skip this section.

:::

If you added custom changes to a fork on top of ODM before April 6th 2026, you should be able to simply update the repo by rewinding to the last shared commit and fast forwarding with:

```bash
git checkout -b odxupgrade 5f05b988eb63e8900fb9b66d0d183c0cab337b7c
git remote add odx https://github.com/WebODM/ODX
git pull odx master
# Resolve conflicts if any
git commit -a -m "Upgraded to ODX"
```

If you made changes after April 6th 2026, you need to perform the same procedure, but cherry-pick or reapply your changes on top of the new source tree.

### NodeODM

[NodeODM](https://github.com/OpenDroneMap/NodeODM) is replaced by [NodeODX](https://github.com/WebODM/NodeODX). Change the docker image from `opendronemap/nodeodm` to `webodm/nodeodx`:

```bash
docker run -ti --rm -p 3000:3000 webodm/nodeodx
```

#### Reasons to Migrate

 * Guarantee compatibility with future versions of WebODM.
 * NodeODX does not have deprecation warnings.

### PyODM

[PyODM](https://github.com/OpenDroneMap/PyODM) is replaced by [PyODX](https://github.com/WebODM/PyODX). To migrate:

1. Change the import from `pyodm` to `pyodx`:

```python
from pyodx import Node
```

2. Rename `OdmError` exceptions to `GenericError`:

```python
from pyodx.exceptions import GenericError
```

There are no other changes. See also [PyODX reference](https://pyodx.webodm.org/).


#### Reasons to Migrate

 * PyODX keeps receiving updates. PyODM [does not](https://github.com/OpenDroneMap/pyodm/releases)

### ClusterODM

[ClusterODM](https://github.com/OpenDroneMap/ClusterODM) is replaced by [ClusterODX](https://github.com/WebODM/ClusterODX). Change the docker image from `opendronemap/clusterodm` to `webodm/clusterodx`:

```bash
docker run --rm -ti -p 3000:3000 -p 8080:8080 webodm/clusterodx
```

#### Reasons to Migrate

 * ClusterODX keeps receiving updates. ClusterODM [does not](https://github.com/OpenDroneMap/ClusterODM/releases)
 * ClusterODX does not have deprecation warnings.

### CloudODM

[CloudODM](https://github.com/OpenDroneMap/CloudODM) is replaced by [CloudODX](https://github.com/WebODM/CloudODX). Up to date releases are now published at [https://github.com/WebODM/CloudODX/releases/](https://github.com/WebODM/CloudODX/releases/).

#### Reasons to Migrate

 * CloudODX keeps receiving updates. CloudODM [does not](https://github.com/OpenDroneMap/cloudodm/releases)

### Migration Help

Have any questions? Join a [community](https://webodm.org/community) and someone will help you.

