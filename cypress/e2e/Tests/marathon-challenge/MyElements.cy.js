import { faker } from '@faker-js/faker';

/* eslint-disable indent */

// Test Suite

describe('Challenge Elements', () => {
	// Preconditions
	beforeEach('PRC: User must be located in the Text-Box page', () => {
		cy.visit('/text-box');
		cy.url().should('contain', 'text-box');
	});

	// Test Cases
	it('TC1: Validate submit form with valid credentials', () => {
		// ARRANGE (preparación de variables reutilizables)

		const fullname = faker.name.fullName();
		const email = faker.internet.email();
		const currAdd = faker.address.streetName();
		const permAdd = faker.address.country();

		// ACT (acción y ejecución de métodos)
		cy.get('input#userName').type(fullname);
		cy.get('input#userEmail').type(email);
		cy.get('textarea#currentAddress').type(currAdd);
		cy.get('textarea#permanentAddress').type(permAdd);
		cy.get('#submit').click();

		// ASSERTIONS
		cy.get('p#name').should('contain', fullname);
		cy.get('p#email').should('contain', email);
		cy.get('p#currentAddress').should('contain', currAdd);
		cy.get('p#permanentAddress').should('contain', permAdd);
	});
});
