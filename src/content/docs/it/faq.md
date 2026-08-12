---
title: Domande Frequenti
template: doc
---

## Qual è la relazione tra WebODM e OpenDroneMap?

WebODM faceva parte del progetto OpenDroneMap. Dal 2026, WebODM non è più affiliato né collegato a OpenDroneMap. Sono due progetti separati.

## Il software non usa sempre tutti i core della CPU / la memoria / la GPU. È normale?

Sì. Il software cerca di utilizzare tutte le risorse disponibili, quando possibile, ma non sempre. È normale osservare un utilizzo della CPU del 10-15% in diversi momenti dell'elaborazione e un utilizzo della GPU dello 0% per lunghi periodi.

## Come posso ottenere mappe alla massima risoluzione?

Imposta [orthophoto-resolution](/it/options-flags/#orthophoto-resolution) e [dem-resolution](/it/options-flags/#dem-resolution) a un valore basso come `0.01`.

## Dove Sono Memorizzati i Miei File?

Quando si usa Docker, tutti i risultati dell'elaborazione sono memorizzati in un volume docker e non sono disponibili sul filesystem dell'host. Ci sono due volumi docker di particolare interesse:
1. Media (chiamato webodm_appmedia): è qui che vengono memorizzati tutti i file relativi a un progetto e a un task.
2. Postgres DB (chiamato webodm_dbdata): è ciò che il database Postgres utilizza per memorizzare i propri dati.

Per maggiori informazioni su come questi due volumi vengono utilizzati e in quali container, consulta il file [docker-compose.yml](https://github.com/WebODM/WebODM/blob/master/docker-compose.yml).

Per vari motivi, come la facilità di backup/ripristino, se vuoi memorizzare i tuoi file sul filesystem dell'host invece che in un volume docker, devi passare un percorso tramite le opzioni `--media-dir` e/o `--db-dir`:

```bash
./webodm.sh restart --media-dir /home/user/webodm_data --db-dir /home/user/webodm_db
```

Nota che i risultati dei task esistenti non saranno disponibili dopo la modifica. Consulta la sezione [Migrate Data Volumes](https://docs.docker.com/engine/tutorials/dockervolumes/#backup-restore-or-migrate-data-volumes) della documentazione di Docker per informazioni sulla migrazione dei risultati dei task esistenti.

## Posso elaborare due o più GeoTIFF di ortofoto per unirli insieme?

No. WebODM è un software fotogrammetrico e le ortofoto non contengono le informazioni necessarie sulla fotocamera, poiché le immagini sono già state ortorettificate. Per farlo puoi usare questo [plugin QGIS](https://github.com/uav4geo/QRasterMerge).

## Se uso la versione nativa del software, come posso allocare più risorse per l'elaborazione?

Non è necessario; la versione nativa (non docker) del software utilizza già tutte le risorse disponibili.

## Voglio realizzare un'applicazione commerciale che include WebODM. Ho bisogno di una licenza commerciale?

WebODM è software libero e open source, rilasciato sotto licenza [AGPLv3](https://github.com/WebODM/WebODM/blob/master/LICENSE.md). Sei libero di realizzare e vendere applicazioni con esso, purché tu rispetti i requisiti della licenza, in particolare l'obbligo di divulgazione del codice sorgente, e segua le nostre [linee guida sul marchio](https://github.com/WebODM/WebODM/blob/master/TRADEMARK.md).

## Esistono altre opzioni di licenza oltre alla AGPLv3?

No, spiacenti!

## Il tuo computer sta esaurendo la memoria. Cosa puoi fare?

1. Innanzitutto puoi acquistare più RAM: questa è la soluzione definitiva.
2. In alternativa puoi ridimensionare le immagini durante il caricamento e/o regolare le impostazioni di qualità.
3. Configurare un file di swap. Sia in Windows che in Linux avrai bisogno preferibilmente di un SSD veloce o di un'unità NVME, e il processo di calcolo sarà comunque MOLTO più lento.

   - Se usi Windows con [Docker+WSL2](https://docs.docker.com/desktop/windows/wsl/) puoi aggiungere due righe nel tuo file .wslconfig in modo che Docker utilizzi un file di swap. Consulta anche la documentazione completa di Microsoft su [Advanced settings configuration in WSL](https://docs.microsoft.com/en-us/windows/wsl/wsl-config).

     ```
     swap=128GB
     swapfile=C:\temp\wsl-swap.vhdx
     ```

   - In Linux puoi aggiungere un file di swap o una partizione dedicata allo swap. Per maggiori informazioni, consulta il tuo motore di ricerca preferito, poiché esistono molte distribuzioni e metodi diversi per aggiungere lo swap.
