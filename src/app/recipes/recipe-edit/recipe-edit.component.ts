import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  public id: number;
  public editMode = false;
  public recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe((params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      });
  }

  public onSubmit(): void {
    const { name, description, imagePath } = this.recipeForm.value;
    const ingredients = (<FormArray>this.recipeForm.get('ingredients')).controls.map((fg) => fg.value);
    const recipe: Recipe = {
      name,
      description,
      imagePath,
      ingredients
    };
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, recipe);
      this.router.navigate([`/recipes/${this.id}`]);
    } else {
      this.recipeService.addRecipe(recipe);
      this.router.navigate(['/recipes']);
    }
  }

  public onAddIngredient(): void {
    this.controls.push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [Validators.required, Validators.min(1)])
      })
    );
  }

  public onDeleteIngredient(i: number): void {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(i);
  }

  public onCancel(): void {
    this.router.navigate([`/recipes/${this.id}`]);
  }

  public get controls(): AbstractControl[] {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  private initForm(): void {
    let recipeName = '';
    let imagePath = '';
    let description = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipeById(this.id);
      recipeName = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description;
      if (recipe['ingredients']) {
        recipe.ingredients.forEach((ing: Ingredient) => recipeIngredients.push(new FormGroup({
          name: new FormControl(ing.name, Validators.required),
          amount: new FormControl(ing.amount, [Validators.required, Validators.min(1)])
        })));
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(imagePath, Validators.required),
      description: new FormControl(description, Validators.required),
      ingredients: recipeIngredients
    });
  }
}
