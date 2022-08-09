import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  public ingredients: Ingredient[] = [];

  private shoppingListSub: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  public ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.shoppingListSub = this.shoppingListService.changedIngredients
      .subscribe((changedIngs: Ingredient[]) => {
        this.ingredients = changedIngs;
      });
  }

  public ngOnDestroy(): void {
    this.shoppingListSub.unsubscribe();
  }
}
