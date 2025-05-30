import { Given, When, Then, Before } from '@badeball/cypress-cucumber-preprocessor';
import CommonController from '../../Controllers/commonController.js';
import SearchController from '../../Controllers/searchController.js';
import { loadData, getData } from '../../Controllers/dataController.js';


let data;
 
Before(() => {
  return loadData().then((loadedData) => {
    data = loadedData;
  });
});

Then(/^Comprobamos que cada resultado debe tener imagen, título y nombre del artista$/, () => {
    CommonController.getWebElementXpath(data.Xpath["ResultadoBusqueda"]).each(($el) => {
      SearchController.validarResultadoBusqueda($el);
    });
});

When(/^El usuario hace clic en la canción "(.*?)"$/, (nombreCancion) => {
  try {
    // XPath para el contenedor .result-item que tenga .song-title con texto igual a nombreCancion
    let xpathBase = data.Xpath["ResultadoBusqueda"];
    // Construimos XPath que busque todos los result-item cuyo p.song-title coincida con el nombre
    let xpathCancion = `${xpathBase}[.//p[contains(@class,'song-title') and normalize-space(text())="${nombreCancion}"]]`;

    const elementos = CommonController.getWebElementsXpath(xpathCancion);

    elementos.first().then((el) => {
      CommonController.clickElement(el);
    });

    cy.wait(1000);

  } catch (e) {
    throw new Error(`Error al verificar que el texto contiene: ${e.message}`);
  }
});

Then(/^El reproductor debe mostrar la duración "(.*?)"$/, (duracionEsperada) => {
    const tiempoXpath = '/html/body/app-root/div/app-player/div/div[2]/div[2]/span[2]';
  
    CommonController.getWebElementXpath(tiempoXpath)
      .invoke('text')
      .then((tiempoReal) => {
        expect(tiempoReal.trim()).to.eq(duracionEsperada);
      });
  });