import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from './services/users.service';
import { Note } from './note.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn = false;

  constructor(private usersService: UsersService) {
    this.usersService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }
  title = 'Notes';

  selectedNote: Note | null = null;

  onNoteSelected(note: Note) {
    this.selectedNote = note;
  }


}







