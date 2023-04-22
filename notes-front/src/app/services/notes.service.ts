import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
}) 
export class NotesService {
  private apiUrl = 'http://localhost:5188/api/Notes';

  constructor(private http: HttpClient) { }

  getNotesByUid(uid: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${uid}`);
  }
}
