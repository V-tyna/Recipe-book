import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipes/recipe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() public recipe!: Recipe;

  public descriptionFirstSentence!: string;

  constructor(private recipeService: RecipeService) {}

  public ngOnInit(): void {
    this.descriptionFirstSentence = this.recipe.description.slice(0, 55);
  }

  public onSelectedRecipe() {
    this.recipeService.selectedRecipe.emit(this.recipe);
  }
}
