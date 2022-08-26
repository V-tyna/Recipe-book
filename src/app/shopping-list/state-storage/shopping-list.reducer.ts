import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.action';
import { IngredientState } from './shopping-list.model';

const initialState: IngredientState = {
  ingredients: [
    new Ingredient('tomato', 5),
    new Ingredient('pepper', 2),
    new Ingredient('egg plant', 1),
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(
  state: IngredientState = initialState,
  action: ShoppingListActions.ShoppingListActions
): IngredientState {
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
    const ingredient = state.ingredients[state.editedIngredientIndex];
    const updatedIngredient = {
      ...ingredient,
      ...(action as ShoppingListActions.UpdateIngredient).payload
    };
    const updatedIngredients = [...state.ingredients];
    updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

    return {
      ...state,
      ingredients: updatedIngredients,
      editedIngredient: null,
      editedIngredientIndex: -1
    };
  }
  if (action.type === ShoppingListActions.DELETE_INGREDIENT) {
    return {
      ...state,
      ingredients: state.ingredients.filter((ing, i) => i !== state.editedIngredientIndex),
      editedIngredient: null,
      editedIngredientIndex: -1
    };
  }
  if (action.type === ShoppingListActions.START_EDIT) {
    return {
      ...state,
      editedIngredientIndex: (action.payload as number),
      editedIngredient: { ...state.ingredients[(action.payload as number)] },
    };
  }
  if (action.type === ShoppingListActions.STOP_EDIT) {
    return {
      ...state,
      editedIngredient: null,
      editedIngredientIndex: -1
    };
  }
  return state;
}
