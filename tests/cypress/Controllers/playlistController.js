require('cypress-xpath');
export class PlaylistController {
    static verificarPlaylistExiste(nombrePlaylist) {
      try {
        cy.xpath(`//h3[normalize-space(text())="${nombrePlaylist}"]`).should('exist');
      } catch (error) {
        if (error.name === 'CypressError') {
          throw new Error(`Error de Cypress al verificar la playlist: ${error.message}`);
        } else {
          throw new Error(`Error desconocido al verificar la playlist: ${error.message}`);
        }
      }
    }
  }