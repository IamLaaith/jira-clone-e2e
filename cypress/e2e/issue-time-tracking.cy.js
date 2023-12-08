import { faker } from '@faker-js/faker';

describe('Time tracking', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
      //Going straight to issue creation because existing issues are not good for assignment conditions
      cy.visit(url + '/board?modal-issue-create=true');
      });
    });

    const randomTitle = faker.lorem.word();
    const randomDescription = faker.lorem.words(5);
    const initialEstimateTime = 10;
    const editEstimateTime = 20;
    const timeSpent = 2;
    const timeRemaining = 5;


    it('Assignment 2. Time estimation: Add, edit, remove', () => {



        //----------------------Begin creating a new issue to work with---------------------------------------
        cy.get('[data-testid="modal:issue-create"]').within(() => {
                    
            cy.get('.ql-editor').type(randomDescription);
            cy.get('input[name="title"]').type(randomTitle);

            cy.get('[data-testid="form-field:reporterId"]').click();
            cy.get('[data-testid="select-option:Pickle Rick"]').click();

            cy.get('[data-testid="form-field:priority"]').click();
            cy.get('[data-testid="select-option:Highest"]').click();

            cy.get('button[type="submit"]').click();
        });
        //----------------------End creating a new issue-----------------------------------------------------


        //----------------------Begin setting estimated time-------------------------------------------------
        cy.get('[data-testid="list-issue"]');
        cy.contains(randomTitle).click();

        cy.get('input[placeholder="Number"]').type(initialEstimateTime);

        cy.get('[data-testid="icon:close"]').click();

        cy.get('[data-testid="list-issue"]');
        cy.contains(randomTitle).click();

        cy.get('input[placeholder="Number"]').should('have.value', initialEstimateTime);

        cy.get('[data-testid="icon:close"]').click();


        //----------------------End setting estimated time--------------------------------------------------


        //----------------------Start updating estimated time-----------------------------------------------

        cy.get('[data-testid="list-issue"]');
        cy.contains(randomTitle).click();

        cy.get('input[placeholder="Number"]').clear().type(editEstimateTime);

        cy.get('[data-testid="icon:close"]').click();

        cy.get('[data-testid="list-issue"]');
        cy.contains(randomTitle).click();

        cy.get('input[placeholder="Number"]').should('have.value', editEstimateTime);

        cy.get('[data-testid="icon:close"]').click();

        //----------------------End updating estimated time------------------------------------------------


        //----------------------Start removing estimated time----------------------------------------------

        cy.get('[data-testid="list-issue"]');
        cy.contains(randomTitle).click();

        cy.get('input[placeholder="Number"]').clear();

        cy.get('[data-testid="icon:close"]').click();

        cy.get('[data-testid="list-issue"]');
        cy.contains(randomTitle).click();

        cy.get('input[placeholder="Number"]').contains(editEstimateTime).should('not.exist');

        //----------------------End removing estimated time------------------------------------------------

    });

    it('Assignment 2. Time Logging: Add, remove', () => {



        //----------------------Begin creating a new issue to work with---------------------------------------
        cy.get('[data-testid="modal:issue-create"]').within(() => {
                    
            cy.get('.ql-editor').type(randomDescription);
            cy.get('input[name="title"]').type(randomTitle);

            cy.get('[data-testid="form-field:reporterId"]').click();
            cy.get('[data-testid="select-option:Pickle Rick"]').click();

            cy.get('[data-testid="form-field:priority"]').click();
            cy.get('[data-testid="select-option:Highest"]').click();

            cy.get('button[type="submit"]').click();
        });
        //----------------------End creating a new issue-----------------------------------------------------



        //----------------------Begin entering estimated time, logged time and remaining time----------------
        cy.get('[data-testid="list-issue"]');
        cy.contains(randomTitle).click();

        cy.get('input[placeholder="Number"]').type(initialEstimateTime);

        cy.get('[data-testid="icon:stopwatch"]').click();
        cy.get('[data-testid="modal:tracking"]').should('be.visible')
            .within(() => {
            cy.get('input[placeholder="Number"]').eq(0).type(timeSpent);
            cy.get('input[placeholder="Number"]').eq(1).type(timeRemaining);
            
        cy.contains('button', 'Done').click();

        });

        cy.get('[data-testid="modal:issue-details"]').should('be.visible')
        cy.contains("No time logged").should('not.exist')
        cy.contains(`${timeSpent}${'h logged'}`).should('be.visible');
        cy.contains(`${timeRemaining}${'h remaining'}`).should('be.visible');

        cy.get('[data-testid="icon:close"]').click();


        //----------------------End entering estimated time, logged time and remaining time------------------


        //----------------------Begin removing logged time---------------------------------------------------

        cy.get('[data-testid="list-issue"]');
        cy.contains(randomTitle).click();

        cy.get('[data-testid="icon:stopwatch"]').click();
        cy.get('[data-testid="modal:tracking"]').should('be.visible')
            .within(() => {
            cy.get('input[placeholder="Number"]').eq(0).clear();
            cy.get('input[placeholder="Number"]').eq(1).clear();
            
        cy.contains('button', 'Done').click();

        });

        cy.get('[data-testid="modal:issue-details"]').should('be.visible')

        cy.contains("No time logged").should('be.visible')
        cy.contains(`${timeSpent}${'h logged'}`).should('not.exist');
        cy.contains(`${timeRemaining}${'h remaining'}`).should('not.exist');

        cy.contains(`${initialEstimateTime}${'h estimated'}`).should('be.visible');


        //----------------------End removing logged time-----------------------------------------------------

    });

});
