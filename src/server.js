/**
 * Created by jfcorugedo on 28/04/16.
 */
import Server from 'socket.io';

const PORT = 8090;

/**
 * Basic behaviour:
 * 1. A client sends an action to the server.
 * 2. The server hands the action to the Redux Store.
 * 3. The Store calls the reducer and the reducer executes the logic related to the action.
 * 4. The Store updates its state based on the return value of the reducer.
 * 5. The Store executes the listener function subscribed by the server.
 * 6. The server emits a 'state' event.
 * 7. All connected clients - including the one that initiated the original action - receive the new state.
 *
 * @param store A Redux store properly configured
 */
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
        socket.on('action', (data) => {store.dispatch(data)});
    });
}
