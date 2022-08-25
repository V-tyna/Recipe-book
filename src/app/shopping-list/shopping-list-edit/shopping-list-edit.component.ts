import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';
import { IngredientState } from '../state-storage/shopping-list.model';
import * as ShoppingListActions from '../state-storage/shopping-list.action';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('ingrsForm', { static: true }) ingrsForm: NgForm;
  public defaultAmount = 1;
  public editMode = false;

  private editedItemIndex: number;
  private editedItem: Ingredient;
  private subscription: Subscription;

  constructor(
private shoppingListService: ShoppingListService,
    private store: Store<IngredientState>
  ) { }

  public ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing
      .subscribe((i: number) => {
        this.editMode = true;
        this.editedItemIndex = i;
        this.editedItem = this.shoppingListService.getIngredient(i);
        this.ingrsForm.setValue({
          ingredientName: this.editedItem.name,
          ingredientAmount: this.editedItem.amount
        });
      });
  }

  public onSubmitIngredient(ingrsForm: NgForm): void {
    const { ingredientName, ingredientAmount } = ingrsForm.value;
    const newIng = new Ingredient(ingredientName, ingredientAmount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIng);
      this.editMode = false;
    } else {
      // this.shoppingListService.addIngredient(newIng);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIng));
    }
    ingrsForm.reset();
  }

  public onDeleteIngredient(): void {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
  }

  public onClearIngredientField(ingrsForm: NgForm): void {
    this.editMode = false;
    ingrsForm.reset();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
