import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent {
  @ViewChild('ingredientName', { static: false }) public ingredientNameRef!: ElementRef;

  public ingredientAmount = 1;

  constructor(private shoppingListService: ShoppingListService) { }

  public onAddIngredient() {
    const newIng = new Ingredient(
      this.ingredientNameRef.nativeElement.value,
      this.ingredientAmount
    );
    this.shoppingListService.addIngredient(newIng);
  }

  public onDeleteIngredient() {
    // Change the line below (stub for eslint) TODO:
    this.ingredientAmount = 2;
  }

  public onClearIngredientField() {
    // Change the line below (stub for eslint) TODO:
    this.ingredientAmount = 2;
  }
}
