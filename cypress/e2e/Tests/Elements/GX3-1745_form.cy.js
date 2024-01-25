import * as json from "@data/GX3-1745_form.json";
import { getRealValue } from "@helper/GX3-1745_utils";

describe('GX3-1745: ToolsQA | Elements | Text Box: Fill form and Submit', () => {
    beforeEach(() => {
        cy.visit('/text-box');
    });

    // HAPPY PATH
    it('GX3-1745 | TC1 should be able fill and submit successfully', function () {
        // Utilizamos cy.fixture sin la barra inicial porque es un alias y no una ruta absoluta
        cy.fixture('data/GX3-1745_form').as('data');

        // Se corrige el nombre de la propiedad para acceder a las credenciales válidas
        cy.get('#userName-wrapper input').type(json.validCredentials.fullName);
        cy.get('#userEmail-wrapper input').type(json.validCredentials.email);
        cy.get('#currentAddress-wrapper textarea').type(json.validCredentials.currentAddress);
        cy.get('#permanentAddress-wrapper textarea').type(json.validCredentials.permanentAddress);
        cy.get('#submit').click();

        // ASSERTIONS
        cy.get('#output #name').invoke('text').should('contain', json.validCredentials.fullName);
        cy.get('#output #email').invoke('text').should('contain', json.validCredentials.email);
        cy.get('#output #currentAddress').invoke('text').should('contain', json.validCredentials.currentAddress);
        cy.get('#output #permanentAddress').invoke('text').should('contain', json.validCredentials.permanentAddress);

        // Validación de valores reales utilizando el método getRealValue
        cy.get('#output #name').invoke('text').as('name');
        cy.get('#output #email').invoke('text').as('email');
        cy.get('#output #currentAddress').invoke('text').as('currentAddress');
        cy.get('#output #permanentAddress').invoke('text').as('permanentAddress');

        cy.then(() => {
            expect(getRealValue(this.name)).to.equal(json.validCredentials.fullName);
            expect(getRealValue(this.email)).to.equal(json.validCredentials.email);
            expect(getRealValue(this.currentAddress)).to.equal(json.validCredentials.currentAddress);
            expect(getRealValue(this.permanentAddress)).to.equal(json.validCredentials.permanentAddress);
        });

        // Recargar la página antes de la siguiente prueba
        cy.reload();
    });

    // NEGATIVE CASES
    it('GX3-1745 | TC2 should not able to submit when email does not have At @', function () {
        cy.get('#userName-wrapper input').type(json.validCredentials.fullName);
        cy.get('#userEmail-wrapper input').type(json.invalidEmailCredentials.emailWithoutAt);
        cy.get('#currentAddress-wrapper textarea').type(json.validCredentials.currentAddress);
        cy.get('#permanentAddress-wrapper textarea').type(json.validCredentials.permanentAddress);
        cy.get('#submit').click();
        //cy.get('#userEmail-wrapper input').should('have.class', 'field-error');
    });
     it('GX3-1745 | TC3 should not able to submit when email does not have DOT "."', function () {
        cy.get('#userName-wrapper input').type(json.validCredentials.fullName);
        cy.get('#userEmail-wrapper input').type(json.invalidEmailCredentials.emailWithoutDot);
        cy.get('#currentAddress-wrapper textarea').type(json.validCredentials.currentAddress);
        cy.get('#permanentAddress-wrapper textarea').type(json.validCredentials.permanentAddress);
        cy.get('#submit').click();
        //cy.get('#userEmail-wrapper input').should('have.class', 'field-error');
     });
     it('GX3-1745 | TC4 should not able to submit when email does not have any character before At "@', function () {
        cy.get('#userName-wrapper input').type(json.validCredentials.fullName);
        cy.get('#userEmail-wrapper input').type(json.invalidEmailCredentials.emailWithoutCharacter);
        cy.get('#currentAddress-wrapper textarea').type(json.validCredentials.currentAddress);
        cy.get('#permanentAddress-wrapper textarea').type(json.validCredentials.permanentAddress);
        cy.get('#submit').click();
        //cy.get('#userEmail-wrapper input').should('have.class', 'field-error');
    });
});
