import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  public ingredients: Ingredient[] = [
    new Ingredient('Tomatoes', 5),
    new Ingredient('Pepper', 2),
    new Ingredient('Egg plant', 1),
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
