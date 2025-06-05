export class DatesCache {
  constructor() {
    this.indexKey = 'datesTest-index';
  }

  getAll() {
    const keys = JSON.parse(localStorage.getItem(this.indexKey)) || [];
    return keys.map(key => JSON.parse(localStorage.getItem(key))).filter(Boolean);
  }

  addResult(result) {
    const timestamp = Date.now();
    const resultKey = `datesTest-${timestamp}`;

    let keys = JSON.parse(localStorage.getItem(this.indexKey)) || [];

    if (keys.length >= 10) {
      const oldestKey = keys.shift(); 
      localStorage.removeItem(oldestKey);
    }

    keys.push(resultKey);
    localStorage.setItem(resultKey, JSON.stringify(result));
    localStorage.setItem(this.indexKey, JSON.stringify(keys));
  }

  clear() {
    const keys = JSON.parse(localStorage.getItem(this.indexKey)) || [];
    keys.forEach(key => localStorage.removeItem(key));
    localStorage.removeItem(this.indexKey);
  }
}
