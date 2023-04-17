import { Component } from '@angular/core';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faFolderPlus } from '@fortawesome/pro-solid-svg-icons';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { FoldersService } from '../services/folders.service';
import { UsersService } from '../services/users.service';
import { User } from '../user.model';


@Component({
  selector: 'app-folder-list',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.css']
})
export class FolderListComponent {


  constructor(private foldersService: FoldersService, private usersService: UsersService) {}


  ngOnInit(): void {
    const user = this.usersService.getCurrentUser();
    // Now you have access to the user object in the folders component
    this.loadFolders(user);
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

  deleteFolder() {
    //depending on the selected index, delete the folder
  }

  loadFolders(user: User) {
    //need to access the user object here...how do i do that?
    this.foldersService.getFoldersByUid(user.id).subscribe(folders => {
      this.folders = folders;
    });

  }

  addFolder() {
    //need the right type of folder obj to push...

    //all we need is a new folder name - how to get this from the ui? input appears when addFolder is clicked? 
    this.foldersService.createFolder("eh");
  }



}
