import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ShoppingListService } from '../services/shopping-list.service';
import { IngredientState } from '../state-storage/shopping-list.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  public ingredients: Observable<IngredientState>;

  private shoppingListSub: Subscription;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{ shoppingList: IngredientState }>
  ) { }

  public ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.shoppingListSub = this.shoppingListService.changedIngredients
    //   .subscribe((changedIngs: Ingredient[]) => {
    //     this.ingredients = changedIngs;
    //   });
  }

  public ngOnDestroy(): void {
    // this.shoppingListSub.unsubscribe();
  }

  public onEditItem(i: number): void {
    this.shoppingListService.startedEditing.next(i);
  }
}
