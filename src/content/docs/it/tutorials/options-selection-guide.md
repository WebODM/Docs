---
title: Guida alla Selezione delle Opzioni
template: doc
---

Questa guida ti aiuta a scegliere i parametri di elaborazione di WebODM più appropriati in base al tuo drone, alle caratteristiche del rilievo e ai risultati attesi.
Nota bene: questa guida non è perfetta; trovare i parametri giusti non è sempre un processo deterministico—il più delle volte è un'arte che trascende gli algoritmi.

---
# Passo 1 - Analisi dell'Hardware

## Il tuo drone utilizza un Global Shutter o un Rolling Shutter?

### Se stai utilizzando un drone consumer (DJI Mini, DJI Air, Mavic, ecc.)

**Impostazione consigliata**
- `rolling-shutter: true`
**Perché?**
I sensori rolling shutter introducono distorsioni geometriche quando le immagini vengono acquisite mentre il drone è in movimento.
**Buona pratica**
Per i rilievi futuri, se possibile:
- riduci la velocità di volo;
- usa la modalità **Stop-and-Hover** durante l'acquisizione delle fotografie.

---

# Passo 2 - Caratteristiche del Rilievo

## Le immagini includono il cielo o l'orizzonte?
### Se sì
**Impostazione consigliata**
```text
sky-removal: true
```
### Benefici
- Meno rumore nella ricostruzione
- Nuvola di punti più pulita
- Migliore qualità della mesh

## Per la ricostruzione di oggetti a distanza ravvicinata
Usa:
```text
bg-removal
```
---
# Passo 3 - Scena Rilevata
## L'area contiene vegetazione o superfici a bassa texture?
Esempi:
- foreste
- praterie
- campi agricoli
- sabbia
- neve

**Impostazione consigliata**
```text
min-num-features: 20000
```

### Effetto
- aumenta il numero di punti caratteristici rilevabili;
- migliora la robustezza della ricostruzione;
- aumenta il tempo di elaborazione.

---

## Il progetto include edifici o strutture verticali?
**Impostazioni consigliate**
```text
pc-quality: high
```

### Benefici
- Ortofoto più accurate
- Migliore ricostruzione delle pareti verticali
- Bordi degli edifici più nitidi

---

# Passo 4 - Ground Sampling Distance (GSD)
## Hai bisogno di preservare la piena risoluzione nativa della fotocamera?
Quando si vola molto basso (GSD inferiore a circa 2 cm), WebODM potrebbe ridurre automaticamente la risoluzione di elaborazione.
Per disabilitare questa ottimizzazione:

```text
ignore-gsd: true
```

### Attenzione
Questo aumenta in modo significativo:
- Utilizzo di RAM
- Spazio su disco
- Tempo di elaborazione

---

# Passo 5 - Risultato Desiderato
## Priorità: Mesh 3D Dettagliata
Parametro principale:
```text
mesh-octree-depth
```
Valori consigliati:
| Scenario | Valore |
|----------|------:|
| Terreno pianeggiante | 6–8 |
| Uso generale | 11 |
| Architettura complessa | 12 |

Se aumenti questo valore, aumenta anche:
```text
mesh-size
```
per evitare una semplificazione eccessiva della mesh.
---

## Priorità: Modello Digitale del Terreno (DTM)

Abilita:
```text
dtm: true
```
Regola questi parametri:
| Parametro | Raccomandazione |
|-----------|----------------|
| `smrf-slope` | 0.1 per terreno pianeggiante, fino a 1.2 per terreno montuoso |
| `smrf-threshold` | Altezza minima degli oggetti da rimuovere |

---

## Priorità: Elaborazione Veloce
Abilita:
```text
fast-orthophoto: true
```

### Effetto

Salta la ricostruzione densa MVS e genera l'ortofoto direttamente dalla nuvola di punti sparsa.

---

## Priorità: Elaborazione Molto Veloce

Quando l'obiettivo principale è ottenere un risultato il più rapidamente possibile (per esempio durante interventi di emergenza, valutazioni rapide, verifiche sul campo o analisi preliminari), applica le seguenti ottimizzazioni.

### Raccomandazioni per la pianificazione del volo

L'elaborazione più veloce inizia con una strategia di acquisizione ottimizzata:

