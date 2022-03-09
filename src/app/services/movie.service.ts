import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movies } from '../models/movies.interface';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private url = 'https://api.themoviedb.org/3';
  private api_key = environment.api;
  activeMovie: any;
  movieKey: string = '';

  private showMoviePreview$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private showMoviePlayer$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private headerMovie$: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor() { }

  getMovies(topic: string, isHeader: boolean = false): Observable<Movies> {    
    const url = `${this.url}${topic}?api_key=${this.api_key}`;
    
    return from(
      fetch(url)
        .then( response => response.json())
        .then( content => {
          console.log("content TOPIC", content)
          if(isHeader){
            this.setHeaderMovie(content.results[0]);
          }
          return content;
        })
    );
  }

  getHeaderMovie(): Observable<string>{
    return this.headerMovie$.asObservable();
  }

  setHeaderMovie(value: any): void {
    this.headerMovie$.next(value);
  }
  
  getShowMoviePreview(): Observable<boolean>{
    return this.showMoviePreview$.asObservable();
  }

  setShowMoviePreview(value: boolean): void {
    this.showMoviePreview$.next(value);
  }

  getShowMoviePlayer(): Observable<boolean>{
    return this.showMoviePlayer$.asObservable();
  }

  setShowMoviePlayer(value: boolean): void {
    this.showMoviePlayer$.next(value);
  }

  getMovieVideo(topic: string){
    const url = `${this.url}${topic}${this.activeMovie.id}/videos?api_key=${this.api_key}`;

    fetch(url)
      .then( response => response.json())
      .then( content => {
        console.log("content Video", content)
        this.movieKey = content.results[0].key;
        console.log("URL", this.movieKey)
        this.setShowMoviePlayer(true);
      });    
  }

  
}
