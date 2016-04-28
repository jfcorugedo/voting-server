/**
 * Created by jfcorugedo on 28/04/16.
 */
import Server from 'socket.io';

const PORT = 8090;

export default function startServer(store) {
    console.log('Starting server on port ' + PORT + '......');
    const io = new Server().attach(PORT);
    console.log('Server started');

    store.subscribe(
        () => io.emit('state', store.getState().toJS())
    );
}
