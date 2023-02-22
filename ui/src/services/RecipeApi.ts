import { IRecipe } from "../models/RecipeModels";
import { BASE_URL } from "../../config";

export async function getRecipes(search?: string): Promise<IRecipe[]> {
  const url = new URL("recipes", BASE_URL);
  if (search) {
    url.searchParams.append("search", search);
  }
  const result = await fetch(url);
  return (await result.json()) as IRecipe[];
}

export async function createRecipe(recipe: IRecipe): Promise<Response> {
  const url = new URL("recipes", BASE_URL);
  return fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  });
}
