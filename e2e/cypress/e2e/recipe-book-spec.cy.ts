import { v4 as uuid } from 'uuid';

describe("Recipe tests", () => {
  it(`Given I have a new recipe
      When I add the new recipe name
      And ingredients
      And measurements
      And cooking method
      Then the new recipe is saved for later`, () => {

        const recipeName = `Spaghetti-Bolognese-${uuid()}`;

        //go to the create page
        cy.visit('/create/')
          
        //add recipe name
        cy.getById("recipe-name").type(recipeName);
        
        //add ingredient and measurement
        cy.getById("ingredient-name-0").type('Mince');
        cy.getById("ingredient-amount-0").type('500');
        cy.getById("ingredient-unit-0").select('g');

        //add another ingredient and measurement
        cy.getById("add-ingredient-btn").click();
        cy.getById("ingredient-name-1").type('Chopped tomatoes');
        cy.getById("ingredient-amount-1").type('400');
        cy.getById("ingredient-unit-1").select('g');

        //add the method
        cy.getById("recipe-method")
          .type('Step 1: Fry the mince\nStep 2: Pour in the tomatoes...');

        //create the recipe
        cy.getById("create-recipe-btn").click();

        //check the recipe was saved...
        cy.getById(recipeName)
          .should('have.length', 1)
          .should('contain.text', recipeName);
  });

  it(`Given I want to look for a recipe
      When I search by the name of the recipe
      Then I find the recipe
      And I can see the ingredients
      And I can see the cooking methods`, () => {
      
        const recipeName = `Spaghetti-Bolognese-${uuid()}`;
        const ingredientName = 'Mince';
        const amount= '500';
        const unit= 'g';
        const method = 'Step 1: Fry the mince\nStep 2: Pour in the tomatoes...';

        //go to the create page
        cy.visit('/create/')
        
        //add recipe name
        cy.getById("recipe-name").type(recipeName);
        
        //add ingredient and measurement
        cy.getById("ingredient-name-0").type(ingredientName);
        cy.getById("ingredient-amount-0").type(amount);
        cy.getById("ingredient-unit-0").select(unit);

        //add the method
        cy.getById("recipe-method")
          .type(method);

        //create the recipe
        cy.getById("create-recipe-btn").click();

        //search for for the recipe name
        cy.getById('recipe-search-box')        
          .type(recipeName);
        cy.getById('recipe-search-btn').click();
        
        //check the recipe name, ingredients and method are found
        cy.getById('recipe-card')
        .should('have.length', 1);

        cy.getById(recipeName)
          .should('contain.text', recipeName);

        cy.getById("recipe-card-ingredients")          
          .children().should('have.length', 1)
          .first().should('contain.text', `${amount} ${unit} ${ingredientName}`);

        cy.getById("recipe-card-method")
          .should('contain.text', `${method}`);
  });

  it(`Given I want to look for a recipe by ingredients
      When I search by the ingredient of the recipe
      Then I find the recipe
      And I can see the ingredients
      And I can see the cooking methods`, () => {
        const recipeName = `Spaghetti-Bolognese-${uuid()}`;
        const ingredientName = `Mince-${uuid()}`;
        const amount= '500';
        const unit= 'g';
        const method = 'Step 1: Fry the mince\nStep 2: Pour in the tomatoes...';

        //go to the create page
        cy.visit('/create/')
        
        //add recipe name
        cy.getById("recipe-name").type(recipeName);
        
        //add ingredient and measurement
        cy.getById("ingredient-name-0").type(ingredientName);
        cy.getById("ingredient-amount-0").type(amount);
        cy.getById("ingredient-unit-0").select(unit);

        //add the method
        cy.getById("recipe-method")
          .type(method);

        //create the recipe
        cy.getById("create-recipe-btn").click();

        //search for for the recipe name
        cy.getById('recipe-search-box')        
          .type(ingredientName);
        cy.getById('recipe-search-btn').click();
        
        //check the recipe name, ingredients and method are found
        cy.getById('recipe-card')
        .should('have.length', 1);

        cy.getById(recipeName)
          .should('contain.text', recipeName);

        cy.getById("recipe-card-ingredients")          
          .children().should('have.length', 1)
          .first().should('contain.text', `${amount} ${unit} ${ingredientName}`);

        cy.getById("recipe-card-method")
          .should('contain.text', `${method}`);
  });
 });
