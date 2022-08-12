import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  public changedIngredients = new Subject<Ingredient[]>();
  public startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('tomato', 5),
    new Ingredient('pepper', 2),
    new Ingredient('egg plant', 1),
  ];

  public getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  public getIngredient(i: number): Ingredient {
    return this.ingredients[i];
  }

  public addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.changedIngredients.next(this.ingredients.slice());
  }

  public addIngredients(ingredients: Ingredient[]): void {
    this.ingredients.push(...ingredients);
    this.changedIngredients.next(this.ingredients.slice());
  }

  public updateIngredient(i: number, ingredient: Ingredient): void {
    this.ingredients[i] = ingredient;
    this.changedIngredients.next(this.ingredients.slice());
  }

  public deleteIngredient(i: number): void {
    this.ingredients.splice(i, 1);
    this.changedIngredients.next(this.ingredients.slice());
  }
}
