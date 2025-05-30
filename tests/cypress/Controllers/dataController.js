import * as dataINT from '../fixtures/dataINTContainer.json';
import * as dataVER from '../fixtures/dataVERContainer.json';
import * as dataPRE from '../fixtures/dataPREContainer.json';
import * as dataPRO from '../fixtures/dataPROContainer.json';
import * as Xpath from '../fixtures/xpathContainer.json';



let cachedData = null;
 
// Esta función carga los datos desde archivo usando cy.task
function loadData() {
  const entorno = Cypress.env('entorno') || 'VER';
 
  return cy.task('getDataField', { entorno }).then((jsonData) => {
    cachedData = {
      data: jsonData,
      Xpath
    };
    return cachedData;
  });
}
 
// Esta función retorna los datos cacheados temporalmente (útil dentro de steps)
function getData() {
  if (!cachedData) {
    throw new Error('Los datos aún no han sido cargados. Usa loadData() primero.');
  }
  return cachedData;
}
 
export { loadData, getData };