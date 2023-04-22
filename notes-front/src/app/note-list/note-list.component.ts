import { Component, OnInit, Output, OnDestroy, EventEmitter } from '@angular/core';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FoldersService } from '../services/folders.service';
import { UsersService } from '../services/users.service';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { NotesService } from '../services/notes.service';
import { Note } from '../models/note.model';
import { Store, select } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { selectUserObj } from '../store/user.selectors';
import { switchMap, tap } from 'rxjs/operators';



@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {

  @Output() noteSelected = new EventEmitter<Note>();

  currentFolderSubscription!: Subscription;
  constructor(private foldersService: FoldersService, private usersService: UsersService, private notesService: NotesService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.currentFolderSubscription = this.foldersService.currentFolder$.pipe(
      switchMap(folderIndex => {
        if (folderIndex === null) {
          this.notes = []; 
          return [];
        } else {
          return this.store.pipe(
            select(selectUserObj),
            switchMap(user => {
              if (user) {
                return this.notesService.getNotesByUid(user.id);
              }
              return [];
            }),
            tap(notes => {
              this.notes = notes.filter((note: Note) => note.folderId === folderIndex);
            })
          );
        }
      })
    ).subscribe();
  }



  faPenToSquare = faPenToSquare;
  faMagnifyingGlass = faMagnifyingGlass;

  selectedIndex: number | null = null;


  notes: any[] = [];

  selectNote(index: number) {
    this.selectedIndex = index;
    const selectedNote = this.notes[index];
    console.log(selectedNote);
    this.noteSelected.emit(selectedNote);
  }
}
