import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appPaths } from './configs/appPaths';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes/recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list/shopping-list.component';

const appRoutes: Routes = [
  { path: appPaths.empty, redirectTo: `/${appPaths.recipes}`, pathMatch: 'full' },
  { path: appPaths.recipes,
    component: RecipesComponent,
    children: [
      { path: appPaths.empty, component: RecipeStartComponent },
      { path: appPaths.new, component: RecipeEditComponent },
      { path: appPaths.id, component: RecipeDetailComponent },
      { path: appPaths.edit, component: RecipeEditComponent }
    ] },
  { path: appPaths.shoppingList, component: ShoppingListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})
export class AppRoutingModule { }
