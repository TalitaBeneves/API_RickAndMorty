export interface APIResponse<T> {
  results: T;
}

export interface DATAResponse {
  characters: APIResponse<Character[]>;
  episodes: APIResponse<Episode[]>;
}

export interface Character {
  id: number;
  name: string;
  image: string;
  species: string;
  gender: string;
  created: Date;
  status: string;
  isFavorite?: boolean;
}

export interface Episode {
  name: string;
  episode: string;
  air_date: Date;
  created: Date;
}
