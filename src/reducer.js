import {setEntries, next, vote, INITIAL_STATE} from '../src/core';

/**
 * Performs the given action over the target state
 * If it doesn't recognize the action given, the same state will be returned
 *
 * Moreover if its called with an undefined state, it will return a default meaningful state.
 *
 * Given a collection of past actions anyone can reduce this collection into the current state applying
 * this reducer function over the arguments
 *
 * @param state
 * @param action
 * @returns {*}
 */
export default function reducer(state = INITIAL_STATE, action) {

    switch(action.type) {
        case 'SET_ENTRIES':
            return setEntries(state, action.entries);
        case 'NEXT':
            return next(state, action.entries);
        case 'VOTE':
            //Similar tu state.set('vote', updater(state.get('vote', {})))
            return state.update('vote', voteState => vote(voteState, action.entry));
        default:
            return state;
    }
}