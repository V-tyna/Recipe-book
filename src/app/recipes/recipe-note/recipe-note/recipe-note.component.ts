import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Note } from 'src/app/models/note.model';
import { NoteService } from '../../services/notes.service';

@Component({
  selector: 'app-recipe-note',
  templateUrl: './recipe-note.component.html',
  styleUrls: ['./recipe-note.component.css']
})
export class RecipeNoteComponent implements OnInit {
  public id: string;
  public isShown = false;
  public notes: Note[] = [];
  public isShownButtonContent = 'Show notes';
  public noteForm = new FormGroup({
    noteName: new FormControl('', Validators.required),
    noteContent: new FormControl('', Validators.required)
  });

  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService
  ) {}

  public ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      this.id = param['id'];
    });
    this.noteService.getNotes(this.id).subscribe((notes: Note[]) => {
      this.notes = notes;
    });
  }

  public showNotes(): void {
    this.isShown = !this.isShown;
    this.isShownButtonContent = this.isShown ? 'Hide notes' : 'Show notes';
    const currentNotes = Object.values(this.notes);
    const keys = Object.keys(this.notes);
    this.notes = currentNotes.map((obj: Note, i: number) => {
      obj.id = keys[i];
      return obj;
    });
  }

  public clearFormContent(): void {
    this.noteForm.reset();
  }

  public onSubmit(): void {
    const { noteName, noteContent } = this.noteForm.value;
    const note: Note = {
      name: noteName,
      content: noteContent,
      recipeId: this.id
    };
    this.notes.push(note);
    this.noteService.setNote(note);
  }

  public editNote(id: string): void {
    console.log('edit', id);
  }

  public deleteNote(id: string): void {
    this.noteService.removeNotes(this.id, id);
    this.notes = this.notes.filter((note: Note) => note.id !== id);
  }
}
