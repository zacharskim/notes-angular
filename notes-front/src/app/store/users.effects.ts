// src/app/effects/user.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as UserActions from './users.actions';
import { UsersService } from '../services/users.service';

@Injectable()
export class UserEffects {
  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loginUserRequest),
      switchMap(({ username }) =>
        this.userService.getUser(username).pipe(
          map((user) => UserActions.loginUser({ username: user.username, id: user.id })),
          catchError((error) => {
            // Handle error here if needed
            console.log("eeeee", error);
            return of();
          })
        )
      )
    )
  );

  constructor(private actions$: Actions, private userService: UsersService) {}
}
