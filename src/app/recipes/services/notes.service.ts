import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from 'src/app/models/note.model';
import { NoteStorageService } from './note-storage.service';

@Injectable()

export class NoteService {
  public notes: Note[] = [];

  constructor(private noteStorageService: NoteStorageService) { }

  public setNote(note: Note): void {
    this.notes.push(note);
    this.noteStorageService.postNote(note);
  }

  public getNotes(id: string): Observable<Note[]> {
    return this.noteStorageService.getNotes(id);
  }

  public editNote(recipeId: string, id: string, note: Note): void {
    this.noteStorageService.patchNote(recipeId, id, note);
  }

  public removeNotes(recipeId: string, id: string): void {
    this.noteStorageService.deleteNote(recipeId, id);
  }
}
