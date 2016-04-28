import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import makeStore from '../src/store';

describe('store', () => {

    it('is a Redux store', () => {

        const store = makeStore();

        expect(store.getState()).to.equal(Map());
    });

    it('is configured with the correct reducer', () => {

        const store = makeStore();

        store.dispatch({
           type: 'SET_ENTRIES',
            entries: ['Avengers', 'Antman']
        });

        expect(store.getState()).to.equal(fromJS(
            {
                entries: ['Avengers', 'Antman']
            }
        ));
    });
});