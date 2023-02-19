const baseUrl = "http://localhost:3080" //TODO: read from config

//TODO FIX THIS
interface IRecipe {
    [k: string]: FormDataEntryValue;
}

export async function createRecipe(recipe: IRecipe): Promise<Response> {
    const url = new URL('recipes', baseUrl);
    return fetch(url, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
      }); //TODO: CHECK OTHER SETTINGS
}