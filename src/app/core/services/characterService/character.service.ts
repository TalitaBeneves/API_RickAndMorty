import { LocalStorageService } from './../localStorage/localStorage.service';
import { query } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, pluck, take, tap, withLatestFrom } from 'rxjs';
import { Character, DATAResponse, Episode } from 'src/app/core/model/character';
import { environment } from 'src/environments/environment';

const QUERY = gql`
  {
    episodes {
      results {
        name
        episode
        created
        air_date
      }
    }
    characters {
      results {
        id
        name
        status
        species
        gender
        image
        created
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private episodesSubject = new BehaviorSubject<Episode[]>([]);
  episodes$ = this.episodesSubject.asObservable();

  private charactersSubject = new BehaviorSubject<Character[]>([]);
  characters$ = this.charactersSubject.asObservable();

  constructor(
    private http: HttpClient,
    private apollo: Apollo,
    private locaStorage: LocalStorageService
  ) {
    this.getDataAPI();
  }

  search(query = '', page = 1) {
    const filter = `${environment.baseUrl}/?name=${query}&page=${page}`;
    return this.http.get<Character[]>(filter);
  }

  getDetails(id: number) {
    return this.http.get<Character>(`${environment.baseUrl}/${id}`);
  }

  //Recuperando dados
  getDataAPI(): void {
    this.apollo
      .watchQuery<DATAResponse>({
        query: QUERY,
      })
      .valueChanges.pipe(
        take(1),
        tap(({ data }) => {
          const { characters, episodes } = data;
          this.episodesSubject.next(episodes.results);
          this.parseCharactersData(characters.results);
        })
      )
      .subscribe();
  }

  private parseCharactersData(characters: Character[]): void {
    const currentFavs = this.locaStorage.getFavoritesCharacters();
    const newData = characters.map((character) => {
      const found = !!currentFavs.find(
        (fav: Character) => fav.id === character.id
      );
      return { ...character, isFavorite: found };
    });
    this.charactersSubject.next(newData);
  }

  getCharactersByPage(pageNum: number): void {
    const QUERY_BY_PAGE = gql`{
      characters(page: ${pageNum}) {
        results {
          id
          name
          status
          species
          gender
          image
        }
      }
    }`;

    this.apollo
      .watchQuery<any>({
        query: QUERY_BY_PAGE,
      })
      .valueChanges.pipe(
        take(1),
        pluck('data', 'characters'),
        withLatestFrom(this.characters$),
        tap(([apiResponse, characters]) => {
          this.parseCharactersData([...characters, ...apiResponse.results]);
        })
      )
      .subscribe();
  }
}
