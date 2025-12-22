describe('Конструктор бургера', () => {
  beforeEach(() => {
    cy.setCookie('accessToken', 'test-access-token');
    window.localStorage.setItem('refreshToken', 'test-refresh-token');

    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('GET', '**/api/orders/all', {
      body: { success: true, orders: [], total: 0, totalToday: 0 }
    }).as('getFeeds');

    cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );

    cy.intercept('POST', '**/api/orders', { fixture: 'order.json' }).as(
      'postOrder'
    );

    cy.visit('/');

    cy.wait('@getIngredients');
    cy.wait('@getUser');
  });

  it('должен добавлять ингредиенты в конструктор по клику на "Добавить"', () => {
    const bunName = 'Краторная булка N-200i';
    const mainName = 'Биокотлета из марсианской Магнолии';

    cy.contains(bunName).parents('[data-cy=ingredient]').find('button').click();
    cy.contains(mainName)
      .parents('[data-cy=ingredient]')
      .find('button')
      .click();

    cy.get('[data-cy=burger-constructor]').within(() => {
      cy.contains(bunName + ' (верх)').should('exist');
      cy.contains(bunName + ' (низ)').should('exist');
      cy.contains(mainName).should('exist');
    });
  });

  it('должен открывать и закрывать модальное окно ингредиента', () => {
    const mainName = 'Биокотлета из марсианской Магнолии';

    cy.contains(mainName).click();

    cy.get('[data-cy=modal]').should('be.visible');
    cy.get('[data-cy=modal]').contains(mainName).should('exist');

    cy.get('[data-cy=modal-close]').click();
    cy.get('[data-cy=modal]').should('not.exist');
  });

  it('должен создавать заказ и очищать конструктор', () => {
    const bunName = 'Краторная булка N-200i';
    const mainName = 'Биокотлета из марсианской Магнолии';

    cy.contains(bunName).parents('[data-cy=ingredient]').find('button').click();
    cy.contains(mainName)
      .parents('[data-cy=ingredient]')
      .find('button')
      .click();

    cy.get('button').contains('Оформить заказ').click();

    cy.wait('@postOrder')
      .its('request.body')
      .should('deep.equal', {
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa093c'
        ]
      });

    cy.get('[data-cy=modal]').should('be.visible');
    cy.get('[data-cy=modal]').contains('12345').should('exist');

    cy.get('[data-cy=modal-close]').click();
    cy.get('[data-cy=modal]').should('not.exist');

    cy.get('[data-cy=burger-constructor]').within(() => {
      cy.contains(bunName).should('not.exist');
      cy.contains(mainName).should('not.exist');
      cy.contains('Выберите булки').should('exist');
    });
  });

  it('должен закрывать модальное окно кликом на оверлей', () => {
    const mainName = 'Биокотлета из марсианской Магнолии';
    cy.contains(mainName).click();

    cy.get('[data-cy=modal]').should('be.visible');

    cy.get('body').click(0, 0);

    cy.get('[data-cy=modal]').should('not.exist');
  });
});
