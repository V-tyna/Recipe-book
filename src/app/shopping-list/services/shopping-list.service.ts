import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  public changedIngredients = new Subject<Ingredient[]>();

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
    this.changedIngredients.next(this.ingredients.slice());
  }

  public addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.changedIngredients.next(this.ingredients.slice());
  }
}
