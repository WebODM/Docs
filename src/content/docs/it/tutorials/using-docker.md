---
title: Uso di Docker
template: doc
---

Poiché molti utenti utilizzano docker per installare WebODM, può essere utile comprendere alcuni comandi di base per interrogare le istanze docker quando qualcosa va storto, o quando siamo curiosi di sapere cosa sta succedendo. Docker è un ambiente containerizzato pensato, tra le altre cose, per semplificare l'installazione del software indipendentemente dall'ambiente locale. In questo senso, è simile alle macchine virtuali.

### Elencare i Container Docker

Possiamo iniziare elencando i container docker disponibili sul computer su cui stiamo lavorando, come segue:

```
> docker ps
CONTAINER ID        IMAGE                  COMMAND                  CREATED             STATUS              PORTS                    NAMES
2518817537ce        webodm/odx       "bash"                   36 hours ago        Up 36 hours                                  zen_wright
1cdc7fadf688        webodm/nodeodx   "/usr/bin/nodejs /va…"   37 hours ago        Up 37 hours         0.0.0.0:3000->3000/tcp   flamboyant_dhawan
```

Se vogliamo vedere i container che potrebbero non essere in esecuzione ma esistono ancora, possiamo aggiungere il flag `-a`:

```
> docker ps -a
CONTAINER ID        IMAGE                  COMMAND                  CREATED             STATUS                    PORTS                    NAMES
2518817537ce        webodm/odx       "bash"                   36 hours ago        Up 36 hours                                        zen_wright
1cdc7fadf688        webodm/nodeodx   "/usr/bin/nodejs /va…"   37 hours ago        Up 37 hours               0.0.0.0:3000->3000/tcp   flamboyant_dhawan
cd7b9585b8f6        webodm/odx       "bash"                   3 days ago          Exited (1) 37 hours ago                            nostalgic_lederberg
e31010c00b9a        webodm/odx       "python /code/run.py…"   3 days ago          Exited (2) 3 days ago                              suspicious_kepler
c44e0d0b8448        webodm/nodeodx   "/usr/bin/nodejs /va…"   3 days ago          Exited (0) 37 hours ago                            wonderful_burnell
```

### Accedere ai Log dell'Istanza

Utilizzando il `CONTAINER ID` oppure il nome, possiamo accedere a tutti i log disponibili sull'istanza come segue:

```bash
docker logs 2518817537ce
```

È probabile che l'output sia scomodamente lungo, ma possiamo usare il carattere pipe `|` e altri strumenti per estrarre dai log solo ciò che ci serve. Ad esempio, possiamo scorrere il log lentamente usando il comando `more`:

```
> docker logs 2518817537ce | more
[INFO]    DTM is turned on, automatically turning on point cloud classification
[INFO]    Initializing ODX app - Mon Sep 23 01:30:33  2019
[INFO]    ==============
[INFO]    build_overviews: False
[INFO]    camera_lens: auto
[INFO]    crop: 3
[INFO]    debug: False
[INFO]    dem_decimation: 1
[INFO]    dem_euclidean_map: False
...
```

Premendo `Invio` o `Spazio`, i tasti freccia oppure i tasti `Pag Su` o `Pag Giù`, potremo navigare nei log. La lettera minuscola `Q` ci permetterà di tornare alla riga di comando.

Possiamo anche estrarre solo la parte finale dei log usando il comando `tail` come segue:

```
> docker logs 2518817537ce | tail -5
[INFO]    Cropping /datasets/code/odm_orthophoto/odm_orthophoto.tif
[INFO]    running gdalwarp -cutline /datasets/code/odm_georeferencing/odm_georeferenced_model.bounds.gpkg ...
Using band 4 of source image as alpha.
Creating output file that is 111567P x 137473L.
Processing input file /datasets/code/odm_orthophoto/odm_orthophoto.original.tif.
```

Il valore `-5` indica al comando tail di restituirci solo le ultime 5 righe dei log.

### Accesso da Riga di Comando alle Istanze

A volte è necessario approfondire ulteriormente l'esplorazione del processo di OpenDroneMap. A questo scopo possiamo ottenere accesso diretto da riga di comando alle istanze usando `docker exec`:

```bash
> docker exec -ti 2518817537ce bash
root@2518817537ce:/code#
```

Ora abbiamo effettuato l'accesso alla nostra istanza docker e possiamo esplorare il sistema.

### Pulizia Dopo l'Uso di Docker

Docker fa un uso deplorevole dello spazio su disco e, per impostazione predefinita, non ripulisce i dati e le istanze in eccesso al termine dei processi. Questo può essere vantaggioso se abbiamo bisogno di accedere a un processo ormai terminato, ma comporta l'onere di utilizzare quantità crescenti di spazio di archiviazione nel tempo. Maciej Łebkowski offre un'[eccellente panoramica su come gestire l'utilizzo eccessivo del disco in docker](https://lebkowski.name/docker-volumes/).
