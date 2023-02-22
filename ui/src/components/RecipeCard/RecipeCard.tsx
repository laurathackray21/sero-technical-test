import { IIngredient, IRecipe } from "../../models/RecipeModels";
import "./RecipeCard.css";
interface IRecipeCardProps {
  recipe: IRecipe;
}

export const RecipeCard = (props: IRecipeCardProps) => {
  function renderIngredient(ingredient: IIngredient) {
    return (
      <div key={ingredient.id}>
        {ingredient.amount} {ingredient.unit} {ingredient.name}
      </div>
    );
  }

  return (
    <div data-test-id="recipe-card" className="recipe-card">
      <div className="recipe-card-header">
        <h3 data-test-id={props.recipe.name}>{props.recipe.name}</h3>
      </div>
      <div className="recipe-card-content">
        <div className="recipe-card-ingredients">
          <h4>Ingredients</h4>
          <div data-test-id="recipe-card-ingredients">
            {props.recipe.ingredients.map((i) => renderIngredient(i))}
          </div>
        </div>
        <div className="recipe-card-method">
          <h4>Method</h4>
          <div data-test-id="recipe-card-method">{props.recipe.method}</div>
        </div>
      </div>
    </div>
  );
};
