[![Version](https://img.shields.io/npm/v/immutable-reducer.svg)](https://www.npmjs.com/package/immutable-reducer)
[![MIT license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://github.com/djoeman84/immutable-reducer/blob/master/LICENSE)
[![dependencies](https://david-dm.org/djoeman84/immutable-reducer.svg)](https://david-dm.org/djoeman84/immutable-reducer)
[![devDependency Status](https://david-dm.org/djoeman84/immutable-reducer/dev-status.svg)](https://david-dm.org/djoeman84/immutable-reducer#info=devDependencies)
[![airbnb code style](https://img.shields.io/badge/code%20style-airbnb-fd5c63.svg)](https://github.com/airbnb/javascript)

---

## Dependencies
- [ImmutableJS](https://github.com/facebook/immutable-js)

## Getting Started
```shell
npm install immutable-reducer --save
```

## Usage
##### appReducer.js
------
```javascript
import { ImmutableReducer } from  'immutable-reducer';
import { createReducer } from 'redux-caller';
import { SET_USER, CLEAR_USER } from './actions.js';
import moment from 'moment';

class UserReducer extends ImmutableReducer {
    [SET_USER]({payload}) {
        return this.set('user', payload);
    }
    [CLEAR_USER]() {
        return this.set('user', null);
    }
    getUserAge() {
        const now = moment();
        const birth = moment(this.user.dob);
        return now.diff(birth, 'years');
    }
}

AppReducer.defaultProperties = {
    user: null
};

export const userReducer = createReducer(new UserReducer());
```

##### appStore.js
------
```javascript
import { createStore, combineReducers } from 'redux'
import { userReducer } from 'redux-caller';

export const store = createStore(combineReducers({
    user: userReducer
}));
```

##### actions.js
------
```javascript
export const SET_USER = 'SET_USER';
export const CLEAR_USER = 'CLEAR_USER';

export const login = (user) => ({
    type: SET_USER,
    payload: user
});

export const logout = () => ({
    type: CLEAR_USER
});

```


## Credits

- [ImmutableJS](https://github.com/facebook/immutable-js) for underlying data structures
- [Hexbridge](http://hexbridge.com) for sponsoring my open-source work.
- [npm-starter](https://github.com/deiucanta/npm-starter)
- [Airbnb](http://airbnb.com) for the work they've put into the javascript style guide and into the ESlint package.

## License

MIT @ [Joe Delgado](https://twitter.com/soy_chupacabra)