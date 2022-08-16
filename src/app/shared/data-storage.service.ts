import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipes/recipe.model';
import { RecipeService } from '../recipes/services/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) { }

  public storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    return this.http.put('https://recipe-book-d859e-default-rtdb.firebaseio.com/recipes.json', recipes)
      .subscribe(() => {
        // console.log(response);
      });
  }

  public fetchRecipes() {
    return this.http.get<Recipe[]>('https://recipe-book-d859e-default-rtdb.firebaseio.com/recipes.json')
      .pipe(
        map((recipes) => recipes.map((recipe) => (
          { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }))),
        tap((response) => {
          this.recipeService.setRecipes(response);
        })
      );
  }
}
