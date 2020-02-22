import { createAction, props } from '@ngrx/store';
import { UserListItem, UserDetails } from '../reducers';

export const GET_USER_LIST = 'GET_USER_LIST';
export const GET_USER_LIST_SUCCESS = 'GET_USER_LIST_SUCCESS';
export const GET_USER_LIST_REJECT = 'GET_USER_LIST_REJECT';

export const GET_USER_DETAILS = 'GET_USER_DETAILS';
export const GET_USER_DETAILS_SUCCESS = 'GET_USER_DETAILS_SUCCESS';
export const GET_USER_DETAILS_REJECT = 'GET_USER_DETAILS_REJECT';

export const RESET_USER_DETAILS = 'RESET_USER_DETAILS';

export const getUserList = createAction(GET_USER_LIST);
export const getUserListSuccess = createAction(GET_USER_LIST_SUCCESS, props<{ users: UserListItem[] }>());

export const getUserDetails = createAction(GET_USER_DETAILS, props<{ id: number }>());
export const getUserDetailsSuccess = createAction(GET_USER_DETAILS_SUCCESS, props<{ user: UserDetails }>());
export const resetUserDetails = createAction(RESET_USER_DETAILS);
