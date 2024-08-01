Prueba Tecnica:

Tecnologías Utilizadas: 

Frontend:
-React: Biblioteca de JavaScript para construir interfaces de usuario interactivas y eficientes.
-Next.js: Framework para React que habilita el renderizado del lado del servidor y la generación de sitios estáticos, optimizando el   rendimiento y la experiencia del usuario.

Backend:
- Node.js: Entorno de ejecución de JavaScript en el servidor, ideal para construir aplicaciones de red escalables.
- Express: Framework para construir APIs rápidas y eficientes en Node.js.
- Axios: Cliente HTTP que facilita la comunicación con APIs externas.
- Cheerio: Biblioteca que permite la manipulación y análisis de HTML en el servidor, esencial para la extracción de datos del feed RSS.

Base de Datos y Datos:
- JSON: Formato de almacenamiento para los datos extraídos, proporcionando una estructura sencilla y accesible.


Requisitos y Instalación
1. Instalar Node.js y npm
Primero, asegúrate de tener Node.js y npm instalados en tu máquina. Puedes descargar la última versión desde nodejs.org.

2. Clonar el Repositorio
Clona el repositorio con el siguiente comando:

____________________________________________________________________________
                                                                         
     git clone https://github.com/tu_usuario/nNoticiasAGUILA.git           
              cd nombre_del_repositorio                                                                                                 
____________________________________________________________________________

3. Instalar Dependencias
Instala las dependencias necesarias con:

____________________________________
     npm install                    
____________________________________



4. Configurar el Proyecto
Backend
- scraper.js: Este archivo maneja la extracción de noticias desde el feed RSS y guarda los datos en un archivo news.json. Asegúrate de que el archivo news.json esté presente en el directorio raíz del proyecto.

Frontend
- Los archivos del frontend están ubicados en el directorio de páginas de Next.js, especialmente en page.js. Verifica que el diseño y los filtros estén funcionando correctamente.

5. Ejecutar el Proyecto
Para iniciar el servidor de desarrollo y probar la aplicación, usa el siguiente comando:

____________________________________
     npm run dev                    
____________________________________


6. Acceder a la Aplicación

Abrir la Aplicación:
Navega a http://localhost:3000 para acceder a la interfaz de noticias.

Filtrar Noticias:
Utiliza los filtros de fecha, país y tema para personalizar las noticias que se muestran. Los filtros se actualizan automáticamente para mostrar los resultados correspondientes.

Ver Detalles de Noticias:
Haz clic en los títulos de las noticias para abrir los artículos completos en una nueva pestaña del navegador.


__________________________________________________________________________________________________________________________________________
Notas Adicionales
Formato de Fecha: La fecha en el filtro se ajusta para coincidir con el formato de fecha en news.json, asegurando que los filtros funcionen correctamente.
Opciones de Filtrado: La API proporciona opciones dinámicas para seleccionar países y temas disponibles en las noticias, adaptándose a la disponibilidad de datos.#NoticiasAGUILA
# NoticiasAGUILA
