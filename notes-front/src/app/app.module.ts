import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoteComponent } from './note/note.component';
import { NoteListComponent } from './note-list/note-list.component';
import { FolderListComponent } from './folder-list/folder-list.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogAnimationsExampleDialog } from './folder-list/dialog-animations-example-dialog.component';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FormsModule } from '@angular/forms'; 

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/users.effects';
import { FoldersEffects } from './store/folders.effects';
import { userReducer, notesReducer, foldersReducer  } from './store/reducer';



@NgModule({
  declarations: [
    AppComponent,
    NoteComponent,
    NoteListComponent,
    FolderListComponent,
    LandingPageComponent,
    DialogAnimationsExampleDialog


  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ user: userReducer, folders: foldersReducer, notes: notesReducer }),
    EffectsModule.forRoot([UserEffects, FoldersEffects]),
    BrowserAnimationsModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
