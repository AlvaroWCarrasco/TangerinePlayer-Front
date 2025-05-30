const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
const fs = require("fs");
const path = require("path");

module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });

      on("file:preprocessor", bundler);
      await addCucumberPreprocessorPlugin(on, config);

      on("task", {
        saveDataField({ key, value, entorno }) {
          const env = entorno || 'VER';
          const fileName = `data${env}Container.json`;
          const filePath = path.resolve("cypress/fixtures", fileName);
      
          let existingData = {};
      
          try {
            if (fs.existsSync(filePath)) {
              const rawData = fs.readFileSync(filePath, "utf-8");
              existingData = JSON.parse(rawData);
            }
      
            existingData[key] = value;
      
            fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2), "utf-8");
            console.log(`✔ ${key} guardado correctamente en ${fileName}`);
          } catch (error) {
            console.error(`Error en saveDataField:`, error);
          }
      
          return null;
        },

        getDataField({ entorno }) {
            const env = entorno || 'VER';
            const fileName = `data${env}Container.json`;
            const filePath = "cypress/fixtures/"+ fileName;
        
            if (fs.existsSync(filePath)) {
              try {
                const rawData = fs.readFileSync(filePath, "utf-8");
                return JSON.parse(rawData);
              } catch (error) {
                console.error(`Error al leer el archivo ${fileName}:`, error);
                return null;
              }
            } else {
              console.warn(`Archivo ${fileName} no encontrado`);
              return null;
            }
          }
      });
 
      return config;
    },

    specPattern: 'cypress/e2e/*.feature',
    excludeSpecPattern: ['*.js', '*.ts', '*.md'],
    chromeWebSecurity: false
  },

  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'cypress/reports/junit/test-results.reporte[hash].xml',
    testsuitesTitle: false,
  },

  env: {
    entorno: "INT",
    "TAGS": "not @ignore"
  },

  chromeWebSecurity: false,
  watchForFileChanges: false,
  trashAssetsBeforeRuns: true,
  defaultCommandTimeout: 20000,

  retries: {
    "runMode": 2,
    "openMode": 0
  }
});
