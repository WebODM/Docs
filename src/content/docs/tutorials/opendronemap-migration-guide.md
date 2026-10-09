---
title: OpenDroneMap Migration Guide
---

This guide covers the steps needed to migrate from OpenDroneMap's ecosystem to WebODM's ecosystem. In most cases, migrating is just a matter of switching to the new docker images or packages.

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

### ClusterODM

[ClusterODM](https://github.com/OpenDroneMap/ClusterODM) is replaced by [ClusterODX](https://github.com/WebODM/ClusterODX). Change the docker image from `opendronemap/clusterodm` to `webodm/clusterodx`:

```bash
docker run --rm -ti -p 3000:3000 -p 8080:8080 webodm/clusterodx
```

### CloudODM

[CloudODM](https://github.com/OpenDroneMap/CloudODM) is replaced by [CloudODX](https://github.com/WebODM/CloudODX). Up to date releases are now published at [https://github.com/WebODM/CloudODX/releases/](https://github.com/WebODM/CloudODX/releases/).
