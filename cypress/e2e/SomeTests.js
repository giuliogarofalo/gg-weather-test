describe('Some Tests', () => {
  beforeEach(()=> {
    cy.visit('http://localhost:5174')
  })

  it('nothing to be displayed at load time', () => {
    cy.contains('p', 'No data yet')
  })
  it('receive current weather data clicking on Locate button', () => {
    cy.get('.locate-me').click()
    cy.contains('h2', 'Current Weather ')
  })

  it('receive an error typing an incorrect city name in search input', () => {
    cy.request({url: `https://api.openweathermap.org/data/2.5/weather?q=bonona&units=metric&appid=${Cypress.env('VITE_API_KEY')}`, failOnStatusCode: false}).its('status').should('equal', 401)
  })  

  it('receive current weather data typing a correct city name in search input', () => {
    cy.get('input.rounded-full').type(`Canicatti{enter}`)
    cy.get('.search-button').click()
    cy.contains('h1', 'Canicatti')
  })
 
})