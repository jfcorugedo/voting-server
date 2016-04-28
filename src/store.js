import {createStore} from 'redux';
import reducer from './reducer';


/**
 * Creates a Redux store that holds the current state, and over time can receive actions that evolve the
 * state from one version to the next, using the core application logic wrapped using the reducer.
 *
 * The current state tree is the only thing that varies over time in a Redux application. The rest is all
 * constants and immutable data.
 *
 * The store is in charge of binding our core logic, the reducer that exposes it and the current state of the
 * application that will vary over time
 * 
 * @returns {*} A Redux fully functional store
 */
export default function makeStore() {
    return createStore(reducer);
}