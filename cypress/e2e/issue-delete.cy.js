describe('Issue deleting', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
        cy.visit(url + '/board');
        cy.contains('This is an issue of type: Task.').click();
        cy.get('[data-testid="modal:issue-details"]').should('be.visible');  
      });
    });
  

it('Assignment 3. Test case 1. Issue deletion.', () => {

    cy.get('[data-testid="modal:issue-details"]').should('be.visible');
    cy.get('[data-testid="icon:trash"]').click();
    cy.get('[data-testid="modal:confirm"]').should('be.visible');
    

    cy.get('[data-testid="modal:confirm"]').within(() => {
    cy.contains('Are you sure you want to delete this issue?').should('be.visible');
    cy.contains("Once you delete, it's gone for good").should('be.visible');
    cy.contains('Delete issue').click();
    
    cy.get('[data-testid="modal:confirm"]').should('not.exist');
    
    cy.reload();
    cy.contains('This is an issue of type: Task.').should('not.exist');
     });
    });
    

it('Assignment 3. Test case 2. Issue Deletion Cancellation.', () => {
    
    cy.get('[data-testid="modal:issue-details"]').should('be.visible');
    cy.get('[data-testid="icon:trash"]').click();
    cy.get('[data-testid="modal:confirm"]').should('be.visible');
    
    cy.get('[data-testid="modal:confirm"]').within(() => {
        cy.contains('Are you sure you want to delete this issue?').should('be.visible');
        cy.contains("Once you delete, it's gone for good").should('be.visible');
        cy.contains('Cancel').click();
    });
    
    cy.get('[data-testid="modal:confirm"]').should('not.exist');
    cy.get('[data-testid="modal:issue-details"]').should('be.visible');
    cy.get('[data-testid="icon:close"]').first().click();
    cy.get('[data-testid="modal:issue-details"]').should('not.exist');
    
    cy.get('[data-testid="board-list:backlog"]').within(() => {
    cy.contains('This is an issue of type: Task.').should('be.visible');

    });
  
    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
  });

});

