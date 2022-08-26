import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from 'src/app/models/app.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from '../state-storage/shopping-list.action';
import { IngredientState } from '../state-storage/shopping-list.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('ingrsForm', { static: true }) ingrsForm: NgForm;
  public defaultAmount = 1;
  public editMode = false;

  private editedItem: Ingredient;
  private subscription: Subscription;

  constructor(
    private store: Store<AppState>
  ) { }

  public ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe((stateData: IngredientState) => {
      if (stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedItem = stateData.editedIngredient!;
        this.ingrsForm.setValue({
          ingredientName: this.editedItem.name,
          ingredientAmount: this.editedItem.amount
        });
      } else {
        this.editMode = false;
      }
    });
  }

  public onSubmitIngredient(ingrsForm: NgForm): void {
    const { ingredientName, ingredientAmount } = ingrsForm.value;
    const newIng = new Ingredient(ingredientName, ingredientAmount);
    if (this.editMode) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIng));
      this.editMode = false;
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIng));
    }
    ingrsForm.reset();
  }

  public onDeleteIngredient(): void {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
  }

  public onClearIngredientField(ingrsForm: NgForm): void {
    this.editMode = false;
    ingrsForm.reset();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
