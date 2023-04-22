import { createReducer, on } from '@ngrx/store';
import { Note } from '../models/note.model';
import { User } from '../models/user.model';
import { Folder } from '../models/folder.model';
import * as NotesActions from './notes.actions';
import * as FoldersActions from './folders.actions';
import * as UsersActions from './users.actions';

export const initialNoteState: ReadonlyArray<Note> = [];

export const notesReducer = createReducer(
    initialNoteState,

);


export const initialUserState: User | null = null;;
export const userReducer = createReducer<User | null>(
    initialUserState,
    on(UsersActions.loginUser, (state, { username, id }) => ({ username, id }))
);

export const initialFolderState: ReadonlyArray<Folder> = [];
export const foldersReducer = createReducer(
    initialFolderState,
    on(FoldersActions.createFolder, (state, { folder }) => [...state, folder]),
    on(FoldersActions.loadFolders, (state, { folders }) => {
        console.log('Type of folders:', typeof folders, folders);
        const newState = [...state, ...folders];
        console.log('State after updating:', newState);
        return newState;
    })
);
