---
title: Autenticazione
template: doc
---

### Nozioni di Base sull'Autenticazione

> Ottenere il token di autenticazione:

```bash
curl -X POST -d "username=testuser&password=testpass" http://localhost:8000/api/token-auth/

{"token":"eyJ0eXAiO..."}
```

> Utilizzare il token di autenticazione:

```bash
curl -H "Authorization: JWT <your_token>" http://localhost:8000/api/projects/

{"count":13, ...}
```

> Utilizzare il token di autenticazione tramite querystring (meno sicuro):

```bash
curl http://localhost:8000/api/projects/?jwt=<your_token>

{"count":13, ...}
```


`POST /api/token-auth/`

Campo | Tipo | Descrizione
----- | ---- | -----------
username | string | Nome utente
password | string | Password

Per accedere all'API è necessario fornire un nome utente e una password validi. Puoi creare gli utenti dalla pagina di Amministrazione di WebODM.

Se l'autenticazione ha esito positivo, ti verrà rilasciato un token. Tutte le chiamate API devono includere il seguente header:

Header |
------ |
Authorization: JWT `your_token` |

Il token scade dopo un determinato periodo di tempo. Consulta [Scadenza del Token](#scadenza-del-token) per maggiori informazioni.

Poiché a volte le applicazioni non consentono di modificare gli header, è anche possibile autenticarsi aggiungendo il parametro querystring `jwt` a un URL protetto. Questo metodo è meno sicuro, quindi se possibile passa il token tramite header.


### Scadenza del Token

Per impostazione predefinita il token scade dopo sei ore. Il tempo di scadenza è definito nel modulo settings di Django in WebODM. Se compili WebODM dai sorgenti o lo esegui in modo nativo, il tempo di scadenza può essere modificato tramite la variabile `JWT_AUTH['JWT_EXPIRATION_DELTA']`. In caso contrario, ad esempio se utilizzi le immagini docker, dovrai richiedere un nuovo token quando un token scade.

Puoi capire che un token è scaduto se una qualsiasi chiamata API restituisce un codice di stato `403` con il corpo JSON `{'detail': 'Signature has expired.'}`.
