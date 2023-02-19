import { FormEvent } from "react";
import { createRecipe } from "../../RecipeApi";
import "./AddRecipe.css";

export const AddRecipe = () => {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const recipe = Object.fromEntries(formData.entries());

    createRecipe(recipe)
      .catch(() => console.log("error"))
      .then(() => console.log("success"));
  }

  return (
    <form className="recipe-form" onSubmit={handleSubmit}>
      <label className="labelled-input">
        Name:
        <input required type="text" name="name" />
      </label>

      <label className="labelled-input">
        Ingredient:
        <input required type="text" name="ingredient" />
      </label>

      <label className="labelled-input">
        Amount:
        <input required type="number" name="amount" />
      </label>

      <label className="labelled-input">
        Unit:
        <input required type="text" name="unit" />
      </label>

      <label className="labelled-input">
        Method:
        <textarea required name="method" />
      </label>
      <button type="submit">Add Recipe</button>
    </form>
  );
};
