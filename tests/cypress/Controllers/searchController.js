require('cypress-xpath');


class searchController {
    static validarResultadoBusqueda($el) {
        cy.wrap($el).find('img')
          .should('have.attr', 'src')
          .and('include', 'http');
      
        cy.wrap($el).find('.song-title')
          .should('exist')
          .and('not.be.empty');
      
        cy.wrap($el).find('.artist-name')
          .should('exist')
          .and('not.be.empty');
    }
}

export default searchController;