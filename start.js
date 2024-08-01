import { exec } from 'child_process';
import { join } from 'path';
import { fileURLToPath } from 'url';
import  open  from 'open';

// Obtener el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

// Función para iniciar el scraper
function startScraper() {
  return new Promise((resolve, reject) => {
    exec(`node ${join(__dirname, 'scraper', 'scraper.js')}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error ejecutando scraper: ${error.message}`);
        reject(error);
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
      }
      console.log(`stdout: ${stdout}`);
      resolve();
    });
  });
}

// Función para iniciar el scheduler
function startScheduler() {
  return new Promise((resolve, reject) => {
    exec(`node ${join(__dirname, 'scheduler.js')}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error ejecutando scheduler: ${error.message}`);
        reject(error);
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
      }
      console.log(`stdout: ${stdout}`);
      resolve();
    });
  });
}

// Función para iniciar el servidor de Next.js
function startNext() {
  return new Promise((resolve, reject) => {
    exec('npm run dev', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error ejecutando Next.js: ${error.message}`);
        reject(error);
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
      }
      console.log(`stdout: ${stdout}`);
      resolve();
    });
  });
}

// Función principal para ejecutar todos los pasos
async function startAll() {
  try {

    console.log('Iniciando scheduler...');
    await startScheduler();
    console.log('Scheduler iniciado.');

    console.log('Iniciando Next.js...');
    await startNext();
    console.log('Next.js iniciado.');

    // Abrir la página en el navegador
    await open('http://localhost:3000');
    console.log('Página web abierta en el navegador.');
  } catch (error) {
    console.error('Error en el proceso de inicio:', error);
  }
}

// Ejecutar el proceso
startAll();
