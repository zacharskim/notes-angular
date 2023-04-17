import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../services/users.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {

  username: string = '';
  constructor(private usersService: UsersService) { }


  login(){

    console.log("running", this.username);
    this.usersService.getUser(this.username).subscribe(user => {
      if (user) {
        // Log the user in
        // ...
        console.log(user, 'setting user to this..');
        this.usersService.setUser(user);
        this.usersService.updateLoggedIn(true);
      } else {
        // Throw an error
        // ...
        console.log("error?");
      }
    }, error => {
      // Handle the error
      // ...
      console.log(error, "eh");
    });



  }

  signup(){

  }


  



}



