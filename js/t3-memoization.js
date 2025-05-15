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