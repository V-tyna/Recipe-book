import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { RecipeDetailComponent } from '../recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from '../recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from '../recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from '../recipe-list/recipe-list/recipe-list.component';
import { RecipeNoteComponent } from '../recipe-note/recipe-note/recipe-note.component';
import { RecipeStartComponent } from '../recipe-start/recipe-start.component';

import { RecipesComponent } from '../recipes/recipes.component';
import { NoteStorageService } from '../services/note-storage.service';
import { NoteService } from '../services/notes.service';
import { RecipesRoutingModule } from './recipes-routing.module';

@NgModule({
  imports: [
    RouterModule,
    RecipesRoutingModule,
    SharedModule
  ],
  exports: [
    RecipesComponent,
    RecipeDetailComponent,
    RecipeEditComponent,
    RecipeItemComponent,
    RecipeListComponent,
    RecipeNoteComponent,
    RecipeStartComponent
  ],
  declarations: [
    RecipesComponent,
    RecipeDetailComponent,
    RecipeEditComponent,
    RecipeItemComponent,
    RecipeListComponent,
    RecipeNoteComponent,
    RecipeStartComponent
  ],
  providers: [
    NoteService,
    NoteStorageService
  ]
})
export class RecipesModule { }
