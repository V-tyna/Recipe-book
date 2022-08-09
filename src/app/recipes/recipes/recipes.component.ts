import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  public recipeDetails?: Recipe;

  constructor(private recipeService: RecipeService) {}

  public ngOnInit(): void {
    this.recipeService.selectedRecipe
      .subscribe((recipe: Recipe) => {
        this.recipeDetails = recipe;
      });
  }
}
