import * as io from 'socket.io-client';

const EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  MESSAGE: 'message'
};

export default class Socket {
  user;
  port;
  onChange; //isConnected
  onMessage; //message: { from: string, content: string }
  socket;

  constructor(onChange, onMessage) {
    this.onChange = onChange;
    this.onMessage = onMessage;
    this.socket = '';
    this.user = '';
    this.port = '';
  }

  connect = (user, port) => {
    this.user = user;
    this.port = port;

    // const host = `http://192.168.0.220:${port}`; // Running from local network
    const host = 'https://bbv-chat-app.herokuapp.com'; // Running from Heroku
    this.socket = io.connect(host);
    // this.socket = io.connect(); //localhost
    this.socket.on(EVENTS.CONNECT, this.onConnected);
  };

  onConnected = () => {
    this.socket.on(EVENTS.MESSAGE, this.onMessage);
    this.onChange(true);
  };

  sendMessage = (message) => {    
    if (typeof this.socket.emit === 'function') {
      this.socket.emit(EVENTS.MESSAGE, message)
      console.log('sended:' + message);
    } else {
      console.error('Cannot emit socket messages. Socket.io not connected.');
    }
  };

  disconnect = () => this.socket.close();
}
