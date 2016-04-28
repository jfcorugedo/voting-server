import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {

    describe('setEntries', () => {

        it('adds the entries to the state', () => {
            const state = Map();
            const entries = List.of('Avengers', 'Antman');

            const nextState = setEntries(state, entries);

            expect(nextState).to.equal(Map({
                entries: List.of('Avengers', 'Antman')
            }));
        });

        it('converts immutable', () => {
            const state = Map();
            const entries = ['Avengers', 'Antman'];

            const nextState = setEntries(state, entries);

            expect(nextState).to.equal(Map({
                entries: List.of('Avengers', 'Antman')
            }));
        });
    });

    describe('next', () => {

        it('takes the next two entries under vote', () => {
            const state = Map(
                {
                    entries: List.of('Avengers', 'Antman', 'Superman')
                });

            const nextState = next(state);

            expect(nextState).to.equal(Map(
                {
                    vote: Map({
                        pair: List.of('Avengers', 'Antman')
                    }),
                    entries: List.of('Superman')
                }
            ));
        });

        it('puts winner of the current vote back to entries', () => {

            const state = Map({
                vote: Map(
                    {
                        pair:  List.of('Avengers', 'Antman'),
                        tally: Map({'Avengers' : 3, 'Antman' : 2})
                    }),
                entries: List.of('Superman')
            });

            const nextState = next(state);

            expect(nextState).to.equal(Map({
                vote: Map(
                    {
                        pair:  List.of('Superman', 'Avengers')
                    }),
                entries: List()
            }));
        });

        it('puts both from tied vote back to entries', () => {

            const state = Map({
                vote: Map(
                    {
                        pair:  List.of('Avengers', 'Antman'),
                        tally: Map({'Avengers' : 3, 'Antman' : 3})
                    }),
                entries: List.of('Superman')
            });

            const nextState = next(state);

            expect(nextState).to.equal(Map({
                vote: Map(
                    {
                        pair:  List.of('Superman', 'Avengers')
                    }),
                entries: List.of('Antman')
            }));
        });

        it('sets the winner when there is only one entry left', () => {

            const state = Map(
                {
                    vote: Map(
                        {
                            pair: List.of('Avengers', 'Antman'),
                            tally: Map(
                                {
                                    Avengers: 5,
                                    Antman: 1
                                }
                            )
                        }),
                    entries: List()
                }
            );

            const nextState = next(state);

            expect(nextState).to.equal(Map(
                {
                    winner: 'Avengers'
                }
            ));
        });
    });

    describe('vote', () => {

        it('creates a tally for the vote entry', () => {
            const state = Map({pair: List.of('Avengers', 'Antman')});

            const nextState = vote(state, 'Avengers');

            expect(nextState).to.equal(Map(
                {
                    pair: List.of('Avengers', 'Antman'),
                    tally: Map({'Avengers': 1})
                }));
        });

        it('increment tally of the given entry', () => {
            const state = Map(
                    {
                        pair:  List.of('Avengers', 'Antman'),
                        tally: Map({'Avengers' : 1, 'Antman' : 2})
                    });

            const nextState = vote(state, 'Avengers');

            expect(nextState).to.equal(Map(
                {
                    pair:  List.of('Avengers', 'Antman'),
                    tally: Map({'Avengers' : 2, 'Antman' : 2})
                }
            ));
        });
    });
});