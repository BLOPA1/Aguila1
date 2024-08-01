import fs from 'fs';
import path from 'path';

// Función predeterminada para manejar las solicitudes GET
export default async function handler(req, res) {
  const { query } = req;

  const exactPhrase = query.exactPhrase || '';
  const includeWords = query.includeWords ? query.includeWords.split(',') : [];
  const excludeWords = query.excludeWords ? query.excludeWords.split(',') : [];
  const site = query.site || '';
  const date = query.date || '';
  const country = query.country || '';
  const topic = query.topic || '';

  // Leer los datos de noticias desde el archivo
  const filePath = path.join(process.cwd(), 'news.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  let news = JSON.parse(jsonData);

  // Filtrar las noticias basadas en los parámetros de consulta
  news = news.filter(item => {
    let matches = true;

    if (exactPhrase && !item.title.includes(exactPhrase)) {
      matches = false;
    }

    includeWords.forEach(word => {
      if (!item.title.includes(word.trim())) {
        matches = false;
      }
    });

    excludeWords.forEach(word => {
      if (item.title.includes(word.trim())) {
        matches = false;
      }
    });

    if (site && !item.link.includes(site)) {
      matches = false;
    }

    if (date && item.date !== date) {
      matches = false;
    }

    if (country && item.country !== country) {
      matches = false;
    }

    if (topic && item.topic !== topic) {
      matches = false;
    }

    return matches;
  });

  // Agregar un log para depuración
  console.log('Filtered news:', news);

  // Retornar los datos filtrados como respuesta JSON
  return res.status(200).json(news);
}
