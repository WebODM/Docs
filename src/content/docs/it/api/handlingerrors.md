---
title: Gestione degli Errori
template: doc
---

Tutte le chiamate tramite API utilizzano i codici di stato descritti nella [Guida ai Codici di Stato del Django REST Framework](http://www.django-rest-framework.org/api-guide/status-codes/), tuttavia, in generale, è sufficiente verificare i codici di stato di successo (`200` o `204`), gestire il caso speciale della [Scadenza del Token](/it/api/authentication/#scadenza-del-token) (`403`) e segnalare un errore in tutti gli altri casi.

### Codici di Stato di Errore

Questo non è un elenco esaustivo, ma i codici di errore più comuni sono riportati di seguito. 

Codice di Stato | Descrizione
----------- | -----------
401 | Non autenticato
403 | Accesso negato (token scaduto?)
400 | Richiesta malformata
404 | Non trovato

Per motivi di sicurezza, a volte un'operazione che dovrebbe restituire `403` restituisce `404`, per evitare di rivelare ID e altre informazioni a potenziali malintenzionati.
