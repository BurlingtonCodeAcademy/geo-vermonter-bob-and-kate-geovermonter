describe('Smoke Test', function () {
  it('Just checks if tests run', function () {
    expect(true).to.equal(true);
  });
});

describe('On initial page load', function () {
  before(() => cy.visit('/'));

  it('the basic page elements should exist', function () {
    ['#map', 'nav',
      '#info', 
      '#score',
      'button#startgame', 'button#guess', 'button#giveup', 'button#return'
    ].forEach((selector) => {
      it('Should have a ' + selector + ' element', function () {
        cy.get(selector); // this will fail if the given element is missing
      });
    });
  });
  it('displays INFO in the info section', () => {
    cy.get('div#info').then((element) => {
      assert.equal('INFO', element.text());
    });
  });
  it('displays SCORE in the score section', () => {
    cy.get('div#highscores').then((element) => {
      assert.equal('SCORE', element.text());
    });
  });
  it('Start button should be enabled', () => {
    cy.get('#startgame').should('be.enabled')
  });
  it('Return button should be disabled', () => {
    cy.get('#return').should('be.disabled')
  });
  it('Guess button should be disabled', () => {
    cy.get('#guess').should('be.disabled')
  });
  it('Give up button should be disabled', () => {
    cy.get('#giveup').should('be.disabled')
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
  });
  
  it('clears the score area', () => {
    cy.get('div#highscores').then((element)=>{
      assert.equal('', element.text())
    })
  })

  it('the Start button should be disabled', () => {
    cy.get('button#startgame').should('be.disabled');
  });

  it('the Give Up button should be enabled', () => {
    cy.get('button#giveup').should('be.enabled');
  });

  it('the Guess button should be disabled', () => {
    cy.get('button#guess').should('be.disabled');
  });

  it('the Return button should be enabled', ()=>{
    cy.get('button#return').should('be.enabled');
  })

  describe('After clicking the guess map,', () => {
    before(() => cy.get('#full-map').click());
    it('places a marker', function () { expect('markers').to.not.equal(null) });
    it('enables the Guess Button', () => {
      cy.get('button#guess').should('be.enabled');
    });

    describe('After clicking the guess button,', () => {
      before(() => cy.get('#guess').click());
      it('the score area displays something', function() {expect('#highscores').to.not.equal(``)});
      it('displays a list of highscores after five guesses', function() {
        let i = 1
        while(i < 5) {
          cy.get('#guess').click();
          i++
        };
        expect('#highscore-box').should('.exist')
      })
      //this test will fail until we make the high-score popup on game end
    });
  });

  describe('After clicking a directional button', () => {
    ['#north', '#south', '#east', '#west'].forEach((direction) => {
      it(direction + ' moves the map', function () {

        //not sure how to check map-state without variables, check inner html of  & compare before and after click?
        // <div id='map'>
              //<div class='leaflet-pane leaflet-map-pane" style="transform: translate3d(this is what changes when the map pans);">
              //... more divs ... some are children, not siblings ...
        //</div>
        cy.get('#return').click()

        let startingPoint = cy.get('#map').children('.leaflet-map-pane');
        cy.get(direction).click();
        expect(cy.get('#map').children('.leaflet-map-pane').to.not.equal(startingPoint))
        //startingpoint returns undefined; not sure why, in index it returns an object
      });
    });
  });

});

