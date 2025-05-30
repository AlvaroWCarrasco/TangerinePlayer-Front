Feature: Playlist 
   
Background: Iniciar web
    Given Abrimos el navegador y redimensionamos la pantalla
    When Accedemos a la web de "urlTangerinPlayer"

@ignore @smokeTest @regresionTest @INT
Scenario: Barra lateral
    When Hacemos click en el WebElement:"BotonMenuDesplegable"
    When Verificamos que todas las playlists tienen título
    When Clicamos en la playlist llamada "Mix Diario 1"
    When Hacemos click en el WebElement:"BotonHome"
    Then Comprobamos el texto: "Mis Listas" con el texto del elemento: "TituloMisListas"


@smokeTest @regresionTest @INT
Scenario: Cambio de cancion
    When Rellenamos el campo "CampoBusquedaCanciones" con el texto: "The Trooper" 
    Then Comprobamos que cada resultado debe tener imagen, título y nombre del artista   
    When El usuario hace clic en la canción "The Trooper - 2015 Remaster"
    Then Comprobamos el texto: "6:12" con el texto del elemento: "TextoTiempoReproductor"
    Then Comprobamos el texto: "The Trooper - 2015 Remaster" con el texto del elemento: "TextoTituloReproductor"
    When Rellenamos el campo "CampoBusquedaCanciones" con el texto: "Partiendo la Pana" 
    Then Comprobamos que cada resultado debe tener imagen, título y nombre del artista   
    When El usuario hace clic en la canción "Partiendo la Pana"
    Then Comprobamos el texto: "6:12" con el texto del elemento: "TextoTiempoReproductor"
    Then Comprobamos el texto: "Partiendo la Pana" con el texto del elemento: "TextoTituloReproductor"

@smokeTest @regresionTest @INT
Scenario: Crear playlist
    When Hacemos click en el WebElement:"BotonMenuDesplegable"
    When Hacemos click en el WebElement:"BotonAniadirPlaylist"
    When Rellenamos el campo "CampoNombrePlaylist" con el texto: "Prueba"
    When Hacemos click en el WebElement:"BotonAceptarPlaylist"
    Then Verificamos que existe la playlist "Prueba"

Scenario: Crear playlist con el mismo nombre
    When Hacemos click en el WebElement:"BotonMenuDesplegable"
    When Hacemos click en el WebElement:"BotonAniadirPlaylist"
    When Rellenamos el campo "CampoNombrePlaylist" con el texto: "Prueba"
    When Hacemos click en el WebElement:"BotonAceptarPlaylist"
    #Then Comprobamos el texto: "Ya existe una playlist con ese nombre" con el texto del elemento: "MensajeErrorNombreListaYaCreada"


@smokeTest @regresionTest @INT
Scenario: Añadir cancion a Playlist
    When Rellenamos el campo "CampoBusquedaCanciones" con el texto: "Partiendo la Pana" 
    Then Comprobamos que cada resultado debe tener imagen, título y nombre del artista   
    When El usuario hace clic en la canción "Partiendo la Pana"
    Then Comprobamos el texto: "6:12" con el texto del elemento: "TextoTiempoReproductor"
    Then Comprobamos el texto: "Partiendo la Pana" con el texto del elemento: "TextoTituloReproductor"
    When Hacemos click en el WebElement:"BotonAniadirCancion"
    Then Comprobamos que el texto del elemento: "TituloVentanaAniadirPlaylist" contiene: "Partiendo la Pana"
    When Hacemos clic en la playlist: "Prueba" para añadir la cancion
    When Hacemos click en el WebElement:"BotonAniadirCancionPlaylist"
    When Rellenamos el campo "CampoBusquedaCanciones" con el texto: "El Perro Verde" 
    Then Comprobamos que cada resultado debe tener imagen, título y nombre del artista   
    When El usuario hace clic en la canción "El Perro Verde"
    Then Comprobamos el texto: "6:12" con el texto del elemento: "TextoTiempoReproductor"
    Then Comprobamos el texto: "El Perro Verde" con el texto del elemento: "TextoTituloReproductor"
    When Hacemos click en el WebElement:"BotonAniadirCancion"
    Then Comprobamos que el texto del elemento: "TituloVentanaAniadirPlaylist" contiene: "El Perro Verde"
    When Hacemos clic en la playlist: "Prueba" para añadir la cancion
    When Hacemos click en el WebElement:"BotonAniadirCancionPlaylist"

Scenario: Intentar añadir cancion repetida en la misma playlist
    When Rellenamos el campo "CampoBusquedaCanciones" con el texto: "Partiendo la Pana" 
    Then Comprobamos que cada resultado debe tener imagen, título y nombre del artista   
    When El usuario hace clic en la canción "Partiendo la Pana"
    Then Comprobamos el texto: "6:12" con el texto del elemento: "TextoTiempoReproductor"
    Then Comprobamos el texto: "Partiendo la Pana" con el texto del elemento: "TextoTituloReproductor"
    When Hacemos click en el WebElement:"BotonAniadirCancion"
    Then Comprobamos que el texto del elemento: "TituloVentanaAniadirPlaylist" contiene: "Partiendo la Pana"
    When Hacemos clic en la playlist: "Prueba" para añadir la cancion
    Then Comprobamos el texto: "Esta canción ya está en la playlist 'Prueba'" con el texto del elemento: "MensajeErrorCancionRepetida"
    


@smokeTest @regresionTest @INT
Scenario: Cambio de cancion playlist
    When Hacemos click en el WebElement:"BotonMenuDesplegable"
    When Hacemos clic en la playlist con nombre "Prueba"
    When Hacemos clic en la cancion con nombre "El Perro Verde"
    Then Comprobamos el texto: "6:12" con el texto del elemento: "TextoTiempoReproductor"
    Then Comprobamos el texto: "El Perro Verde" con el texto del elemento: "TextoTituloReproductor"
    When Hacemos clic en la cancion con nombre "Partiendo la Pana"
    Then Comprobamos el texto: "6:12" con el texto del elemento: "TextoTiempoReproductor"
    Then Comprobamos el texto: "Partiendo la Pana" con el texto del elemento: "TextoTituloReproductor"

Scenario: Eliminar la cancion de playlist
    When Hacemos click en el WebElement:"BotonMenuDesplegable"
    When Hacemos clic en la playlist con nombre "Prueba"
    When Eliminamos la canción con titulo "Partiendo la Pana" de la playlist
    #Then La canción con título "Partiendo la Pana" ya no debe estar en la playlist

Scenario: Eliminar playlist
    When Hacemos click en el WebElement:"BotonMenuDesplegable"
    When Eliminamos la playlist con nombre "Prueba"
    #Then Verificamos que la playlist "Prueba" no existe