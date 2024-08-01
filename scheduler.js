import scrapeNews from './scraper/scraper.js'; // Ajusta la ruta si es necesario

// Función para ejecutar el scraper
async function runScraper() {
  try {
    console.log('Ejecutando scraper...');
    await scrapeNews();
    console.log('Scraper completado.');
  } catch (error) {
    console.error('Error al ejecutar el scraper:', error);
  }
}

// Ejecutar el scraper cada 10 segundos
const interval = 10000; // 10 segundos en milisegundos
runScraper(); // Ejecutar inmediatamente al iniciar
setInterval(runScraper, interval);
