import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
    private recipes: Recipe[] = [
        new Recipe("A Tasty Schnitzel",
                 'You are gonna love this', 
                 './dark.jpg',
                 [
                     new Ingredient('Meat', 1),
                     new Ingredient('French Fries', 20)
                 ]),
        new Recipe("Big Fat Burger", 
                'What else you need to say?', 
                './dark.jpg',
                [
                    new Ingredient('Buns', 2),
                    new Ingredient('Bread', 1)
                ]),
      ];

    constructor(private slService: ShoppingListService) {} 
      
    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients)
    }
}