import {
  createReducer,
  on,
  Action
} from '@ngrx/store';
import { getUserListSuccess, getUserDetailsSuccess, resetUserDetails } from '../actions/users.actions';

export interface UserListItem {
  id: number;
  name: string;
  email: string;
}

export interface UserDetails {
  name: string;
  username: string;
  address: string;
  company: string;
}

export interface IUserStore {
  users: UserListItem[];
  user: UserDetails;
}

export interface IState {
  users: IUserStore;
}

export const initialUserState: IUserStore = {
  users: null,
  user: null
};

export const initialState: IState = {
  users: initialUserState
};

const userReducer = createReducer(
  initialUserState,
  on(getUserListSuccess, (state, { users }) => ({
    ...state,
    users
  })),
  on(getUserDetailsSuccess, (state, { user }) =>
    ({
      ...state,
      user
    })),
  on(resetUserDetails, (state) =>
    ({
      ...state,
      user: null
    })),
);

export function reducer(state: IUserStore | undefined, action: Action) {
  return userReducer(state, action);
}
