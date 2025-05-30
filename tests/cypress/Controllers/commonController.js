//import { expect } from 'chai';
require('cypress-xpath');


class CommonController {
static manageException(e) {
    console.error('Se ha producido una excepción:', e);
    // Realiza acciones adicionales aquí, como registrar la excepción o notificarla.
}
    static openBrowser() {
        try {
        // Intenta abrir el navegador
        cy.viewport(1440, 900);
        cy.clearCookies()
        } catch (error) {
        // Manejar excepciones específicas de Cypress
        if (error.name === 'CypressError') {
            throw new Error(`Error de Cypress al abrir el navegador: ${error.message}`);
        } else {
            throw new Error(`Error desconocido al abrir el navegador: ${error.message}`);
        }
        }
    }
    
    static expectTextInElement(xpath, texto) {
        try {
        let element = getWebElementXpath(xpath);
        cy.wrap(element).should('include.text', texto);
        } catch (error) {
        // Manejar excepciones específicas de Cypress
        if (error.name === 'CypressError') {
            throw new Error(`Error de Cypress al esperar el texto en el elemento: ${error.message}`);
        } else {
            throw new Error(`Error desconocido al esperar el texto en el elemento: ${error.message}`);
        }
        }
    }
    
    
    static waitElementVisible(xpath) {
        try {
        let element = getWebElementXpath(xpath);
        cy.wrap(element).should('be.visible');
        } catch (error) {
        if (error.name === 'CypressError') {
            throw new Error(`Error de Cypress al esperar al elemento visible: ${error.message}`);
        } else {
            throw new Error(`Error desconocido al esperar al elemento visible: ${error.message}`);
        }
        }
    }
    
    static waitHabilitedElement(webElement) {
        try {
        cy.wrap(webElement).should('not.be.disabled');
        } catch (error) {
        if (error.name === 'CypressError') {
            throw new Error(`Error de Cypress al esperar al elemento habilitado: ${error.message}`);
        } else {
            throw aError(`Error desconocido al esperar al elemento habilitado: ${error.message}`);
        }
        }
    }
    
    static waitTime(ms) {
        cy.wait(ms);
    }
    
    static getWebElementXpath(xpath_param) {
        try {
        // Intenta obtener el elemento XPath
        return cy.xpath(xpath_param)
                .should('exist')
                .should('be.visible');
        } catch (error) {
        if (error.name === 'CypressError') {
            throw new Error(`Error de Cypress al obtener el elemento XPath: ${error.message}`);
        } else {
            throw new Error(`Error desconocido al obtener el elemento XPath: ${error.message}`);
        }
        }
    }

    static getWebElementsXpath(xpath_param) {
        try {
            // Intenta obtener todos los elementos que coincidan con el XPath
            return cy.xpath(xpath_param)
                    .should('exist')
                    .should('be.visible');
        } catch (error) {
            if (error.name === 'CypressError') {
                throw new Error(`Error de Cypress al obtener los elementos XPath: ${error.message}`);
            } else {
                throw new Error(`Error desconocido al obtener los elementos XPath: ${error.message}`);
            }
        }
    }
    
    static navegarUrl(url) {
        try {
        // Intenta navegar a la URL
        cy.visit(url);
        } catch (error) {
        // Manejar excepciones específicas de Cypress
        if (error.name === 'CypressError') {
            throw new Error(`Error de Cypress al navegar a la URL: ${error.message}`);
        } else if (error.name === 'CypressFailure') {
            throw new Error(`Error de Cypress al navegar a la URL: ${error.message}`);
        } else {
            throw new Error(`Error desconocido al navegar a la URL: ${error.message}`);
        }
        }
    }
    
    static clickElement(webElement) {
        try {
        //Clicka en el WebElement
        webElement.click();
        } catch (error) {
        // Manejar excepciones específicas de Cypress
        if (error.name === 'CypressError') {
            throw new Error(`Error de Cypress al hacer clic en el elemento: ${error.message}`);
        } else {
            throw new Error(`Error desconocido al hacer clic en el elemento: ${error.message}`);
        }
        }
    }
    static clickElementOpciones(webElement) {
        try {
        //Clicka en el WebElement
        webElement.click({force:true});
        } catch (error) {
        // Manejar excepciones específicas de Cypress
        if (error.name === 'CypressError') {
            throw new Error(`Error de Cypress al hacer clic en el elemento: ${error.message}`);
        } else {
            throw new Error(`Error desconocido al hacer clic en el elemento: ${error.message}`);
        }
        }
    }
    
    static escribirText(webElement, text) {
        try {
        // Intenta escribir texto en el elemento           
        webElement.type(text);             
        } catch (error) {
        // Manejar excepciones específicas de Cypress
        if (error.name === 'CypressError') {
            throw new Error(`Error de Cypress al escribir texto en el elemento: ${error.message}`);
        } else {
            throw new Error(`Error desconocido al escribir texto en el elemento: ${error.message}`);
        }
        }
    }

    static sumarDias(fecha, diasStr) {
        const dias = parseInt(diasStr, 10); // convierte el string a número        
        fecha.setDate(fecha.getDate() + dias);
        return fecha;
    }
    
