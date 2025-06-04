<<<<<<< HEAD
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
=======
export class Cache {
  constructor(key) {
    this.key = key; // Назва, під якою зберігатиметься кеш (наприклад, 'datesTest')
  }

  // Отримати значення з кешу
  get(field) {
    const data = JSON.parse(localStorage.getItem(this.key)) || {};
    return data[field];
  }

  // Встановити значення в кеш
  set(field, value) {
    const data = JSON.parse(localStorage.getItem(this.key)) || {};
    data[field] = value;
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  // Очистити весь кеш цього ключа
  clear() {
    localStorage.removeItem(this.key);
  }
}
>>>>>>> d96499fecb1b7bd067f8820ff5da4e20ecd43682
