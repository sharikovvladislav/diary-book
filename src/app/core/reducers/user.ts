import * as user from '../actions/user';
import { User } from '../../shared/models/user';


export interface State {
  user: User;
}

export const initialState: State = {
  user: null
};

export function reducer(state = initialState, action: user.Actions): State {
  switch (action.type) {
    case user.LOAD_USER_DATA:
      return {
        user: action.payload
      };

    case user.UNLOAD_USER_DATA:
      return {
        user: null
      };

    default: {
      return state;
    }
  }
}

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */

export const getUser = (state: State) => state.user;
export const isLoggedIn = (state: State) => state.user !== null;
export const getUid = (state: State) => state.user.uid;
export const getToken = (state: State) => state.user.token;
