import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from './services/users.service';
import { Note } from './models/note.model';
import { isUserLoggedIn } from './store/user.selectors';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn$ = this.store.select(isUserLoggedIn);

  constructor(private usersService: UsersService, private store: Store<AppState>) {
    store.subscribe((state) => {
      console.log('State changed:', state);
    });
  }
  title = 'Notes';

  selectedNote: Note | null = null;

  onNoteSelected(note: Note) {
    this.selectedNote = note;
  }


}







