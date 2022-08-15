import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({ providedIn: 'root' })

export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(
private dataStorageService: DataStorageService,
    private recipeService: RecipeService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Recipe[]> | Recipe[] {
    const recipes = this.recipeService.getRecipes();
    if (!recipes.length) {
      return this.dataStorageService.fetchRecipes();
    }
    return recipes;
  }
}
