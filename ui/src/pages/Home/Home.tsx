import { AddRecipe } from "../AddRecipe/AddRecipe";
import "./home.css";

export const Home = () => {
  function createRecipe(): void {
    window.alert("Yo");
  }

  return (
    <div>
      <h1>Recipe Book</h1>
      <button onClick={createRecipe}>Create a new recipe!</button>
      <AddRecipe />
    </div>
  );
};
