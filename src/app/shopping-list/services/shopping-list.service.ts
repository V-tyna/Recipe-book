import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  public changedIngredients = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('tomato', 5),
    new Ingredient('pepper', 2),
    new Ingredient('egg plant', 1),
  ];

  public getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  public addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.changedIngredients.emit(this.ingredients.slice());
  }

  public addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.changedIngredients.emit(this.ingredients.slice());
  }
}
