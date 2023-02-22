import { ChangeEvent, useEffect, useState, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { RecipeCard } from "../../components/RecipeCard/RecipeCard";
import { IRecipe } from "../../models/RecipeModels";
import { getRecipes } from "../../services/RecipeApi";
import "./home.css";

export const Home = () => {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getRecipes()
      .then((res) => setRecipes(() => [...res]))
      .catch((err) => console.error(err));
  }, []);

  function handleSearchChange(ev: ChangeEvent<HTMLInputElement>): void {
    setSearch(ev.target.value);
  }

  function executeSearch(): void {
    getRecipes(search).then((res) => setRecipes(() => [...res]));
  }

  function handleKeyDown(ev: KeyboardEvent): void {
    if (ev.key === "Enter") {
      executeSearch();
    }
  }

  return (
    <>
      <h1>Recipe Book</h1>
      <div className="recipe-book-search">
        <input
          id="search"
          data-test-id="recipe-search-box"
          type="search"
          placeholder="Search for a recipe name or ingredient..."
          value={search}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
        />
        <button data-test-id="recipe-search-btn" onClick={executeSearch}>
          Search
        </button>
      </div>
      <div className="recipe-book-create">
        <button onClick={() => navigate("/create")}>
          Create a new recipe!
        </button>
      </div>
      <div className="recipes">
        {recipes.map((recipe) => (
          <div className="card" key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </div>
    </>
  );
};
