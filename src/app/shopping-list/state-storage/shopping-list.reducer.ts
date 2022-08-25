import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.action';
import { IngredientState } from './shopping-list.model';

const initialState: IngredientState = {
  ingredients: [
    new Ingredient('tomato', 5),
    new Ingredient('pepper', 2),
    new Ingredient('egg plant', 1),
  ]
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions): IngredientState {
  if (action.type === ShoppingListActions.ADD_INGREDIENT) {
    return {
      ...state,
      ingredients: [
        ...state.ingredients,
        (action.payload as Ingredient)
      ]
    };
  }
  if (action.type === ShoppingListActions.ADD_INGREDIENTS) {
    return {
      ...state,
      ingredients: [
        ...state.ingredients,
        ...(action.payload as Ingredient[])
      ]
    };
  }
  if (action.type === ShoppingListActions.UPDATE_INGREDIENT) {
    const ingredient = state.ingredients[(action as ShoppingListActions.updateIngredient).payload!.index];
    const updatedIngredient = {
      ...ingredient,
      ...(action as ShoppingListActions.updateIngredient).payload?.ingredient
    };
    const updatedIngredients = [...state.ingredients];
    updatedIngredients[(action as ShoppingListActions.updateIngredient).payload!.index] = updatedIngredient;

    return {
      ...state,
      ingredients: updatedIngredients
    };
  }
  if (action.type === ShoppingListActions.DELETE_INGREDIENT) {
    return {
      ...state,
      ingredients: [

      ]
    };
  }
  return state;
}
