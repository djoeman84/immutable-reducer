import { expect } from 'chai';
import { createReducer } from 'redux-caller';
import _ from 'underscore';
import { ImmutableReducer } from '../src/index';

const { describe, it } = global;

const ACTIONS = {
  SET_COUNT: 'SET_COUNT',
};

class MockStore extends ImmutableReducer {
  [ACTIONS.SET_COUNT]({ payload }) {
    return this.set('count', payload);
  }
}

MockStore.defaultProperties = {
  count: 1,
};

describe('createReducer', () => {
  it('should handle undefined initialization', () => {
    const reducer = createReducer(new MockStore());

    expect(reducer(undefined, { type: 'INIT', payload: null }).count)
        .to.be.equal(1);
  });

  it('should handle actions', () => {
    const reducer = createReducer(new MockStore());

    expect(reducer(undefined, { type: ACTIONS.SET_COUNT, payload: 5 }).count)
        .to.be.equal(5);
  });

  it('should be callable multiple times', () => {
    const reducer = createReducer(new MockStore());

    const states = [];
    _.range(20).reduce((state, i) => {
      const nextState = reducer(state, { type: ACTIONS.SET_COUNT, payload: i });
      states.push(nextState);
      return nextState;
    }, undefined);

    _(states).each((state, i) => {
      expect(state).to.be.an.instanceof(MockStore);
      expect(state.toJS().count).to.be.equal(i);
    });
  });
});
