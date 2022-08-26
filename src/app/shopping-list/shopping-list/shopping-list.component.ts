import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/models/app.model';
import { IngredientState } from '../state-storage/shopping-list.model';
import * as ShoppingListAction from '../state-storage/shopping-list.action';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  public ingredients: Observable<IngredientState>;

  private shoppingListSub: Subscription;

  constructor(
    private store: Store<AppState>
  ) { }

  public ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
  }

  public onEditItem(i: number): void {
    this.store.dispatch(new ShoppingListAction.StartEdit(i));
  }
}
