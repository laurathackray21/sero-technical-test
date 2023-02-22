import { json, urlencoded } from "body-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import { RecipeService } from "./RecipeService";

const app = express();
const recipeService = new RecipeService();

export class Application {
  constructor() {
    this.setupApplicationSettings();
    this.setupControllers();
  }

  setupApplicationSettings() {
    app.use(cors());
    app.use(urlencoded({ extended: false }));
    app.use(json());
  }

  listen() {
    app.listen(3080, () => console.log("Listening on port 3080"));
  }

  setupControllers() {
    app.get("/recipes", (req: Request, res: Response) => {
      const search = req.query.search?.toString();
      recipeService
        .getRecipes(search)
        .then((result) => res.status(200).send(result))
        .catch((err: Error) => console.error(err));
    });

    app.post("/recipes", (req: Request, res: Response) => {
      // if I had more time I'd add type guards to ensure the request is a 'recipe' type and I'd add validation to make sure all the fields are set
      recipeService
        .createRecipe(req.body, req.body.ingredients)
        .then(() => res.status(201).send())
        .catch((err: Error) => console.error(err));
    });

    app;
  }
}

const application = new Application();

application.listen();