    static escribirFecha(webElement, text) {
        try {
            let date = new Date()
            //cy.log(dateNow);                
            // const dateNow2 = new Date().valueOf().toString();
            // cy.log(dateNow2);
 
            if(text != "Hoy"){                
                date = this.sumarDias(date,text)
                }                        
            // Intenta escribir texto en el elemento
            webElement.invoke('removeAttr', 'readonly').type(date.toLocaleDateString()  ,{force: true})  
            cy.get("button").contains("Cancelar").click();          
                       
        } catch (error) {
        // Manejar excepciones específicas de Cypress
        if (error.name === 'CypressError') {
            throw new Error(`Error de Cypress al escribir texto en el elemento: ${error.message}`);            
        } else {
            throw new Error(`Error desconocido al escribir texto en el elemento: ${error.message}`);
        }
        }
    }
    static clickObject(webElement) {
        try {
        // Intenta hacer clic en el elemento
        webElement.click();
        } catch (error) {
        // Manejar excepciones específicas de Cypress
        if (error.name === 'CypressError') {
            throw new Error(`Error de Cypress al hacer clic en el elemento: ${error.message}`);
        } else {
            throw new Error(`Error desconocido al hacer clic en el elemento: ${error.message}`);
        }
        }
    }
    
    static selectByIndex(webElement, index) {
        try {
        // Intenta seleccionar por índice
        webElement.select(index);
        } catch (error) {
        // Manejar excepciones específicas de Cypress
        if (error.name === 'CypressError') {
            throw new Error(`Error de Cypress al seleccionar por índice: ${error.message}`);
        } else {
            throw new Error(`Error desconocido al seleccionar por índice: ${error.message}`);
        }
        }
    }
    
    static selectByValue(webElement, value) {
        try {
        // Intenta seleccionar por valor
        webElement.selectByValue(value);
        } catch (error) {
        // Manejar excepciones específicas de Cypress
        if (error.name === 'CypressError') {
            throw new Error(`Error de Cypress al seleccionar por valor: ${error.message}`);
        } else {
            throw new Error(`Error desconocido al seleccionar por valor: ${error.message}`);
        }
        }
    }
    
    static selectByText(webElement, text) {
        try {
            // Intenta seleccionar por texto
            webElement.select(text);
        } catch (error) {
            // Manejar excepciones específicas de Cypress
            if (error.name === 'CypressError') {
            throw new Error(`Error de Cypress al seleccionar por valor: ${error.message}`);
            } else {
            throw new Error(`Error desconocido al seleccionar por valor: ${error.message}`);
            }
        }
        }
    static mattOptionSearchByvalue(webElement, option) {
        try {
            // Intenta seleccionar por índice
            webElement.click({ force: true })
            webElement.type(option)      
            webElement.get('mat-option').find('span').filter((index, el) => {
            let text = el.innerText.trim()            
            if (text === option){return el}}).click();
    
        } catch (error) {
        // Manejar excepciones específicas de Cypress
        if (error.name === 'CypressError') {
            throw new Error(`Error de Cypress al seleccionar por índice: ${error.message}`);
        } else {
            throw new Error(`Error desconocido al seleccionar por índice: ${error.message}`);
        }
        }
    }

    static mattOptionByvalue(webElement, option) {
        try {
            // Intenta seleccionar por índice
            webElement.click({ force: true })   
            webElement.type(option) 
            webElement.get('mat-option').find('span').filter((index, el) => {
            let text = el.innerText.trim()            
            if (text === option){return el}}).click();
        } catch (error) {
        // Manejar excepciones específicas de Cypress
        if (error.name === 'CypressError') {
            throw new Error(`Error de Cypress al seleccionar por índice: ${error.message}`);
        } else {
            throw new Error(`Error desconocido al seleccionar por índice: ${error.message}`);
        }
        }
    }
    
    static validateURL(expectedURL) {
        try {
        cy.url().should('eq', expectedURL);
        } catch (error) {
        // Manejar excepciones específicas de Cypress
        if (error.name === 'CypressError') {
            throw new Error(`Error de Cypress al validar la URL: ${error.message}`);
        } else {
            throw new Error(`Error desconocido al validar la URL: ${error.message}`);
        }
        }
    }
    
    static webElementExist(webElement) {
        try {
            // Intenta comparar el texto
            webElement.should('be.visible');
            webElement.should('not.be.disabled');
        } catch (error) {
            // Manejar excepciones específicas de Cypress
            if (error.name === 'CypressError') {
            throw new Error(`Error de Cypress al obtener el objeto: ${error.message}`);
            } else {
            throw new Error(`Error desconocido al obtener el objeto: ${error.message}`);
            }
        }
    }

    static webElementIsDisabled(webElement) {
        webElement.should('be.visible')
            .and('be.disabled');
    }
    
    static compareText(foundedText, Text) {
        try {
        // Intenta comparar el texto
        expect(foundedText).to.equal(Text);
        } catch (error) {
        // Manejar excepciones específicas de Cypress
        if (error.name === 'CypressError') {
            throw new Error(`Error de Cypress al comparar el texto: ${error.message}`);
        } else {
            throw new Error(`Error desconocido al comparar el texto: ${error.message}`);
        }
        }
    }

