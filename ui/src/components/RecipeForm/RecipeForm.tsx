import { ChangeEvent, FormEvent, MouseEvent, useReducer } from "react";
import { createRecipe } from "../../services/RecipeApi";
import "./RecipeForm.css";
import {
  defaultIngredient,
  defaultRecipe,
  recipeFormReducer,
  RecipeFormReducerActionType,
} from "../../reducers/AddRecipeFormReducer";
import { IngredientForm } from "../IngredientForm/IngredientForm";
import { useNavigate } from "react-router-dom";

export const RecipeForm = () => {
  const [recipe, dispatch] = useReducer(recipeFormReducer, defaultRecipe());

  const navigate = useNavigate();

  function handleSubmit(ev: FormEvent): void {
    ev.preventDefault();

    createRecipe(recipe)
      .catch((err) => console.error(err))
      .then(() => navigate("/"));
  }

  function addIngredient(ev: MouseEvent): void {
    ev.preventDefault();
    dispatch({
      type: RecipeFormReducerActionType.ADD_INGREDIENT,
      ingredient: defaultIngredient(),
    });
  }

  function handleRecipeFieldChange(
    ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    dispatch({
      type: RecipeFormReducerActionType.UPDATE_RECIPE_FIELD,
      field: ev.target.name,
      value: ev.target.value,
    });
  }

  return (
    <form className="recipe-form" onSubmit={handleSubmit}>
      <label htmlFor="name">Give your recipe a name</label>
      <input
        id="name"
        data-test-id="recipe-name"
        placeholder="Recipe name"
        value={recipe.name}
        maxLength={100}
        required
        type="text"
        name="name"
        onChange={handleRecipeFieldChange}
      />
      <div>Add your ingredients...</div>
      {recipe.ingredients.map((i, idx) => (
        <IngredientForm
          key={idx}
          ingredient={i}
          index={idx}
          dispatch={dispatch}
        />
      ))}
      <button
        id="add-ingredient-btn"
        className="secondary-button"
        data-test-id="add-ingredient-btn"
        onClick={addIngredient}
      >
        Add another ingredient
      </button>
      <label htmlFor="method">How do you make it?</label>
      <textarea
        id="method"
        data-test-id="recipe-method"
        name="method"
        value={recipe.method}
        onChange={handleRecipeFieldChange}
        required
        rows={10}
      />
      <div className="footer">
        <button
          id="create-recipe-btn"
          data-test-id="create-recipe-btn"
          type="submit"
        >
          Add Recipe
        </button>
      </div>
    </form>
  );
};
