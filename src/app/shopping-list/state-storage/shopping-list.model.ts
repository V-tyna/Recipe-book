import { Ingredient } from 'src/app/shared/ingredient.model';

export interface IngredientState {
  ingredients: Ingredient[];
  editedIngredient: Ingredient | null;
  editedIngredientIndex: number;
}
