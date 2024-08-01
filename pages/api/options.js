import fs from 'fs';
import path from 'path';

// Función predeterminada para manejar las solicitudes GET
export default async function handler(req, res) {
  // Lee los datos de noticias desde el archivo
  const filePath = path.join(process.cwd(), 'news.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const news = JSON.parse(jsonData);

  // Obtiene las opciones de países y tópicos
  const countries = Array.from(new Set(news.map(item => item.country).filter(Boolean)));
  const topics = Array.from(new Set(news.map(item => item.topic).filter(Boolean)));

  // Retorna las opciones como respuesta JSON
  res.status(200).json({ countries, topics });
}
