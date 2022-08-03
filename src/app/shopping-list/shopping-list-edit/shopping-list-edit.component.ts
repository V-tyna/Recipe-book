import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
  @ViewChild('ingredientName', {static: false}) public ingredientNameRef?: ElementRef;
  public ingredientAmount: number = 1;
  @Output() public newIngredient = new EventEmitter<Ingredient>();
  constructor() { }

  ngOnInit(): void {
  }

  public onAddIngredient() {
    if(this.ingredientNameRef) {
      const newIng = new Ingredient(this.ingredientNameRef.nativeElement.value, this.ingredientAmount)
      this.newIngredient.emit(newIng);
    }
  }

  public onDeleteIngredient() {

  }

  public onClearIngredientField() {

  }

}
