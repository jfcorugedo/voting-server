import {Map, fromJS} from 'immutable';
import {expect} from 'chai';
import reducer from '../src/reducer';


describe('reducer', () => {

    it('handles SET_ENTRIES', () => {

        const state = Map();
        const action = {type: 'SET_ENTRIES', entries: ['Avengers', 'Antman']};

        const nextState = reducer(state, action);

        expect(nextState).to.equal(fromJS({entries: ['Avengers', 'Antman']}));
    });

    it('handles NEXT', () => {

        const state = fromJS(
            {
                entries: ['Avengers', 'Antman']
            }
        );
        const action = {type: 'NEXT'};

        const nextState = reducer(state, action);

        expect(nextState).to.equal(fromJS({ vote: { pair:['Avengers', 'Antman'] }, entries:[] }));
    });

    it('handles VOTE', () => {

        const state = fromJS(
            {
                vote: {
                    pair: ['Avengers', 'Antman']
                },
                entries: ['Superman']
            }
        );
        const action = {type: 'VOTE', entry: 'Antman'};

        const nextState = reducer(state, action);

        expect(nextState).to.equal(fromJS(
            {
                vote: {
                    pair: ['Avengers', 'Antman'],
                    tally: {
                        'Antman': 1
                    }
                },
                entries: ['Superman']
            }
        ));
    });

    it('has an initial state', () => {

        const state = undefined;
        const entries = fromJS(['Avengers', 'Superman']);
        const action = {type: 'SET_ENTRIES', entries: entries};
        const nextState = reducer(state, action);

        expect(nextState).to.equal(fromJS(
            {
                entries: ['Avengers', 'Superman']
            }
        ));
    });
});
