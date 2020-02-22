import { createSelector } from '@ngrx/store';
import { IState } from '../reducers/index';

const userState = (state: IState) => {
  return state.users;
};

export const selectUserList = createSelector(
  userState,
  (state) => state.users
);

export const selectUserDetails = createSelector(
  userState,
  (state) => state.user
);
