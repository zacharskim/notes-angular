import { Component, OnInit, Output, OnDestroy, EventEmitter } from '@angular/core';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FoldersService } from '../services/folders.service';
import { UsersService } from '../services/users.service';
import { Subscription } from 'rxjs';
import { User } from '../user.model';
import { NotesService } from '../services/notes.service';
import { Note } from '../note.model';




@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit, OnDestroy {

  @Output() noteSelected = new EventEmitter<Note>();

  currentFolderSubscription!: Subscription;
  constructor(private foldersService: FoldersService, private usersService: UsersService, private notesService: NotesService) { }

  ngOnInit(): void {
    const user = this.usersService.getCurrentUser();

    this.currentFolderSubscription = this.foldersService.currentFolder$.subscribe(folderIndex => {
      if (folderIndex === null) {
        this.notes = []; // Set to empty state when no folder is selected
      } else {
        this.loadNotes(user, folderIndex);
      }
    });
  }

  ngOnDestroy(): void {
    this.currentFolderSubscription.unsubscribe();
  }

  faPenToSquare = faPenToSquare;
  faMagnifyingGlass = faMagnifyingGlass;

  selectedIndex: number | null = null;

  loadNotes(user: User, folderIndex: number) {
    console.log('loading in notes again');
    this.notesService.getNotesByUid(user.id).subscribe(notes => {
      console.log("the notes", typeof notes[0].created, folderIndex);
      this.notes = notes.filter((note: Note) => note.folderId === folderIndex);
    });
  }

  notes: any[] = [];

  selectNote(index: number) {
    this.selectedIndex = index;
    const selectedNote = this.notes[index];
    console.log(selectedNote);
    this.noteSelected.emit(selectedNote);
  }
}
