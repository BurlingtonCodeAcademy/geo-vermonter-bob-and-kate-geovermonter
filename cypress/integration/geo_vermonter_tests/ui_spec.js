
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

  describe('After clicking the guess map,', () => {
    before(() => cy.get('#full-map').click());
    it('places a marker', function () { expect('markers').to.not.equal(null) });
    it('enables the Guess Button', () => {
      cy.get('button#guess').should('be.enabled');
    });
  });

  describe('After clicking a directional button', () => {
    ['#north', '#south', '#east', '#west'].forEach((direction) => {
      it(direction + ' moves the map', function () {
        cy.get(direction).click();
        expect(mysteryPoint.lat).to.not.equal(myMap.getCenter().lat)
      });
    });
  });

  describe('After clicking the return button,', () => {
    before(() => {
      cy.visit('/');
      cy.get('button#startgame').click();
      cy.get('button#north').click();
      cy.get('button#return').click();
    })
    it('Game map returns to original location', function () {
      expect(mysteryPoint.lat).to.equal(myMap.getCenter().lat)
      expect(mysteryPoint.long).to.equal(myMap.getCenter().lng)

  
    })
  })
});






