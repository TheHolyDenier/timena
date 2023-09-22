export class LocalStorageService {
  static get(key: string): string | null {
    if (!process.client) return null;
    return localStorage.getItem(key);
  }

  static set(key: string, value: string) {
    if (!process.client) return;
    localStorage.setItem(key, value);
  }

  static clear(key: string) {
    if (!process.client) return;
    localStorage.removeItem(key);
  }

  static clearAll() {
    if (!process.client) return;
    localStorage.clear();
  }
}
