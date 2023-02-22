import { ChangeEvent, MouseEvent } from "react";
import { IIngredient } from "../../models/RecipeModels";
import {
  RecipeFormReducerAction,
  RecipeFormReducerActionType,
} from "../../reducers/AddRecipeFormReducer";
import "./IngredientForm.css";

interface IIngredientProps {
  ingredient: IIngredient;
  index: number;
  dispatch: (value: RecipeFormReducerAction) => void;
}

export const IngredientForm = (props: IIngredientProps) => {
  function updateIngredient(
    ev: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    idx: number
  ) {
    let value: string | number = ev.target.value;
    if (ev.target.type === "number") {
      value = Number(ev.target.value);
    }
    props.dispatch({
      type: RecipeFormReducerActionType.UPDATE_INGREDIENT,
      index: idx,
      field: ev.target.name,
      value: value,
    });
  }

  function deleteIngredient(ev: MouseEvent, idx: number) {
    ev.preventDefault();
    props.dispatch({
      type: RecipeFormReducerActionType.DELETE_INGREDIENT,
      index: idx,
    });
  }

  return (
    <div className="ingredient">
      <div className="ingredient-setting">
        <input
          id={`ingredient_${props.index}`}
          data-test-id={`ingredient-name-${props.index}`}
          name="name"
          placeholder="Ingredient name"
          type="text"
          value={props.ingredient.name}
          onChange={(ev) => updateIngredient(ev, props.index)}
          required
        />
      </div>
      <div className="ingredient-setting">
        <input
          id={`amount_${props.index}`}
          data-test-id={`ingredient-amount-${props.index}`}
          name="amount"
          type="number"
          placeholder="Ingredient amount"
          value={props.ingredient.amount.toString()}
          onChange={(ev) => updateIngredient(ev, props.index)}
          required
          min={0}
          max={100000}
        />
      </div>
      <div className="ingredient-setting">
        <select
          id={`unit_${props.index}`}
          data-test-id={`ingredient-unit-${props.index}`}
          name="unit"
          value={props.ingredient.unit}
          onChange={(ev) => updateIngredient(ev, props.index)}
          required
        >
          <option hidden disabled value="">
            --- Select a unit ---
          </option>
          <option value="unit">unit</option>
          <option value="g">g</option>
          <option value="kg">kg</option>
          <option value="ml">ml</option>
          <option value="oz">oz</option>
          <option value="tsp">tsp</option>
          <option value="tbsp">tbsp</option>
        </select>
      </div>
      <div className="ingredient-setting">
        <button
          type="button"
          className="secondary-button"
          onClick={(ev) => deleteIngredient(ev, props.index)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
