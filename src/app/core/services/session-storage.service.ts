import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  constructor() {}

  setSessionItem(key: string, value: string | object | number) {
    if (typeof value === 'string') {
      sessionStorage.setItem(key, value);
    } else {
      sessionStorage.setItem(key, JSON.stringify(value));
    }
  }

  getSessionItem(key: string) {
    const result = sessionStorage.getItem(key);
    if(!result) return null
    if(typeof result === 'string') return JSON.parse(result)
  }

  deleteSessionItem(key: string) {
    sessionStorage.removeItem(key);
  }

  clearSession() {
    sessionStorage.clear();
  }
}
