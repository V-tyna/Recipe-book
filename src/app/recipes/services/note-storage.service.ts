import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from 'src/app/models/note.model';

@Injectable()

export class NoteStorageService {
  constructor(private http: HttpClient) { }
  public getNotes(recipeId: string): Observable<Note[]> {
    console.log('Get STORAGE note works');
    return this.http.get<Note[]>(`https://recipe-book-d859e-default-rtdb.firebaseio.com/notes/${recipeId}.json`);
  }

  public postNote(note: Note) {
    console.log('Post STORAGE note works', note);
    return this.http.post(`https://recipe-book-d859e-default-rtdb.firebaseio.com/notes/${note.recipeId}.json`, note)
      .subscribe((res) => {
        console.log('POST RESPONSE: ', res);
      });
  }

  public deleteNote(recipeId: string, id: string): void {
    this.http.delete(`https://recipe-book-d859e-default-rtdb.firebaseio.com/notes/${recipeId}/${id}.json`)
      .subscribe();
  }
}
