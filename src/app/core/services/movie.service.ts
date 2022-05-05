import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movies, ResultsEntity } from '../models/movies.interface';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private url = 'https://api.themoviedb.org/3';
  private v4Url = 'https://api.themoviedb.org/4';
  private accessToken = environment.token;
  private api_key = environment.api;
  activeMovie: any;
  movieKey: string = '';
  ListId: number;
  movieListObj: any; // is the complete list with properties, not just an array of medias
  myStorage = window.localStorage;

  private showMoviePreview$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private showMoviePlayer$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private headerMovie$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private movieList$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor() {}

  loadList(isMyListSection: boolean) {
    const list = this.myStorage.getItem('NetflixListId');
    this.ListId = list ? JSON.parse(list) : null;

    this.getList(isMyListSection);
  }

  getMovies(topic: string, isHeader: boolean = false): Observable<Movies> {
    const url = this.getUrl(UrlType.MOVIES, topic);
    return from(
      fetch(url, {
        headers: {
          'Accept-Encoding': 'gzip, compress, br',
        },
      })
        .then(response => response.json())
        .then(content => {
          if (isHeader) {
            this.setHeaderMovie(content.results[0]);
          }
          return content;
        })
    );
  }

  addToList() {
    if (this.ListId) {
      this.addNewItemToList();
    } else {
      this.createList();
    }
  }

  async getList(myListSection: boolean) {
    if (this.ListId) {
      const url = this.getUrl(UrlType.GET_LIST);
      const list = await fetch(url)
        .then(response => response.json())
        .then(content => {
          this.movieListObj = content;
          if (content.results && myListSection) {
            this.setHeaderMovie(content.results[0]);
          }
          return content.results;
        });
      this.setMovieList(list);
    }
  }

  createList(): void {
    const url = this.getUrl(UrlType.CREATE_LIST);

    const newList = {
      name: 'My movies list',
      description: 'My favorites movies are here.',
      iso_639_1: 'en',
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer ' + this.accessToken,
        'Accept-Encoding': 'gzip, compress, br',
      },
      body: JSON.stringify(newList),
    })
      .then(response => response.json())
      .then(content => {
        this.ListId = content.id;
        this.myStorage.setItem('NetflixListId', JSON.stringify(this.ListId));
        this.addToList();
      })
      .catch(err => {
        console.error('Error: ' + err);
      });
  }

  addNewItemToList() {
    const url = this.getUrl(UrlType.ITEMS);
    const movieType = this.activeMovie.title ? 'movie' : 'tv';
    const movieId = this.activeMovie.id;

    const newItem = {
      items: [
        {
          media_type: movieType,
          media_id: movieId,
        },
      ],
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer ' + this.accessToken,
        'Accept-Encoding': 'gzip, compress, br',
      },
      body: JSON.stringify(newItem),
    })
      .then(response => response.json())
      .then(content => {
        this.getList(false);
      })
      .catch(err => {
        console.error('Error: ' + err);
      });
  }

  removeItemToList() {
    const url = this.getUrl(UrlType.ITEMS);
    const movieType = this.activeMovie.title ? 'movie' : 'tv';
    const movieId = this.activeMovie.id;

    const itemToRemove = {
      items: [
        {
          media_type: movieType,
          media_id: movieId,
        },
      ],
    };

    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer ' + this.accessToken,
        'Accept-Encoding': 'gzip, compress, br',
      },
      body: JSON.stringify(itemToRemove),
    })
      .then(response => response.json())
      .then(content => {
        this.getList(false);
      })
      .catch(err => {
        console.error('Error: ' + err);
      });
  }

  getUrl(resource: UrlType, topic?: string): string {
    const urlManager = {
      createList: `${this.v4Url}/list?api_key=${this.api_key}`,
      getList: `${this.v4Url}/list/${this.ListId}?api_key=${this.api_key}`,
      items: `${this.v4Url}/list/${this.ListId}/items?api_key=${this.api_key}`,
      movies: `${this.url}${topic}?api_key=${this.api_key}`,
      video: this.activeMovie
        ? `${this.url}${topic}${this.activeMovie.id}/videos?api_key=${this.api_key}`
        : '',
    };

    return urlManager[resource];
  }

  getHeaderMovie(): Observable<string> {
    return this.headerMovie$.asObservable();
  }

  setHeaderMovie(value: any): void {
    this.headerMovie$.next(value);
  }

  getShowMoviePreview(): Observable<boolean> {
    return this.showMoviePreview$.asObservable();
  }

  setShowMoviePreview(value: boolean): void {
    this.showMoviePreview$.next(value);
  }

  getShowMoviePlayer(): Observable<boolean> {
    return this.showMoviePlayer$.asObservable();
  }

  setShowMoviePlayer(value: boolean): void {
    this.showMoviePlayer$.next(value);
  }

  getMovieList(): Observable<boolean> {
    return this.movieList$.asObservable();
  }

  setMovieList(value: any): void {
    this.movieList$.next(value);
  }

  getMovieVideo(topic: string) {
    const url = this.getUrl(UrlType.VIDEO, topic);

    fetch(url, {
      headers: {
        'Accept-Encoding': 'gzip, compress, br',
      },
    })
      .then(response => response.json())
      .then(content => {
        this.movieKey = content.results[0].key;
        this.setShowMoviePlayer(true);
      });
  }

  checkMovieList(): boolean {
    if (this.movieListObj) {
      const media = this.movieListObj.results.find(
        (movie: ResultsEntity) => movie.id === this.activeMovie.id
      );
      return media ? true : false;
    }
    return false;
  }
}

export enum UrlType {
  CREATE_LIST = 'createList',
  GET_LIST = 'getList',
  ITEMS = 'items',
  MOVIES = 'movies',
  VIDEO = 'video',
}
