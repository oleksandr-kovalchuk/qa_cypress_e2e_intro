/// <reference types="cypress" />

describe('Sign In page', () => {
  const randomNumber = Math.random().toString().slice(2, 8);

  const baseUsername = 'SomeUser';
  const username = `${baseUsername}${randomNumber}`.toLowerCase();

  const emailDomain = '@mail.com';
  const email = `${username}${emailDomain}`.toLowerCase();

  const password = 'RandomPassword123!';

  const apiUrl = 'https://conduit.mate.academy/api/users';
  const loginLinkSelector = 'a[href="/user/login"]';
  const emailInputSelector = 'input[placeholder="Email"]';
  const passwordInputSelector = 'input[placeholder="Password"]';
  const loginButtonSelector = 'button[type="submit"]';

  beforeEach(() => {
    cy.visit('https://conduit.mate.academy/');
  });

  it('should allow a user to log in with valid credentials', () => {
    const userPayload = {
      user: {
        username,
        email,
        password
      }
    };

    cy.request('POST', apiUrl, userPayload);

    cy.get(loginLinkSelector).click();

    cy.get(emailInputSelector).type(email);
    cy.get(passwordInputSelector).type(password);

    cy.get(loginButtonSelector).click();

    cy.contains('a', username).should('exist');
  });
});
