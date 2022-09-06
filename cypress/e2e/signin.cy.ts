import { mainSelectors } from '../selectors/main';
import { signinSelectors } from '../selectors/signin';
import { toastSelectors } from '../selectors/toast';

describe('Sign in Page', () => {
  let errorMessages: any;

  beforeEach(() => {
    cy.fixture('errors').then(errors => {
      errorMessages = errors;
    });
  });

  describe('Success', () => {
    it('should be able log into the app when credentials are valid', () => {
      cy.fixture('user').then(({ valid: { email, password } }) => {
        cy.signin({ email, password });
        cy.get(mainSelectors.logoutButton).should('be.visible');
      });
    });

    it('should be able to view the registration screen when clicked not register button', () => {
      cy.visit('/');
      cy.get(signinSelectors.registerButton).click();
      cy.url().should('include', 'register');
    });
  });

  describe('Fail', () => {
    it('should not be able log into the app when e-mail are invalid', () => {
      cy.fixture('user').then(({ invalid: { email, password } }) => {
        cy.signin({ email, password });
        cy.get(signinSelectors.errorMessage).should('be.visible');
        cy.get(signinSelectors.errorMessage).should(
          'contain.text',
          errorMessages.invalidEmail,
        );
      });
    });

    it('should not be enable sign button when credentials are invalid', () => {
      cy.fixture('user').then(({ invalid: { email, password } }) => {
        cy.signin({ email, password });
        cy.get(signinSelectors.signinButton).should('be.disabled');
      });
    });

    it('should not be log into the app when user dont have register', () => {
      cy.fixture('user').then(({ notRegistered: { email, password } }) => {
        cy.signin({ email, password });
        cy.get(toastSelectors.message).should(
          'contain.text',
          errorMessages.incorrectEmailOrPassword,
        );
      });
    });
  });
});
