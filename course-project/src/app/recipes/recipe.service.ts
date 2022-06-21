import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
    recipesChange = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //     new Recipe("A Tasty Schnitzel",
    //              'You are gonna love this', 
    //              './dark.jpg',
    //              [
    //                  new Ingredient('Meat', 1),
    //                  new Ingredient('French Fries', 20)
    //              ]),
    //     new Recipe("Big Fat Burger", 
    //             'What else you need to say?', 
    //             './dark.jpg',
    //             [
    //                 new Ingredient('Buns', 2),
    //                 new Ingredient('Bread', 1)
    //             ]),
    //   ];
    private recipes: Recipe[] = []

    constructor(private slService: ShoppingListService) {} 
      
    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChange.next(this.recipes.slice())
    }
    
    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients)
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChange.next(this.recipes.slice())
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChange.next(this.recipes.slice())
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChange.next(this.recipes.slice())
    }
}