import makeStore from './src/store';
import startServer from './src/server'

export const store = makeStore();
startServer(store);

console.log('Initializing store....');

store.dispatch({
    type: 'SET_ENTRIES',
    entries: require('./config/entries.json')
});
store.dispatch({type: 'NEXT'});

console.log('Store initialized:\n', store.getState().toJS());

