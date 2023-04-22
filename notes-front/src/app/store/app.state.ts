import { User } from '../models/user.model';
import { Folder } from '../models/folder.model';
import { Note } from '../models/note.model';


export interface AppState {
    user: User;
    folders: Folder[];
    notes: Note[];
  }
  