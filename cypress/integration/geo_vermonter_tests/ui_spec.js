
describe('Smoke Test', function () {
  it('Just checks if tests run', function () {
    expect(true).to.equal(true);
  });
});

describe('On initial page load', function () {
  before(() => cy.visit('/'));

  it('the basic page elements should exist', function () {
    ['#map', 'nav',
      '#info', '#info #latitude', '#info #longitude',
      '#info #county', '#info #town',
      '#score',
      'button#start', 'button#guess', 'button#giveup'
    ].forEach((selector) => {
      it('Should have a ' + selector + ' element', function () {
        cy.get(selector); // this will fail if the given element is missing
      });
    });
  });
});

describe('After clicking start', () => {
  before(() => {
    cy.visit('/');
    cy.get('button#startgame').click();
  });

  it('clears the info box', () => {
    cy.get('div#info').then((element) => {
      assert.equal('', element.text());
    });
  });//this test will break if we implement an info dropdown

  it('the Start button should be disabled', () => {
    cy.get('button#startgame').should('be.disabled');
  });

  it('the Give Up button should be enabled', () => {
    cy.get('button#giveup').should('be.enabled');
  });

  it('the Guess button should be disabled', () => {
    cy.get('button#guess').should('be.disabled');
  });

  describe('the guess map on click', () => {
    before(() => cy.get('#full-map').click());
    //it('places a marker', expect('markers').to.not.equal(null));
    it('enables the Guess Button', () => {
      cy.get('button#guess').should('be.enabled');
    });
  });

  describe('the directional buttons', () => {
    ['#north', '#south', '#east', '#west'].forEach((direction) => {
      it(direction + ' moves the map', function () {
        cy.get(direction).click();
        expect('mysteryPoint.center()').to.not.equal('currentCenter')
      });
    });
  });
});
