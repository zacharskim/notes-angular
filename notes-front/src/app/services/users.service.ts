import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private currentUser: User = { "username": "", "id": 0 };

  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  updateLoggedIn(isLoggedIn: boolean) {
    this.isLoggedInSubject.next(isLoggedIn);
  }
  private apiUrl = 'http://localhost:5188/api/Users';

  constructor(private http: HttpClient) { }

  getUser(username: string): Observable<User> {
    const url = `${this.apiUrl}/${username}`;
    return this.http.get<User>(url);
  }
  setUser(user: User): void {
    this.currentUser = user;
  }

  getCurrentUser(): User {
    return this.currentUser;
  }

  addNewUser(username: string): Observable<User> {
    const url = `${this.apiUrl}`;
    const user = { "Username": username };
    return this.http.post<User>(url, user);
  }

}
