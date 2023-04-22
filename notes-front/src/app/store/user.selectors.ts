


  // src/app/selectors/user.selectors.ts
import { createSelector } from '@ngrx/store';
import { AppState } from './app.state';
import { User } from '../models/user.model';

export const selectUser = (state: AppState) => state.user;

export const selectUsername = createSelector(
  selectUser,
  (user: User) => user.username
);

export const selectUserId = createSelector(
  selectUser,
  (user: User) => user.id
);

// src/app/selectors/user.selectors.ts
export const isUserLoggedIn = createSelector(
    selectUser,
    (user: User) => user && user.username !== '' && user.id !== undefined
  );
  

  export const selectUserObj = createSelector(
    selectUser,
    (user: User) => user
);