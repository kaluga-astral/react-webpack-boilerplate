import { Badge } from 'common/ui';

describe('Badge', () => {
  it('Отображается, если isShow:true', () => {
    cy.mount(<Badge isShow color="red" />);
    cy.contains('Badge').should('exist');
  });
});
