Feature: MusicSearch  
   
    Background: Iniciar web
    Given Abrimos el navegador y redimensionamos la pantalla
    When Accedemos a la web de "urlTangerinPlayer"
    
    @smokeTest @regresionTest @INT
    Scenario: Busqueda cancion
    When Rellenamos el campo "CampoBusquedaCanciones" con el texto: "The Trooper" 
    Then Comprobamos que cada resultado debe tener imagen, título y nombre del artista   
    When El usuario hace clic en la canción "The Trooper - 2015 Remaster"
    Then El reproductor debe mostrar la duración "6:12"

    @smokeTest @regresionTest @INT
    Scenario: Cambio de cancion
    When Rellenamos el campo "CampoBusquedaCanciones" con el texto: "The Trooper" 
    Then Comprobamos que cada resultado debe tener imagen, título y nombre del artista   
    When El usuario hace clic en la canción "The Trooper - 2015 Remaster"
    Then El reproductor debe mostrar la duración "6:12"
    When Rellenamos el campo "CampoBusquedaCanciones" con el texto: "Partiendo la Pana" 
    Then Comprobamos que cada resultado debe tener imagen, título y nombre del artista   
    When El usuario hace clic en la canción "Partiendo la Pana"
    Then El reproductor debe mostrar la duración "6:12"



        
    
    