import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { NotesService } from '../services/notes.service';
import { NotesActions } from './notes.actions';

@Injectable()
export class NotesEffects {
  constructor(
    private actions$: Actions,
    private notesService: NotesService
  ) {}

  loadNotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.loadNotes),
      mergeMap(({ userId }) =>
        this.notesService.getNotes(userId).pipe(
          map((notes) => NotesActions.loadNotesSuccess({ notes })),
          catchError((error) => of(NotesActions.loadNotesFailure({ error })))
        )
      )
    )
  );

  createNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.createNote),
      mergeMap(({ note }) =>
        this.notesService.createNote(note).pipe(
          map((createdNote) => NotesActions.createNoteSuccess({ note: createdNote })),
          catchError((error) => of(NotesActions.createNoteFailure({ error })))
        )
      )
    )
  );

  updateNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.updateNote),
      mergeMap(({ note }) =>
        this.notesService.updateNote(note).pipe(
          map(() => NotesActions.updateNoteSuccess({ note })),
          catchError((error) => of(NotesActions.updateNoteFailure({ error })))
        )
      )
    )
  );

  deleteNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.deleteNote),
      mergeMap(({ noteId }) =>
        this.notesService.deleteNote(noteId).pipe(
          map(() => NotesActions.deleteNoteSuccess({ noteId })),
          catchError((error) => of(NotesActions.deleteNoteFailure({ error })))
        )
      )
    )
  );
}
