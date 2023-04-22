import { createAction, props } from '@ngrx/store';
import { Note } from '../models/note.model';

export const createNote = createAction(
    '[Note] Create Note',
    (note: Note) => ({ note })
  );
  
  export const getNote = createAction(
    '[Note] Get Note',
    (id: string) => ({ id })
  );
  
  export const deleteNote = createAction(
    '[Note] Delete Note',
    (id: string) => ({ id })
  );
  
  export const getNotesForUser = createAction(
    '[Note] Get Notes for User',
    (uid: string) => ({ uid })
  );
  
  export const moveNote = createAction(
    '[Note] Move Note',
    (noteId: string, folderId: string) => ({ noteId, folderId })
  );
  
  export const updateNoteTitle = createAction(
    '[Note] Update Note Title',
    (id: string, title: string) => ({ id, title })
  );
  
  export const updateNoteContent = createAction(
    '[Note] Update Note Content',
    (id: string, content: string) => ({ id, content })
  );