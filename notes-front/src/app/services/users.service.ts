import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  private apiUrl = 'http://localhost:5188/api/Users';

  constructor(private http: HttpClient) { }

  getUser(username: string): Observable<User> {
    const url = `${this.apiUrl}/${username}`;
    return this.http.get<User>(url);
  }

  addNewUser(username: string): Observable<User> {
    const url = `${this.apiUrl}`;
    const user = { "Username": username };
    return this.http.post<User>(url, user);
  }

}
