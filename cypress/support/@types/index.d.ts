declare namespace Cypress {
  interface Chainable {
    signin({ email, password }): void;
  }
}
