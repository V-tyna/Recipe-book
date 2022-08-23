import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { appPaths } from './configs/appPaths';

const appRoutes: Routes = [
  { path: appPaths.empty, redirectTo: `/${appPaths.recipes}`, pathMatch: 'full' },
  {
    path: appPaths.auth,
    loadChildren: () => import('./auth/auth.module').then((mod) => mod.AuthModule)
  },
  {
    path: appPaths.recipes,
    loadChildren: () => import('./recipes/modules/recipe.module').then((mod) => mod.RecipesModule)
  },
  {
    path: appPaths.shoppingList,
    loadChildren: () => import('./shopping-list/shopping-list.module').then((mod) => mod.ShoppingListModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})
export class AppRoutingModule { }
