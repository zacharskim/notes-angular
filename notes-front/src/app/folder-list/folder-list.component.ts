import { Component } from '@angular/core';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faFolderPlus } from '@fortawesome/pro-solid-svg-icons';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { FoldersService } from '../services/folders.service';
import { UsersService } from '../services/users.service';
import { User } from '../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { selectUserObj } from '../store/user.selectors';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { createFolderRequest, loadFoldersRequest } from '../store/folders.actions';
import { MatDialog } from '@angular/material/dialog';
import { DialogAnimationsExampleDialog } from './dialog-animations-example-dialog.component';
import { selectFolders } from '../store/folders.selectors'
 
@Component({
  selector: 'app-folder-list',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.css']
})
export class FolderListComponent {
  currentUser$: Observable<User>;
  currentUser!: User; // Add this line
  
  name: string = '';


  constructor(private foldersService: FoldersService, private usersService: UsersService, private store: Store<AppState>, public dialog: MatDialog) {
    this.currentUser$ = this.store.select(selectUserObj)
  }

  folders$!: Observable<any[]>;

  ngOnInit(): void {
    this.currentUser$.subscribe(user => {
      if (user) {
        this.currentUser = user;
        this.store.dispatch(loadFoldersRequest({ userId: this.currentUser.id }));
        this.folders$ = this.store.select(selectFolders);
      }
    });
  }
  faTrashCan = faTrashCan;
  faFolder = faFolder;
  faFolderPlus = faFolderPlus;

  selectedIndex: number | null = null;
  folders = [
    { id: 1, name: 'Personal' },
    { id: 2, name: 'Work' },
    { id: 3, name: 'Travel' },
    { id: 4, name: 'Finance' }
  ];


  selectFolder(index: number) {
    this.selectedIndex = index;
    this.foldersService.setCurrentFolder(this.folders[index].id);
    console.log(index, this.selectedIndex, this.folders[index].id);
    //depending on the selected folder, we need to determine what notes to show....how do we do that?
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(DialogAnimationsExampleDialog, {
      data: {name: this.name},
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      position: {
        top: '-50%',
        left: '50%',
      },
    });


    //user hit's create folder....
    dialogRef.afterClosed().subscribe(result => {
      this.name = result;
      this.addFolder();
      this.name = '';
    });

  }

  deleteFolder() {
    //depending on the selected index, delete the folder
  }

  // loadFolders(user: User) {
  //   //need to access the user object here...how do i do that?
  //   this.foldersService.getFoldersByUid(user.id).subscribe(folders => {
  //     this.folders = folders;
  //   });

  // }

  addFolder() {
    console.log("adding new folder...", this.name, this.currentUser.id);
    this.store.dispatch(createFolderRequest({ name: this.name, userId: this.currentUser.id }));
  }


}

