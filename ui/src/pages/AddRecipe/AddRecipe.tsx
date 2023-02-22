import "./AddRecipe.css";
import { RecipeForm } from "../../components/RecipeForm/RecipeForm";
import { Link } from "react-router-dom";

export const AddRecipe = () => {
  return (
    <div className="add-recipe">
      <div>
        <Link to="/">Back</Link>
        <h1>Create Recipe</h1>
      </div>
      <RecipeForm />
    </div>
  );
};
