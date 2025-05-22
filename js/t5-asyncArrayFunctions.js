import { monumentsData } from './materials.js';

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function fetchMonuments() {
  await delay(500); 
  return monumentsData.map(m => ({ ...m }));
}

export function filterByStyleCallback(monuments, style, callback) {
  setTimeout(() => {
    const result = monuments.filter(m => m.style === style);
    callback(result);
  }, 300);
}

export async function sortByName(monuments) {
  await delay(300);
  return [...monuments].sort((a, b) => a.name.localeCompare(b.name));
}

export async function searchMonument(monuments, query) {
  await delay(300);
  return monuments.filter(m => m.name.toLowerCase().includes(query.toLowerCase()));
}
