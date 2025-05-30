import { Given, When, Then, Before } from '@badeball/cypress-cucumber-preprocessor';
import CommonController from '../../Controllers/commonController.js';
import { loadData, getData } from '../../Controllers/dataController.js';

let data;
 
Before(() => {
  return loadData().then((loadedData) => {
    data = loadedData;
  });
});

// Given: Abrir el navegador y redimensionar la pantalla
Given(/^Abrimos el navegador y redimensionamos la pantalla$/, () => {
    try {
      CommonController.openBrowser();
  
      cy.clearCookies()
      cy.clearLocalStorage();
      cy.clearAllSessionStorage();
  
    } catch (e) {
      manageException(e);
    }
  });
  
  // When: Acceder a la web
  When(/^Accedemos a la web de "(.*?)"$/, (url) => {
    try {
      CommonController.navegarUrl(data.data[url]);
    } catch (e) {
      manageException(e);
    }
  });
  
  // When: Hacer clic en un WebElement
  When(/^Hacemos click en el WebElement:"(.*?)"$/, (xpath) => {
    try {
      const webElement = CommonController.getWebElementXpath(data.Xpath[xpath]);
      CommonController.clickElement(webElement);  
    } catch (e) {
      manageException(e);
    }
  });

  
  // When: Rellenar un campo con texto
  When(/^Rellenamos el campo "(.*?)" con el texto: "(.*?)"$/, (xpath, texto) => {
    try {
      const webElement = CommonController.getWebElementXpath(data.Xpath[xpath]);
      CommonController.escribirText(webElement, texto);
    } catch (e) {
      manageException(e);
    }
  });

  // When: Rellenar un campo con fecha
  When(/^Rellenamos el campo "(.*?)" con la fecha: "(.*?)"$/, (xpath, texto) => {
    try {
      const webElement = CommonController.getWebElementXpath(data.Xpath[xpath]);
      CommonController.escribirFecha(webElement, texto);
    } catch (e) {
      manageException(e);
    }
  });

  // When: Rellenar un campo con fecha especifica
  When(/^Rellenamos el campo "(.*?)" con la fecha actual mas: "(.*?)" días$/, (xpath, texto) => {
    try {
      const webElement = CommonController.getWebElementXpath(data.Xpath[xpath]);
      CommonController.escribirFecha(webElement, texto);
    } catch (e) {
      manageException(e);
    }
  });

  // When: Seleccionar una opción de un Select por valor
  When(/^Seleccionamos el valor "(.*?)" del select: "(.*?)"$/, (value, xpath) => {
    try {
      const webElement = CommonController.getWebElementXpath(data.Xpath[xpath]);
      CommonController.selectByValue(webElement, value);
    } catch (e) {
      manageException(e);
    }
  });
  
  // When: Seleccionar una opción de un Select por índice
  When(/^Seleccionamos el índice "(.*?)" del select: "(.*?)"$/, (index, xpath) => {
    try {
      const webElement = CommonController.getWebElementXpath(data.Xpath[xpath]);
      CommonController.selectByIndex(webElement, parseInt(index));
    } catch (e) {
      manageException(e);
    }
  });

  When(/^Seleccionamos el texto "(.*?)" del select: "(.*?)"$/, (value,xpath) => {
    try {
      const webElement = CommonController.getWebElementXpath(data.Xpath[xpath]);
      CommonController.selectByText(webElement, parseInt(value));
    } catch (e) {
      manageException(e);
    }
  });
  
  // When: Seleccionar una opción de un Select por índice
  When(/^Introducimos el archivo: "(.*?)" en el boton: "(.*?)"$/, (file,xpath) => {
    try {
      const webElement = CommonController.getWebElementXpath(data.Xpath[xpath]);
      CommonController.uploadNewFile(webElement, file);
    } catch (e) {
      manageException(e);
    }
  });
  
  // Then: Comprobar el texto de un elemento
  Then(/^Comprobamos el texto: "(.*?)" con el texto del elemento: "(.*?)"$/, (text, xpath) => {
   // Obtener el texto del elemento de forma asíncrona
   cy.wait(1000)
  CommonController.getWebElementXpath(data.Xpath[xpath])
  .invoke('text')
  .then((textoExtraido) => {
    try {
      const textoComoString = textoExtraido.trim();
      CommonController.compareText(textoComoString, text);
    } catch (e) {
      throw new Error(`Error al comparar el texto: ${e.message}`);
    }
  });
  });
  
  // Then: Comprobar la visibilidad de un elemento
  Then(/^Comprobamos la visibilidad del elemento: "(.*?)"$/, (xpath) => {
    try {
      CommonController.webElementExist(CommonController.getWebElementXpath(data.Xpath[xpath]));
    } catch (e) {
      manageException(e);
    }
  });

  // Then: Comprobar el valor de un formulario tipo radio
  Then(/^Comprobamos que el valor del formulario tipo radio:"(.*?)" es: "(.*?)"$/, (xpath,boolean) => {
    try {
      const xpathForm = CommonController.getWebElementXpath(data.Xpath[xpath])
      CommonController.checkRadioValue(xpathForm, boolean)
    } catch (e) {
      throw new Error(`Error al comparar el texto: ${e.message}`);
    }
  });

  Then(/^Verificamos que el botón:"(.*?)" es visible y está habilitado$/, (xpath) => {
   const WebElement = CommonController.getWebElementXpath(data.Xpath[xpath]);
   CommonController.verificarElementoActivoVisible(WebElement);
  });

  Then(/^Verificamos que el botón:"(.*?)" es visible y está deshabilitado$/, (xpath) => {
    const WebElement = CommonController.getWebElementXpath(data.Xpath[xpath]);
    CommonController.webElementIsDisabled(WebElement);
   });

   Then(/^Verificamos que el elemento:"(.*?)" es visible$/, (xpath) => {
    const WebElement = CommonController.getWebElementXpath(data.Xpath[xpath]);
    CommonController.verificarElementoVisible(WebElement);
   });
  
  Then(/^El elemento:"(.*?)" no existe en el DOM$/, () => {
    cy.get('#error-message')
      .should('not.exist'); 
  });

  Then(/^Comprobamos el detalle de la oferta donde el campo \"([^\"]*)\" tiene valor \"([^\"]*)\"$/, (NombreCampo,ValorCampo) => {
    let xpath = data.Xpath['CampoGenericoDetalleOferta'].replace("$NombreCampo$",NombreCampo);
    xpath = xpath.replace("$ValorCampo$",ValorCampo)
 
    let WebElement = CommonController.getWebElementXpath(xpath);  
    CommonController.validarDetalleOferta(WebElement);  
  });

  
  // When: Hacer clic en un WebElement
  When(/^Hacemos Scroll en el WebElement:"(.*?)"$/, (xpath) => {
    try {
      const webElement = CommonController.getWebElementXpath(data.Xpath[xpath]);
      CommonController.ScrollToElement(webElement);
    } catch (e) {
      manageException(e);
    }
  });

  Then(/^Comprobamos que el texto del elemento: "(.*?)" contiene: "(.*?)"$/, (xpathKey, text) => {
    CommonController.getWebElementXpath(data.Xpath[xpathKey])
      .invoke('text')
      .then((textoExtraido) => {
        try {
          const textoComoString = textoExtraido.trim();
          CommonController.compareTextContains(textoComoString, text);
        } catch (e) {
          throw new Error(`Error al verificar que el texto contiene: ${e.message}`);
        }
      });
  });
