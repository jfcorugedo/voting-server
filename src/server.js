/**
 * Created by jfcorugedo on 28/04/16.
 */
import Server from 'socket.io';

const PORT = 8090;

export default function startServer() {
    console.log('Starting server on port ' + PORT + '......');
    new Server().attach(PORT);
    console.log('Server started');
}
