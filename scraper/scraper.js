const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const url = 'https://news.google.com/rss?hl=es&gl=ES';

function inferCountryFromContent(content) {
  const countryKeywords = {
    'España': ['España', 'Madrid', 'Barcelona', 'Sevilla', 'Valencia'],
    'México': ['México', 'CDMX', 'Ciudad de México', 'Monterrey', 'Guadalajara'],
    'Argentina': ['Argentina', 'Buenos Aires', 'Rosario', 'Córdoba'],
    'Chile': ['Chile', 'Santiago', 'Valparaíso', 'Concepción'],
    'Colombia': ['Colombia', 'Bogotá', 'Medellín', 'Cali'],
    'Perú': ['Perú', 'Lima', 'Arequipa', 'Cusco'],
    'Venezuela': ['Venezuela', 'Caracas', 'Maracaibo', 'Valencia'],
    'Uruguay': ['Uruguay', 'Montevideo', 'Punta del Este'],
    'Paraguay': ['Paraguay', 'Asunción', 'Ciudad del Este'],
    'Bolivia': ['Bolivia', 'La Paz', 'Santa Cruz', 'Cochabamba'],
    'Ecuador': ['Ecuador', 'Quito', 'Guayaquil', 'Cuenca'],
    'Cuba': ['Cuba', 'La Habana', 'Santiago de Cuba'],
    'República Dominicana': ['República Dominicana', 'Santo Domingo', 'Santiago'],
    'Puerto Rico': ['Puerto Rico', 'San Juan', 'Ponce'],
    // Agrega más países y palabras clave según sea necesario
  };

  for (const [country, keywords] of Object.entries(countryKeywords)) {
    if (keywords.some(keyword => content.includes(keyword))) {
      return country;
    }
  }

  return 'Desconocido';
}

function inferTopicFromContent(content) {
  const topicKeywords = {
    'Política': ['elección', 'gobierno', 'presidente', 'congreso', 'senado', 'político', 'Trump', 'Biden'],
    'Tecnología': ['tecnología', 'software', 'IA', 'inteligencia artificial', 'robotica', 'gadgets', 'Microsoft', 'Google', 'Apple'],
    'Deportes': ['fútbol', 'soccer', 'baloncesto', 'NBA', 'MLB', 'Olimpiadas', 'atleta', 'equipo', 'gol', 'partido'],
    'Entretenimiento': ['película', 'film', 'celebridad', 'música', 'concierto', 'álbum', 'Hollywood', 'Bollywood'],
    'Negocios': ['mercado', 'economía', 'empresa', 'CEO', 'fusión', 'adquisición', 'inversión'],
    'Salud': ['salud', 'medicina', 'doctor', 'COVID-19', 'vacuna', 'hospital', 'salud mental', 'nutrición'],
    'Ciencia': ['ciencia', 'investigación', 'descubrimiento', 'experimento', 'NASA', 'espacio', 'biología', 'física', 'química'],
    'Mundo': ['internacional', 'global', 'ONU', 'guerra', 'diplomacia', 'conflicto', 'tratado', 'embajada'],
    'Medio Ambiente': ['clima', 'medio ambiente', 'calentamiento global', 'sostenibilidad', 'contaminación', 'energía renovable'],
    'Finanzas': ['finanzas', 'banca', 'tasa de interés', 'préstamo', 'hipoteca', 'criptomoneda', 'bitcoin', 'blockchain'],
  };

  for (const [topic, keywords] of Object.entries(topicKeywords)) {
    if (keywords.some(keyword => content.toLowerCase().includes(keyword.toLowerCase()))) {
      return topic;
    }
  }

  return 'General'; // Retorna 'General' si no se encuentra un tópico específico
}

async function scrapeNews() {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data, { xmlMode: true });
    const news = [];

    $('item').each((index, element) => {
      const title = $(element).find('title').text().trim();
      const link = $(element).find('link').text().trim();
      const date = $(element).find('pubDate').text().trim();
      const content = $(element).text(); // Extraer el contenido del artículo para análisis
      const country = inferCountryFromContent(content);
      const topic = inferTopicFromContent(content);

      if (title) {
        news.push({ title, link, date, country, topic });
      }
    });

    fs.writeFileSync('news.json', JSON.stringify(news, null, 2));
    console.log('Noticias extraídas y guardadas en news.json');
  } catch (error) {
    console.error('Error al extraer noticias:', error.message);
  }
}

scrapeNews();
