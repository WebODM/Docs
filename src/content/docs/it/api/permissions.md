---
title: Permessi
template: doc
---

WebODM include un sistema standard di permessi a `livello di modello` (model level). Puoi
verificare se gli utenti hanno effettuato l'accesso e dispongono dei privilegi per agire sugli oggetti
a livello di modello (un utente può aggiungere un progetto? un utente può visualizzare i progetti?).

Oltre a questo, WebODM offre un potente sistema di permessi a `livello di riga` (row level). Puoi specificare esattamente a quali elementi un utente ha o non ha accesso, cosa può eliminare, modificare, ecc.

Le modifiche ai permessi degli oggetti possono essere gestite tramite la pagina di `Amministrazione` di WebODM. 

Stiamo pianificando di rendere più semplice la gestione dei permessi tramite API per utenti e sviluppatori. Si tratta di un lavoro in corso.


### Valori dei Permessi

Permesso | Descrizione
----- | -----------
delete | L'oggetto può essere eliminato
change | L'oggetto può essere modificato
add | Un oggetto correlato può essere aggiunto all'oggetto (un task può essere aggiunto al progetto)
view | L'oggetto può essere visualizzato (sola lettura)
