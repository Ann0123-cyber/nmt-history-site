export class Cache {
  constructor(key) {
    this.key = key;
  }

  get(field) {
    const data = JSON.parse(localStorage.getItem(this.key)) || {};
    return data[field];
  }

  set(field, value) {
    const data = JSON.parse(localStorage.getItem(this.key)) || {};
    data[field] = value;
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  clear() {
    localStorage.removeItem(this.key);
  }
}