/*
 Code-gen
*/
import { mount } from 'cypress/react';

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      headlessScreenshot(): Cypress.Chainable<T>;
      loadFileFileInMultiFileUploaderField(
        inputName: string,
        params?: { fileBase64: string; name: string; type: string },
      ): Cypress.Chainable<T>;
      chainSpy(spy: Cypress.Agent, wait?: number): Cypress.Chainable<T>;
    }
  }
}
