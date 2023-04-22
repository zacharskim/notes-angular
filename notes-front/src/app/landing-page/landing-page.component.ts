import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Store } from '@ngrx/store';
import { loginUserRequest } from '../store/users.actions';
import { AppState } from '../store/app.state';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {

  username: string = '';
  constructor(private usersService: UsersService, private store: Store<AppState>) { }


  login(){
    this.store.dispatch(loginUserRequest({ username: this.username }));
  }

  signup(){

  }


  



}



