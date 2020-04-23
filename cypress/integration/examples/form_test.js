import { v4 as uuid } from 'uuid'







//  Check for form validation if an input is left empty

const name = uuid().slice(0, 4)
const url = 'http://localhost:3000/'
const email = `${name}@example.com`
const password = uuid().slice(0,8)
const tos = 'termsofservice'

describe('Test Form MVP', () => {
    it('can navigate to the site', () => {
        cy.visit(url)
        cy.url().should('include', 'localhost')
    })

    it('can submit a user (happy path lol)', () => {
        //  Get the Name input and type a name in it.
        cy.get('input[name="name"]')
          .type(name)
        //  Use an assertion to check if the text inputted contains the name you provided (Hint: use the .should assertion)
          .should('have.value', name)
          
        //  Get the Email input and 
        cy.get('input[name="email"]')
        // type an email address in it
          .type(email)
          .should('have.value', email)

        //  Get the password input and 
        cy.get('input[name="password"]')
        // type a password in it
          .type(password)
          .should('have.value', password)

        cy.get('input[name="termsofservice"]')
        //  Set up a test that will check to see if a user can check the terms of service box
          .check().should('be.checked')
          
          cy.contains('Submit')
          .click()
    })



})