import { Given, When, Then, Before } from '@badeball/cypress-cucumber-preprocessor';
import CommonController from '../../Controllers/commonController.js';
import { loadData, getData } from '../../Controllers/dataController.js';

let data;
 
Before(() => {
  return loadData().then((loadedData) => {
    data = loadedData;
  });
});

When('Verificamos que todas las playlists tienen título', () => {
    const playLists = CommonController.getWebElementXpath(data.Xpath["ResultadoBusqueda"])
    playLists.each(($el, index) => {
        const title = $el.text().trim();

        cy.log(`Verificando título de playlist ${index + 1}: "${title}"`);

        expect(title, `La playlist en la posición ${index + 1} no tiene título`).to.not.be.empty;
    });
});

When(/^Clicamos en la playlist llamada "(.*?)"$/, (nombrePlaylist) => {
  clickElementoPorTexto('.playlist-name', nombrePlaylist);
});

Then(/^La playlist "(.*?)" ya no debería estar visible$/, (nombre) => {
  verificarPlaylistEliminada(nombre);
});

Then(/^Verificamos que existe la playlist "(.*)"$/, (nombrePlaylist) => {
  try {
    // Playlist en tarjeta
    let xpathCard = data.Xpath['PlaylistNombre'].replace('$NOMBRE_PLAYLIST$', nombrePlaylist);
    CommonController.getWebElementXpath(xpathCard);

    // Playlist en la lista inferior
    let xpathLista = data.Xpath['PlaylistNombreLista'].replace('$NOMBRE_PLAYLIST$', nombrePlaylist);
    CommonController.getWebElementXpath(xpathLista);

  } catch (e) {
    throw new Error(`Error: ${e.message}`);
  }
});

When(/^Hacemos clic en la (playlist|cancion) con nombre "(.*)"$/, (tipo, nombre) => {
  try {
    let xpathKey = '';
    let placeholder = '';

    if (tipo === 'playlist') {
      xpathKey = 'ClickPlaylistPorNombre';
      placeholder = '$NOMBRE_PLAYLIST$';
    } else if (tipo === 'cancion') {
      xpathKey = 'CancionPorNombre';
      placeholder = '$NOMBRE_CANCION$';
    }

    const xpath = data.Xpath[xpathKey].replace(placeholder, nombre);
    const element = CommonController.getWebElementXpath(xpath);
    CommonController.clickElement(element);

  } catch (e) {
    throw new Error(`Error: ${e.message}`);
  }
});

When(/^Hacemos clic en la playlist: "(.*)" para añadir la cancion$/, (nombre) => {
  try {

    const xpath = data.Xpath['ClickPlaylistPorNombreAñadirCancion'].replace('$NOMBRE_PLAYLIST$', nombre);
    const element = CommonController.getWebElementXpath(xpath);
    CommonController.clickElement(element);

  } catch (e) {
    throw new Error(`Error: ${e.message}`);
  }
});

When(/^Eliminamos la playlist con nombre "(.*)"$/, (nombrePlaylist) => {
  try {
    const xpath = data.Xpath['EliminarPlaylistPorNombre'].replace('$NOMBRE_PLAYLIST$', nombrePlaylist);
    const botonOpciones = CommonController.getWebElementXpath(xpath);
    botonOpciones.trigger('mouseover')
    CommonController.clickElement(botonOpciones);


    const xpathEliminar = data.Xpath['BotonEliminarPlaylist']
    const botonEliminar = CommonController.getWebElementXpath(xpathEliminar);
    CommonController.clickElement(botonEliminar);

  } catch (e) {
    throw new Error(`Error al eliminar la playlist '${nombrePlaylist}': ${e.message}`);
  }
});

Then(/^Verificamos que la playlist "(.*)" no existe$/, (nombrePlaylist) => {
  try {
    const xpath = data.Xpath['PlaylistNombre'].replace('$NOMBRE_PLAYLIST$', nombrePlaylist);
    const noExiste = CommonController.elementNotExistsByXpath(xpath);

    if (!noExiste) {
      throw new Error(`La playlist "${nombrePlaylist}" todavía está presente.`);
    }

  } catch (e) {
    throw new Error(`Error al verificar que no existe la playlist: ${e.message}`);
  }
});

When(/^Eliminamos la canción con titulo "(.*)" de la playlist$/, (tituloCancion) => {
  try {
    // XPath dinámico para encontrar el botón eliminar basado en el título de la canción
    const xpath = data.Xpath['EliminarCancionPlaylistNombre'].replace('${tituloCancion}$', tituloCancion);

    const botonEliminar = CommonController.getWebElementXpath(xpath);
    CommonController.clickElement(botonEliminar);

    // Espera breve por si hay animaciones o re-render del DOM
    cy.wait(1000)

  } catch (e) {
    throw new Error(`Error al eliminar la canción '${tituloCancion}': ${e.message}`);
  }
});

Then(/^La canción con título "(.*)" ya no debe estar en la playlist$/, (tituloCancion) => {
  try {
    cy.wait(1000)
    const xpath = data.Xpath['ComprobarCancionBorrada'].replace('$tituloCancion$', tituloCancion);
    cy.wait(1000)
    const noExiste = CommonController.elementNotExistsByXpath(xpath);

    if (!noExiste) {
      throw new Error(`La cancion "${tituloCancion}" todavía está presente.`);
    }

  } catch (e) {
    throw new Error(`Error al verificar la ausencia de la canción '${tituloCancion}': ${e.message}`);
  }
});