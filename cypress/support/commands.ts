/// <reference types="cypress" />

import { signinSelectors } from '../selectors/signin';
import { SignInParams } from './@types/types';

Cypress.Commands.add('signin', ({ email, password }: SignInParams) => {
  cy.visit('/');
  cy.get(signinSelectors.emailInput).type(email);
  cy.get(signinSelectors.passwordInput).type(password);
  cy.get(signinSelectors.signinButton).click({ force: true });
});
