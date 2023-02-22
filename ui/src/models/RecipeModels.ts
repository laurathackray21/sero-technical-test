export interface IIngredient {
  id?: number;
  name: string;
  amount: number;
  unit: string;
}

export interface IRecipe {
  id?: number;
  name: string;
  ingredients: IIngredient[];
  method: string;
}
