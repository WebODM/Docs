---
title: Avvio Rapido
template: doc
---

## Come Elaborare le Immagini

In questo tutorial esploreremo come elaborare un'ortofoto a partire da un insieme di immagini aeree utilizzando Python. Per farlo dovremo:

 - Autenticarci
 - Creare un [Progetto](/api/reference/operations/projects_create/). I progetti sono un modo per raggruppare insieme [Task](/it/api/task/) correlati
 - Caricare alcune immagini per creare un [Task](/it/api/task/)
 - Controllare lo stato di avanzamento del [Task](/it/api/task/). La fotogrammetria può richiedere molto tempo, quindi l'elaborazione dei risultati potrebbe impiegare da alcuni minuti ad alcune ore.
 - Scaricare l'ortofoto risultante.

<aside class="notice">La maggior parte degli esempi in questo documento utilizza <a href="http://docs.python-requests.org/en/latest/index.html" target="_blank">requests</a>. Assicurati che sia installato prima di eseguire qualsiasi codice:<br/><br/>

<pre class="highlight shell">
$ pip install requests
</pre>
</aside>

<aside class="notice">
Il <a href="https://github.com/WebODM/Docs/blob/main/examples/process_images.py" target="_blank">codice sorgente</a> di questo esempio è disponibile su GitHub.
</aside>

```python
import requests
res = requests.post('http://localhost:8000/api/token-auth/', 
					data={'username': 'admin',
						  'password': 'admin'}).json()
token = res['token']
```

Per prima cosa ci <a href="/it/api/authentication/">autentichiamo</a> con WebODM. Quando l'autenticazione ha esito positivo viene restituito un `token`.
<div class="clear"></div>

```python
res = requests.post('http://localhost:8000/api/projects/', 
					headers={'Authorization': 'JWT {}'.format(token)},
					data={'name': 'Hello WebODM!'}).json()
project_id = res['id']
```

Dobbiamo poi creare un [Progetto](/api/reference/operations/projects_create/). Passiamo il nostro `token` tramite l'header `Authorization`. Se dimentichiamo di passare questo header, il sistema non ci autenticherà e rifiuterà di elaborare la richiesta. Assegniamo inoltre un `name` al nostro progetto.
<div class="clear"></div>

```python
images = [
	('images', ('image1.jpg', open('image1.jpg', 'rb'), 'image/jpg')), 
	('images', ('image2.jpg', open('image2.jpg', 'rb'), 'image/jpg')),
	# ...
]
options = json.dumps([
	{'name': "orthophoto-resolution", 'value': 24}
])

res = requests.post('http://localhost:8000/api/projects/{}/tasks/'.format(project_id), 
			headers={'Authorization': 'JWT {}'.format(token)},
			files=images,
			data={
				'options': options
			}).json()

task_id = res['id']
```

Possiamo quindi creare un [Task](/it/api/task/). L'unico parametro obbligatorio è un elenco di più `images` codificate in multipart. L'elaborazione inizierà automaticamente
non appena un [Nodo di Elaborazione](/api/reference/operations/processingnodes_list/) sarà disponibile. È possibile specificare opzioni aggiuntive passando un valore `options`, ovvero un elenco codificato in JSON di coppie nome/valore. Sono disponibili diverse altre opzioni. Consulta il riferimento [Opzioni e Flag](/it/options-flags/) per maggiori informazioni.
<div class="clear"></div>

```python
while True:
	res = requests.get('http://localhost:8000/api/projects/{}/tasks/{}/'.format(project_id, task_id), 
				headers={'Authorization': 'JWT {}'.format(token)}).json()
	
	if res['status'] == status_codes.COMPLETED:
		print("Task has completed!")
		break
	elif res['status'] == status_codes.FAILED:
		print("Task failed: {}".format(res))
		sys.exit(1)
	else:
		print("Processing, hold on...")
		time.sleep(3)
```

Controlliamo periodicamente lo stato del [Task](/it/api/task/) utilizzando un ciclo.
<div class="clear"></div>

```python
res = requests.get("http://localhost:8000/api/projects/{}/tasks/{}/download/orthophoto.tif".format(project_id, task_id), 
						headers={'Authorization': 'JWT {}'.format(token)},
						stream=True)
with open("orthophoto.tif", 'wb') as f:
    for chunk in res.iter_content(chunk_size=1024): 
        if chunk:
            f.write(chunk)
print("Saved ./orthophoto.tif")
```

La nostra ortofoto è pronta per essere scaricata. Sono [disponibili anche](/it/api/task/#scaricare-gli-asset) numerosi altri asset, tra cui una nuvola di punti 3D densa e un modello con texture.

Congratulazioni! Hai appena elaborato alcune immagini.

![Successo](https://i.imgflip.com/2/ipzhf.jpg)
