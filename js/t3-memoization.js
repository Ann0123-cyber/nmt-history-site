export class Cache {
  constructor(key) {
    this.key = key;
    this.counterKey = `${key}-counter`;
  }

  get(field) {
    let data = JSON.parse(localStorage.getItem(this.key)) || {};
    return data[field];
  }

  set(field, value) {
    const data = JSON.parse(localStorage.getItem(this.key)) || {};
    data[field] = value;

    let saveCount = parseInt(localStorage.getItem(this.counterKey)) || 0;
    saveCount += 1;

    if (saveCount >= 10) {
      this.clear();
      saveCount = 0;
    } else {
    localStorage.setItem(this.key, JSON.stringify(data));
    }
    localStorage.setItem(this.counterKey, saveCount.toString());
  }

  clear() {
    localStorage.removeItem(this.key);
    localStorage.removeItem(this.counterKey);
  }
}