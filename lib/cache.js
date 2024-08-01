import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 150 }); // 2.5 minutos de caché

export function getFromCache(key) {
  return cache.get(key);
}

export function setInCache(key, value) {
  cache.set(key, value);
}
