/**
 * Created by jfcorugedo on 28/04/16.
 */
import Server from 'socket.io';

const PORT = 8090;

export default function startServer(store) {
    console.log('Starting server on port ' + PORT + '......');
    const io = new Server().attach(PORT);
    console.log('Server started');

    //Subscribe socketio to the store so it can broadcast any state change
    store.subscribe(
        () => io.emit('state', store.getState().toJS())
    );

    io.on('connection', socket => {
        //Send current state to any new client
        socket.emit('state', store.getState().toJS());
        //When new data is received it will be sent to the store to be processed
        socket.on('action', (data) => {store.dispach(data)});
    });
}
