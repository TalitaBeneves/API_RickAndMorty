import { Character } from 'src/app/core/model/character';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

const MY_FAVORITES = 'myFavorites';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private charactersFavSubject = new BehaviorSubject<Character[]>([]);
  charactersFav$ = this.charactersFavSubject.asObservable();

  constructor(private toastrServe: ToastrService) {
    this.initialStorage();
  }

  addOrRemoveFavorite(character: Character): void {
    const { id } = character;
    const currentsFav = this.getFavoritesCharacters();
    const found = !!currentsFav.find((fav: Character) => fav.id === id);
    found ? this.removeFromFavorite(id) : this.addToFavorite(character);
  }

  private addToFavorite(character: Character): void {
    try {
      const currentsFav = this.getFavoritesCharacters();
      localStorage.setItem(
        MY_FAVORITES,
        JSON.stringify([...currentsFav, character])
      );
      this.charactersFavSubject.next([...currentsFav, character]);
      this.toastrServe.success(
        `${character.name} Adicionado com sucesso ❤`,
        'Rick And Morty 🧠'
      );
    } catch (error) {
      console.log('Error saving localStorage', error);
      this.toastrServe.error(
        `Error ao adicionar ${character.name} 😑`,
        'Rick And Morty 🧠'
      );
    }
  }

  private removeFromFavorite(id: number): void {
    try {
      const currentsFav = this.getFavoritesCharacters();
      const characters = currentsFav.filter(
        (item: { id: number }) => item.id !== id
      );
      localStorage.setItem(MY_FAVORITES, JSON.stringify([...characters]));
      this.charactersFavSubject.next([...characters]);
      this.toastrServe.warning(
        `foi removido com sucesso`,
        'Rick And Morty 🧠'
      );
    } catch (error) {
      console.log('Error removing localStorage', error);
      this.toastrServe.error(
        `Error removing localStorage ${error} 😑`,
        'Rick And Morty 🧠'
      );
    }
  }

  getFavoritesCharacters(): any {
    try {
      const charactersFav = JSON.parse(
        localStorage.getItem(MY_FAVORITES) || ''
      );
      this.charactersFavSubject.next(charactersFav);
      return charactersFav;
    } catch (error) {
      console.log('Error getting favorites from localStorage', error);
    }
  }

  clearStorage(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.log('Error cleaning localStorage', error);
    }
  }

  private initialStorage(): void {
    const currents = localStorage.getItem(MY_FAVORITES) || '';
    if (!currents) {
      localStorage.setItem(MY_FAVORITES, JSON.stringify([]));
    }
    this.getFavoritesCharacters();
  }
}
