import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  public noNotes = false;
  public notes: Note[] = [];
  public isShownButtonContent = 'Show notes';
  public noteForm = new FormGroup({
    noteName: new FormControl('', Validators.required),
    noteContent: new FormControl('', Validators.required)
  });

  private noteId = '';
  private editMode = false;

  @Input() recipeId: string;

  constructor(
    private noteService: NoteService,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.id = this.route.snapshot.parent?.params['id'];
    this.noteService.getNotes(this.id).subscribe((notes: Note[]) => {
      this.notes = notes;
    });
  }

  public showNotes(): void {
    this.isShown = !this.isShown;
    this.isShownButtonContent = this.isShown ? 'Hide notes' : 'Show notes';
    if (this.notes) {
      const currentNotes = Object.values(this.notes);
      const keys = Object.keys(this.notes);
      this.notes = currentNotes.map((obj: Note, i: number) => {
        obj.id = keys[i];
        return { ...obj };
      });
    }
  }

  public clearFormContent(): void {
    this.editMode = false;
    this.noteForm.reset();
  }

  public onSubmit(): void {
    const note: Note = this.collectDataFromNoteForm();
    if (this.editMode) {
      this.noteService.editNote(this.id, this.noteId, note);
      this.editMode = false;
      this.notes = this.notes.map((obj: Note) => {
        if (obj.id === this.noteId) {
          obj = { ...note, id: this.noteId };
        }
        return obj;
      });
    } else {
      this.noteService.setNote(note);
      this.addNoteToNotes(note);
    }
    this.noteForm.reset();
  }

  public editNote(id: string): void {
    this.noteId = id;
    this.editMode = true;
    this.setDataToControls(id);
  }

  public deleteNote(id: string): void {
    this.noteService.removeNotes(this.id, id);
    this.notes = this.notes.filter((note: Note) => note.id !== id);
  }

  private setDataToControls(id: string) {
    const note = this.findNote(id);
    this.noteForm.setValue({
      noteName: note?.name || '',
      noteContent: note?.content || ''
    });
  }

  private collectDataFromNoteForm(): Note {
    const { noteName, noteContent } = this.noteForm.value;
    return {
      name: noteName,
      content: noteContent,
      recipeId: this.id
    };
  }

  private addNoteToNotes(note: Note): void {
    if (!this.notes) {
      this.notes = [];
    }
    this.notes.push(note);
  }

  private findNote(id: string): Note | undefined {
    return this.notes.find((obj: Note) => obj.id === id);
  }
}
