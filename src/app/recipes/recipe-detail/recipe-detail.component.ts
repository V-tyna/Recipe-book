import { Component, Input } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
  @Input() public recipeDetails!: Recipe;

  constructor(private recipeService: RecipeService) {}

  onAddToTheShoppingList() {
    this.recipeService.addIngredientsToTheShoppingList(this.recipeDetails.ingredients);
  }
}
