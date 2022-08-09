import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  public recipeDetails!: Recipe;

  public id?: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipeDetails = this.recipeService.getRecipeById(this.id);
    });
  }

  public onAddToTheShoppingList() {
    this.recipeService.addIngredientsToTheShoppingList(this.recipeDetails.ingredients);
  }

  public onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
}
