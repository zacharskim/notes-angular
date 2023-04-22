import { createSelector } from '@ngrx/store';
import { AppState } from './app.state';

export const selectFolders = createSelector(
  (state: AppState) => state.folders,
  (folders) => folders
);