import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';

import {
  GET_USER_LIST,
  GET_USER_DETAILS_SUCCESS,
  GET_USER_DETAILS_REJECT,
  GET_USER_DETAILS,
  getUserListSuccess,
  getUserDetailsSuccess
} from '../actions/users.actions';
import { UsersService } from 'src/app/services/users.service';
import { of } from 'rxjs';


@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private usersService: UsersService
  ) { }

  @Effect()
  loadUsers$ = this.actions$.pipe(
    ofType(GET_USER_LIST),
    mergeMap(() => this.usersService.getUserList()
      .pipe(
        map(users => getUserListSuccess({ users })),
        catchError(() => of({ type: GET_USER_DETAILS_REJECT }))
      )));

  @Effect()
  loadUserDetails$ = this.actions$.pipe(
    ofType(GET_USER_DETAILS),
    mergeMap((action: any) => this.usersService.getUserById(action.id)
      .pipe(
        map((users: any[]) => {
          let user = users[0];
          user = {
            ...user,
            company: user.company.name,
            address: `${user.address.city} ${user.address.suite} ${user.address.street}`
          };

          return getUserDetailsSuccess({ user });
        }),
        catchError(() => of({ type: GET_USER_DETAILS_REJECT }))
      )));
}
