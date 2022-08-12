import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from '../../recipes/recipe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  public recipes: Recipe[] = [];
  private recipesSub: Subscription;

  constructor(private recipeService: RecipeService) {}

  public ngOnInit(): void {
    this.recipesSub = this.recipeService.changedRecipes.subscribe((changedRecipes: Recipe[]) => {
      this.recipes = changedRecipes;
    });
    this.recipes = this.recipeService.getRecipes();
  }

  public ngOnDestroy(): void {
    this.recipesSub.unsubscribe();
  }
}