    static checkRadioValue(WebElement, Text) {
        try {
            const estadoEsperado = Text === "true";

            if (estadoEsperado) {
              WebElement.should('be.checked');
            } else {
              WebElement.should('not.be.checked');
            }
        }catch (error) {
        // Manejar excepciones específicas de Cypress
        if (error.name === 'CypressError') {
            throw new Error(`Error de Cypress al comparar el texto: ${error.message}`);
        } else {
            throw new Error(`Error desconocido al comparar el texto: ${error.message}`);
        }
        }
    }

    static extractFormValue(ValueName) {      
        let cssMod = css.input_formulario.replace("$var$", dataId[ValueName]);
        
        return cy.get(cssMod).invoke('val').then((value) => {
            return value; // Devuelve el valor del input
        });
    }

    static GetTable(Xpath) {
        try {
            let Datatable = [];
            cy.get(Xpath).find('tr').each(($row) => {
                let rowData = [];
                cy.wrap($row).find('td').each(($cell, index, $cells) => {
                    if (index === $cells.length - 1) {
                        let buttons = [];
                        cy.wrap($cell).find('button').each(($btn) => {
                            buttons.push($btn);
                        }).then(() => {
                            rowData.push(buttons);
                        });
                    } else {
                        rowData.push($cell);
                    }
                }).then(() => {
                    Datatable.push(rowData);
                });
            });
            return Datatable;
        } catch (error) {
            console.error("Error en GetTable:", error);
            return [];
        }
    }
    
    static uploadNewFile(webElement, value) {
        try {
            // Intenta seleccionar por valor
            webElement.selectFile(value);
        } catch (error) {
            // Manejar excepciones específicas de Cypress
            if (error.name === 'CypressError') {
            throw new Error(`Error de Cypress al seleccionar por valor: ${error.message}`);
            } else {
            throw new Error(`Error desconocido al seleccionar por valor: ${error.message}`);
            }
        }
    }
    
    static verificarUnSoloAcordeonActivo(WebElements) {
        cy.wrap(WebElements).then(($buttons) => {
        const activeButtons = $buttons.filter((index, el) => !Cypress.$(el).hasClass('collapsed'));
        expect(activeButtons.length).to.equal(1);
        });
    }
    
    static verificarElementoActivoVisible(webElement){
        webElement
      .should('not.be.disabled')
      .and('be.visible')           
      .and('be.enabled'); 
    }

    static verificarElementoVisible(webElement){
        webElement.should('be.visible')     
    }
    
    static screenShoot(nameScreenshoot) {
        cy.screenshot(nameScreenshoot);
    }
    
    static validarDetalleOferta(webElement){
        try {
            webElement.should('be.visible')        
        } catch (error) {
           // Manejar excepciones específicas de Cypress
           if (error.name === 'CypressError') {
            throw new Error(`Error de Cypress al obtener el objeto: ${error.message}`);
            } else {
            throw new Error(`Error desconocido al obtener el objeto: ${error.message}`);
            }
            }
    }
    static extractOfferId(text) {
        const regex =  /\d{2}-\d{4}-\d{3}/;
        const match = text.match(regex);
        return match ? match[0] : null;
    }

    static clearCookies() {
        cy.clearCookies();
    }
    
    static stablishCookie(nombre, valor) {
        cy.setCookie(nombre, valor);
    }
    static ScrollToElement(webElement) {
        try {
        //Clicka en el WebElement
        webElement.scrollIntoView()
        } catch (error) {
        // Manejar excepciones específicas de Cypress
        if (error.name === 'CypressError') {
            throw new Error(`Error de Cypress al hacer scroll en el elemento: ${error.message}`);
        } else {
            throw new Error(`Error desconocido al hacer scroll en el elemento: ${error.message}`);
        }
        }
    }
    static validateCookie(nombre) {
        cy.getCookie(nombre).should('exist');
    }

    static clickElementoPorTexto(selector, nombre) {
        cy.get(selector).contains(nombre).click({ force: true });
    }

    static verificarPlaylistEliminada(nombre) {
        CommonController.getWebElementXpath()
        cy.get('.playlist-name').should('not.contain.text', nombre);
      
        CommonController.getWebElementXpath()
        cy.get('.playlist-card h3').each(($el) => {
          cy.wrap($el).should('not.have.text', nombre);
        });
    }

    static compareTextContains(foundedText, partialText) {
        try {
          expect(foundedText).to.include(partialText);
        } catch (error) {
          if (error.name === 'CypressError') {
            throw new Error(`Error de Cypress al comprobar que el texto contiene: ${error.message}`);
          } else {
            throw new Error(`Error desconocido al comprobar que el texto contiene: ${error.message}`);
          }
        }
    }

    static elementNotExistsByXpath(xpath) {

        const elements = this.getWebElementsXpath(xpath)
        return elements.length === 0;
    }

    static existeElementoXpath(xpath) {
        const elementos = this.getWebElementsXpath(xpath)
        return elementos.length > 0;
    }
      
      

}
export default CommonController;