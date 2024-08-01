import NodeCache from 'node-cache';

// Inicializa el caché
const cache = new NodeCache({ stdTTL: 300 }); // Tiempo de vida del caché en segundos

// Función para guardar en caché
export function setInCache(key, value) {
  cache.set(key, value);
}

// Función para obtener de la caché
export function getFromCache(key) {
  return cache.get(key);
}
