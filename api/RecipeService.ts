import { PrismaClient, Prisma, Recipe, Ingredient } from "@prisma/client";
const prisma = new PrismaClient();

export class RecipeService {
  public createRecipe(recipe: Recipe, ingredients: Ingredient[]) {
    return prisma.recipe.create({
      data: {
        name: recipe.name,
        method: recipe.method,
        ingredients: {
          create: ingredients,
        },
      },
    });
  }

  public getRecipes(search?: string) {
    const args: Prisma.RecipeFindManyArgs = {
      include: {
        ingredients: true,
      },
      orderBy: {
        name: "asc",
      },
      where: {
        OR: [
          {
            ingredients: {
              some: { name: { contains: search, mode: "insensitive" } },
            },
          },
          {
            name: { contains: search, mode: "insensitive" },
          },
        ],
      },
    };

    return prisma.recipe.findMany(args);
  }
}
