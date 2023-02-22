import { IIngredient, IRecipe } from "../models/RecipeModels";

export const defaultIngredient = (): IIngredient => ({
  name: "",
  amount: 0,
  unit: "",
});

export const defaultRecipe = (): IRecipe => ({
  name: "",
  ingredients: [defaultIngredient()],
  method: "",
});

export enum RecipeFormReducerActionType {
  UPDATE_RECIPE_FIELD,
  ADD_INGREDIENT,
  UPDATE_INGREDIENT,
  DELETE_INGREDIENT,
}

type UpdateRecipeFieldAction = {
  type: RecipeFormReducerActionType.UPDATE_RECIPE_FIELD;
  field: string;
  value: string;
};

type AddIngredientAction = {
  type: RecipeFormReducerActionType.ADD_INGREDIENT;
  ingredient: IIngredient;
};

type UpdateIngredientAction = {
  type: RecipeFormReducerActionType.UPDATE_INGREDIENT;
  index: number;
  field: string;
  value: string | number;
};

type DeleteIngredientAction = {
  type: RecipeFormReducerActionType.DELETE_INGREDIENT;
  index: number;
};

export type RecipeFormReducerAction =
  | UpdateRecipeFieldAction
  | AddIngredientAction
  | UpdateIngredientAction
  | DeleteIngredientAction;

export const recipeFormReducer = (
  state: IRecipe,
  action: RecipeFormReducerAction
) => {
  switch (action.type) {
    case RecipeFormReducerActionType.UPDATE_RECIPE_FIELD:
      return {
        ...state,
        [action.field]: action.value,
      };
    case RecipeFormReducerActionType.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.ingredient],
      };
    case RecipeFormReducerActionType.UPDATE_INGREDIENT:
      const ingredientToUpdate = state.ingredients[action.index];
      const updatedIngredient = {
        ...ingredientToUpdate,
        [action.field]: action.value,
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients.splice(action.index, 1, updatedIngredient);
      return {
        ...state,
        ingredients: updatedIngredients,
      };
    case RecipeFormReducerActionType.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients].filter(
          (x, idx) => idx !== action.index
        ),
      };

    default:
      return state;
  }
};
