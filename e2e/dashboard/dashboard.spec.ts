const homepage = process.env.HOMEPAGE || 'http://localhost:3000';
describe('Homepage', () => {
    it('shows Homepage', () => {
        cy.visit(homepage)
    })
})