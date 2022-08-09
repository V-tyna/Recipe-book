import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipes/recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() public recipe!: Recipe;

  @Input() public index?: number;

  public descriptionFirstSentence!: string;

  public ngOnInit(): void {
    this.descriptionFirstSentence = this.recipe.description.slice(0, 55);
  }
}
