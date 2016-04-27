import {List, Map} from 'immutable';

/**
 * Initializes entries of this state. It accepts any iterable  object but it always stores it as immutable
 * @param state Current state
 * @param entries Iterable object with all the entries that should be added to the state
 * @returns {*} next state with all the changes applied
 */
export function setEntries(state, entries) {
    return state.set('entries', List(entries));
}

/**
 * Takes the next pair of elements to vote for
 * @param state Current state
 * @returns {*} next state with all the changes applied
 */
export function next(state) {
    const entries = state.get('entries').concat(getWinners(state.get('vote')));

    if(entries.size == 1) {
        return state.remove('vote')
                    .remove('entries')
                    .set('winner', entries.first());
    } else {
        return state.merge({
            vote: Map({pair: entries.take(2)}),
            entries: entries.skip(2)
        });
    }
}

/**
 * Returns the winner of the current voting phase.
 *
 * If the voting session is tied both elements will be returned
 * @param vote
 */
function getWinners(vote) {
    if(!vote) return [];

    const [a, b] = vote.get('pair');
    const aVotes = vote.getIn(['tally', a], 0);
    const bVotes = vote.getIn(['tally', b], 0);

    if(aVotes > bVotes) {
        return [a];
    } else if(aVotes < bVotes) {
        return [b];
    } else {
        return [a, b];
    }
}

/**
 * Updates the tally of the given entry due to a new vote has been received for it
 * @param state
 * @param entry
 * @returns {*} next state with all the changes applied
 */
export function vote(state, entry) {
    //updateIn performs an operation over the given element (vote > tally > entry). If that element does not exists
    //it will create it with the default value specified (0 in this case)
    return state.updateIn(['vote', 'tally', entry], 0, tally => tally + 1);
}