- Esegui un **volo nadirale planare** quando possibile.
- Mantieni un'altitudine costante rispetto al terreno.
- Usa una spaziatura regolare delle immagini e una sovrapposizione uniforme.
- Evita immagini oblique non necessarie se un'ortofoto 2D è l'obiettivo primario.
- Evita di acquisire ampie aree al di fuori dei confini del rilievo.
- Usa una traiettoria di volo più lenta e stabile quando utilizzi fotocamere con rolling shutter.

---

### Impostazioni WebODM consigliate

#### Usa la generazione rapida dell'ortofoto

```text
fast-orthophoto: true
```

Genera l'ortofoto senza eseguire la fase completa di ricostruzione densa.

---

#### Riduci la risoluzione delle immagini durante l'elaborazione

```text
resize-to: 2048
```

o un valore inferiore a seconda della qualità richiesta per il risultato.

Benefici:

- tempo di elaborazione significativamente ridotto;
- minore consumo di RAM;
- feature matching più veloce.

---

#### Disabilita i prodotti non necessari

Genera solo i prodotti necessari per il compito.

Evita di produrre:
- nuvola di punti densa (il più importante!)
```text
fast-orthophoto: true
```

- mesh 3D texturizzata;
```text
skip-3dmodel: true
```
- (se non necessari) prodotti DEM.
```text
dsm: false
dtm: false
```

- report
```text
skip-report:true
```


Esempio:

- Mappatura di emergenza → Solo ortofoto
- Ispezione preliminare → Ortofoto + DSM a bassa risoluzione
- Rilievo finale → Flusso di elaborazione completo

---

#### Riduci la densità della nuvola di punti
(solo se hai bisogno della nuvola di punti)
Usa:

```text
pc-quality: low
```

oppure

```text
pc-quality: medium
```

quando non è richiesto un modello 3D dettagliato.

Benefici:

- ricostruzione più veloce;
- minore utilizzo del disco.

---

#### Limita la generazione della mesh

Se una mesh non è necessaria:

```text
mesh: false
```

Evitare la generazione della mesh può far risparmiare una quantità significativa di tempo di elaborazione.

---

### Ulteriori raccomandazioni operative

Per la massima velocità:

1. Carica solo le immagini necessarie.
2. Rimuovi le immagini sfocate o duplicate prima dell'elaborazione.
3. Evita immagini con grandi porzioni di cielo o sfondo irrilevante.
4. Usa un flusso di lavoro basato su aree invece di elaborare dataset molto grandi in una volta sola.
5. Suddividi i rilievi molto grandi in blocchi indipendenti più piccoli quando possibile.
6. Usa hardware di elaborazione locale con accelerazione GPU quando disponibile.

---
# Passo 6 - Software di Destinazione

## QGIS

Abilita:

```text
build-overviews: true
```

### Nota

Le versioni recenti di ODX generano già Cloud Optimized GeoTIFF (COG) se usi l'opzione `--cog`, che includono già gli overview interni.

---

## Blender

Abilita:

```text
texturing-single-material: true
gltf: true
```

### Benefici

- Importazione più semplice
- Materiale con texture singola
- Formato 3D compresso moderno

---

## Cesium o Visualizzazione Web

Abilita:

```text
3d-tiles: true
```

Questo genera 3D Tiles ottimizzati adatti allo streaming web.

---

# Passo 7 - Verifica dell'Accuratezza

## Sono disponibili Punti di Controllo a Terra (GCP)?

Per ottenere una valutazione indipendente dell'accuratezza:

1. Seleziona alcuni punti di controllo come checkpoint.
2. Aggiungi ai loro nomi il prefisso:

```text
CHK-
```

Le osservazioni dei checkpoint:

- non influenzano il bundle adjustment;
- sono utilizzate esclusivamente per calcolare statistiche indipendenti di accuratezza nel **Quality Report**.



---

# Riferimento Rapido

| Situazione | Parametro Consigliato |
|------------|----------------------|
| Drone consumer | `rolling-shutter: true` |
| Drone RTK | `gps-accuracy` |
| RTK + GCP | `force-gps: true` |
| Le immagini includono il cielo | `sky-removal: true` |
| Vegetazione densa | `min-num-features: 20000` |
| Bordi degli edifici migliori | `pc-quality: high` |
| GSD molto basso | `ignore-gsd: true` |
| Generare il DTM | `dtm: true` |
| Ortofoto veloce | `fast-orthophoto: true` |
| Esportazione per Blender | `gltf: true` |
| Esportazione per Cesium | `3d-tiles: true` |
| Validazione dell'accuratezza | Checkpoint `CHK-` |
