// src/app/effects/user.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FoldersService } from '../services/folders.service';
import * as FolderActions from './folders.actions';
import { tap } from 'rxjs/operators';

@Injectable()
export class FoldersEffects {
  createFolder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FolderActions.createFolderRequest),
      switchMap(({ name, userId }) =>
        this.foldersService.createFolder({name, userId}).pipe(
          map((folder) => FolderActions.createFolder({ folder: { name: folder.name, id: folder.id, userId: folder.userId } })),
          catchError((error) => {
            // Handle error here if needed
            console.log("eeeee", error);
            return of();
          })
        )
      )
    )
  );

  loadFolders$ = createEffect(() => 

    this.actions$.pipe(
      ofType(FolderActions.loadFoldersRequest),
      switchMap(({userId}) => 
      this.foldersService.getFoldersByUid(userId).pipe(
        tap((folders) => console.log('Folders fetched:', folders, typeof folders)),
        map((folders) => FolderActions.loadFolders({ folders: folders })),
        catchError((error) => {
          console.log(error);
          return of()
        })
      )
    )
  )  
);

  constructor(private actions$: Actions, private foldersService: FoldersService) {}
}
