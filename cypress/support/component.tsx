import './commands';

import { mount } from 'cypress/react18';

Cypress.Commands.add('mount', (component, props) => {
  const wrapped = <div>{component}</div>;

  return mount(wrapped, props);
});
