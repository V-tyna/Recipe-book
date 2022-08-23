import { NgModule } from '@angular/core';
import { AuthGuardService } from 'src/app/auth/auth-guard.service';
import { appPaths } from 'src/app/configs/appPaths';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from '../recipes/recipes.component';
import { RecipeDetailComponent } from '../recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from '../recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from '../recipe-start/recipe-start.component';
import { RecipeResolverService } from '../services/recipe-resolver.service';

const recipesRoutes: Routes = [{ path: appPaths.empty,
  canActivate: [AuthGuardService],
  component: RecipesComponent,
  children: [
    { path: appPaths.edit, component: RecipeEditComponent },
    { path: appPaths.empty, component: RecipeStartComponent },
    { path: appPaths.new, component: RecipeEditComponent },
    { path: appPaths.id, component: RecipeDetailComponent, resolve: [RecipeResolverService] }
  ]
}];

@NgModule({
  imports: [
    RouterModule.forChild(recipesRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class RecipesRoutingModule {

}
