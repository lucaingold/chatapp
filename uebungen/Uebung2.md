#Einführung in React

##Übung 2 - Redux

In dieser Übung geht es darum fehlende Redux-Teile zu ergänzen, sodass unsere Chat-App funktioniert. Nach dieser Übung sollte es den Teilnehmern möglich sein miteinander zu chatten.

###Neue Action definieren
Ein Redux-Store ist immer ein grosses JavaScript-Objekt. In unserem Fall haben wir zwei separate Teilbereiche message & socket.
Die Reducers werden in src/store/index.js zusammengeführt.

```javascript
const rootReducer = combineReducers({
  socketState: socketReducer, //alles was den Socket-Verbindungsaufbau betrifft
  messageState: messageReducer //Handling der Messages
});
```

Wir beschränken uns für diese Übung auf den messageState. Der serverseitige Teil der Applikation läuft übrigens mit Node.js & Socket.io und ist auf Heroku deployed, damit wir uns am Ende gegenseitig Nachrichten zukommen lassen. (Bei Interesse: der Code befindet sich im Ordner server/index.html und kann auch lokal gestartet werden via ```npm run server:watch``` > der Server muss dafür aber  in store/socket auf localhost geändert werden)

In File src/store/index.js wird im Übrigen der komplette Store initialisiert (inkl. Middleware). Der Store wird dann in src/index.js mittels Provider in unserer Applikation verfügbar gemacht.

Der State ist wie folgt aufgebaut und kann mit den Redux DevTools im Browser im Tab "State" begutachtet werden:

```javascript
{
  socketState: {
    connected: true,
    port: '3000',
    isError: false
  },
  messageState: {
    username: 'Gwendolyn',
    messages: [
      {
        from: 'Gwendolyn',
        content: 'Das ist eine Nachricht!',
        time: '10:50',
        type: 'sent'
      }
    ]
  }
}
```

Neu soll nun in src/store/message/actions/index.js eine neuer Action-Creator erstellt werden, der als Parameter eine Nachricht im Format ```message: { from, content, time }``` und dann eine Action erstellt, die wie folgt definiert ist:

```javascript
    type: SEND_MESSAGE_REQUEST,
    message
```

Folglich muss im gleichen File daher auch eine neue Action SEND_MESSAGE_RESPONSE erstellt werden.

###Neuen Reducer zur definierten Action definieren

In src/store/message/reducer/index.js soll die reducer-Funktion messageReducer um die vorher erstellte Action SEND_MESSAGE_RESPONSE ergänzt werden. Der InitalState ist bereits definiert (messages: [])

Damit im GUI zwischen Sender & Empfänger unterscheiden werden kann (floatLeft/Right, Blue/Green) muss die message vor dem Speichern im Store noch mit dem Type modifizert werden:

```javascript
const isMessageTypeSent = (message.from === state.username);
message = Object.assign(message, {type: isMessageTypeSent ? 'sent'  : 'received'});
```

Wichtig: Der State darf niemals direkt modifiziert werden, sonder immer durch ein Kopie ersetzt werden. (Aufpassen bei verschachtelten Objekten, Arrays > Deep Copy)

[Hilfestellung: siehe Immutable update patterns](https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns "immutable update patterns")]

###mapStateToProps & mapDispatchToProps
Wenn in src/components/MessageSender eine Nachricht verschickt wird, soll neu nun eine Action via Dispach augelöst werden. Dafür muss mapDispatchToProps implmentiert werden (siehe Folie 68).

```javascript
import { sendMessage } from "../../store/message/actions"; //user ActionCreator für das dispatch
```

Die Methode sendChatMessage, sowie das Propertie sendMessage (function) ist bereits definiert

###Bonus - Payload-Enhancer-Middleware erstellen
Erstelle eine Middleware, die bei jeder SEND_MESSAGE_REQUEST-Action den Payload (message.content) um dem Usernamen ergänzt (message.user)

Also z.B. "Das ist ein Nachricht" wird zu "Das ist ein Nachricht von Hans Muster"

Lies dich zudem auf [Medium - Understanding Redux Middleware
](https://medium.com/@meagle/understanding-87566abcfb7a) zum Thema currying ein.
