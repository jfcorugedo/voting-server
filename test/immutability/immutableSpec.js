import {expect} from 'chai';
import {List, Map} from 'immutable';

describe('immutability', () => {

    describe('a number', () => {

        function increment(currentState) {
            return currentState + 1;
        }

        it('is immutable', () => {

            let state = 42;
            let nextState = increment(state);

            expect(nextState).to.equal(43);
            expect(state).to.equal(42);
        });
    });

    describe('a List', () => {

        function addMovie(currentState, movie) {
            return currentState.push(movie);
        }

        it('is immutable', () => {

            let state = List.of('Avengers', 'Antman');
            let nextState = addMovie(state, 'Superman');

            expect(nextState).to.equal(List.of(
                'Avengers',
                'Antman',
                'Superman'
            ));

            expect(state).to.equal(List.of(
                'Avengers',
                'Antman'
            ));
        });

        it('can be updated and returns another immutable List', () => {

            let state = List.of(1,2,3,4);

            let nextState = state.map(value => value*2);

            expect(nextState).to.equal(List.of(2,4,6,8));
            expect(state).to.equal(List.of(1,2,3,4));
        });
    });

    describe('a tree', () => {

        function addMovie(currentState, movie) {
            return currentState.update('movies', movies => movies.push(movie));
        }

        it('is immutable', () => {
            let state = Map({
                movies: List.of('Avengers', 'Antman')
            });
            let nextState = addMovie(state, 'Superman');

            expect(nextState).to.equal(Map({
                movies: List.of('Avengers','Antman','Superman')
            }));

            expect(state).to.equal(Map({
                movies: List.of('Avengers','Antman')
            }));
        });
    });
});