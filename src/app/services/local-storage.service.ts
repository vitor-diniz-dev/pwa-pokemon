import { Injectable } from '@angular/core';

export enum LocalStorageKeys {
  favoritedPokemon = 'favoritedPokemon',
}

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  // Salva dados no Local Storage de acordo com a chave fornecida
  saveData(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getData(key: string): any {
    const data = localStorage.getItem(key);

    return data ? JSON.parse(data) : null;
  }
}
