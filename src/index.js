import { ExtendableRecord } from 'extendable-record';

export class ImmutableReducer extends ExtendableRecord {
  handleAction(action) {
    return this[action.type] ? this[action.type](action) : this;
  }
}
