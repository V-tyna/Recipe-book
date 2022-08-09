import { Injectable } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list/services/shopping-list.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'Baked pork',
      `Prepare the spice mixture: Mix together the kosher salt, black pepper, garlic powder, paprika, sage, and thyme.
      Next, rub the spice mixture all over the pork. Now spray its top liberally with olive oil.
      Cook the pork for 15 minutes at 425°F, then lower the oven to 375°F and continue cooking to an internal temperature of 145°F, about 75 more minutes.
      Let it rest for 20 minutes before slicing and serving.`,
      'https://images.unsplash.com/photo-1504649346668-2cc86afaa2e1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1664&q=80',
      [
        new Ingredient('pork', 1),
        new Ingredient('rosemary', 3),
        new Ingredient('garlic ', 4),
        new Ingredient('lemon ', 1),
        new Ingredient('paprika', 1),
        new Ingredient('sage', 1),
        new Ingredient('thyme', 1),
        new Ingredient('black pepper,', 1),
        new Ingredient('salt,', 1)
      ]
    ),
    new Recipe(
      'Pancakes',
      `In a large bowl, sift together the flour, baking powder, salt and sugar.
      Make a well in the center and pour in the milk, egg and melted butter; mix until smooth.
      Heat a lightly oiled griddle or frying pan over medium-high heat. Pour or scoop the batter onto the griddle,
      using approximately 1/4 cup for each pancake. Brown on both sides and serve hot.`,
      'https://images.unsplash.com/photo-1522248105696-9625ba87de6e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
      [
        new Ingredient('flour', 1),
        new Ingredient('teaspoons baking powder', 3),
        new Ingredient('teaspoon salt, or more to taste', 1),
        new Ingredient('tablespoon white sugar', 1),
        new Ingredient('milk', 1),
        new Ingredient('egg', 2),
        new Ingredient('tablespoons butter, melted', 1),
        new Ingredient('strawberry', 7),
        new Ingredient('blueberry', 10)
      ]
    ),
    new Recipe(
      'Pasta fettuccine',
      `Put a large saucepan on a medium heat and add 1 tbsp olive oil.
      Add 4 finely chopped bacon rashers and fry for 10 mins until golden and crisp.
      Reduce the heat and add the 2 onions, 2 carrots, 2 celery sticks, 2 garlic cloves and the leaves from 2-3 sprigs rosemary,
      all finely chopped, then fry for 10 mins. Stir the veg often until it softens.
      Increase the heat to medium-high, add 500g beef mince and cook stirring for 3-4 mins until the meat is browned all over.
      Add 2 tins plum tomatoes, the finely chopped leaves from ¾ small pack basil, 1 tsp dried oregano, 2 bay leaves, 2 tbsp tomato purée,
      1 beef stock cube, 1 deseeded and finely chopped red chilli (if using),
      125ml red wine and 6 halved cherry tomatoes. Stir with a wooden spoon, breaking up the plum tomatoes.
      Bring to the boil, reduce to a gentle simmer and cover with a lid. Cook for 1 hr 15 mins stirring occasionally, until you have a rich, thick sauce.
      Add the 75g grated parmesan, check the seasoning and stir.
      When the bolognese is nearly finished, cook 400g spaghetti following the pack instructions.
      Drain the spaghetti and either stir into the bolognese sauce, or serve the sauce on top.
      Serve with more grated parmesan, the remaining basil leaves and crusty bread, if you like.`,
      'https://images.unsplash.com/photo-1597131628347-c769fc631754?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      [
        new Ingredient('bacon', 4),
        new Ingredient('onion', 2),
        new Ingredient('tomato', 3),
        new Ingredient('celery ', 1),
        new Ingredient('carrot', 2),
        new Ingredient('beef', 1),
        new Ingredient('fettuccine', 1),
        new Ingredient('olives', 1)
      ]
    )
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  public getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  public getRecipeById(index: number): Recipe {
    return this.recipes.slice()[index];
  }

  public addIngredientsToTheShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
