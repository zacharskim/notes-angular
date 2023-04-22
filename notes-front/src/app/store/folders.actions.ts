import { createAction, props } from '@ngrx/store';
import { Folder } from '../models/folder.model';

export const createFolder = createAction(
    '[Folder] Create Folder',
    props<{ folder: Folder }>()
  );

  export const createFolderRequest = createAction(
    '[Folder] Create Folder Request',
    props<{ name: string, userId: number }>()
  );

  export const loadFoldersRequest = createAction(
    '[Folder] Load Folders Request',
    props<{userId: number}>()
  )

  export const loadFolders = createAction(
    '[Folder] Load Folders',
    props<{folders: Folder[]}>()
  )
  
  export const getFolder = createAction(
    '[Folder] Get Folder',
    (id: string) => ({ id })
  );
  
  export const updateFolder = createAction(
    '[Folder] Update Folder',
    (id: string, folder: Folder) => ({ id, folder })
  );
  
  export const deleteFolder = createAction(
    '[Folder] Delete Folder',
    (id: string) => ({ id })
  );
  
  export const getFoldersForUser = createAction(
    '[Folder] Get Folders for User',
    (uid: string) => ({ uid })
  );
  
  