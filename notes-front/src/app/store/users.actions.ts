import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';


  export const loginUser = createAction(
    '[User] Login',
    props<{ username: string; id: number }>()
    );
  

    export const loginUserRequest = createAction(
        '[User] Login Request',
        props<{ username: string }>()
      );