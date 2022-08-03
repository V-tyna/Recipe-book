import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../recipes/recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() public recipe!: Recipe;
  @Output() public recipeDetails = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  public onSelectedRecipe() {
    this.recipeDetails.emit()
  }

}
