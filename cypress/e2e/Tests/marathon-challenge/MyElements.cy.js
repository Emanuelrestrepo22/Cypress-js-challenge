import { faker } from '@faker-js/faker';

/* eslint-disable indent */

// Test Suite

describe('Challenge Elements', () => {
	// Preconditions
	beforeEach('PRC: User must be located in the Text-Box page', () => {
		cy.visit('/text-box');
		// cy.url().should('contain', 'text-box');
	});

	// Test Cases
	it('TEXTBOX - TC1: Validate submit form with valid credentials', () => {
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

	it.only('CHECKBOX - TC2: Validate check boxes and labels displayed afterwards', () => {
		cy.visit('/checkbox');

		//ACTION
		cy.get('[for^=tree-node]').should('have.length', 1);
		cy.get('[aria-label = "Expand all"]').click();
		cy.get('[for^=tree-node]').should('have.length', 17);

		//ASSERT
		cy.get('[type=checkbox]').eq(0).check({ force: true });
		cy.get('[type=checkbox]').eq(0).should('be.checked');

		cy.get('[type=checkbox]').eq(5).uncheck({ force: true });
		cy.get('[type=checkbox]').eq(5).should('not.be.checked');

		const labels = [];
		cy.get('[for^=tree-node]:has(.rct-icon-check)').each(element => {
			// Extraemos el texto de cada elemento y lo guardamos en un Array para poder compararlo luego
			labels.push(element.text());
		});
		const checkedLabels = labels.map(element => element.toLowerCase().replace(' ', '').replace('.doc', '')); // Modificamos el texto de cada elemento sacándole espacios en blanco y extensiones

		const successText = [];
		cy.get('#result .text-success').each(element => {
			// Extraemos el texto de los <span/> y los guardamos en un array
			successText.push(element.text);
		});
		const formattedText = successText.map(text => text.toLowerCase()); // Quitamos extensiones y espacios en blanco para compararlos
		expect(formattedText).deep.equal(checkedLabels); // Comparamos los arrays
	});
});
