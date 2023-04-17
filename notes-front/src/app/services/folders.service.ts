// folders.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoldersService {
  private apiUrl = 'http://localhost:5188/api/Folders';
  private currentFolder: number = -1;
  private currentFolderSubject = new BehaviorSubject<number>(-1);
  currentFolder$ = this.currentFolderSubject.asObservable();


  constructor(private http: HttpClient) { }

  getFoldersByUid(uid: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/folder/${uid}`);
  }

  getFolder(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createFolder(folder: any): Observable<any> {
    return this.http.post(this.apiUrl, folder);
  }

  updateFolder(id: number, newName: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, newName);
  }

  deleteFolder(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getCurrentFolder(): number {
    return this.currentFolder;
  }

  setCurrentFolder(folderIndex: number): void {
    this.currentFolderSubject.next(folderIndex);
  }
}
