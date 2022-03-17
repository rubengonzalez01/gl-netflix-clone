import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movies } from 'src/app/core/models/movies.interface';
import { MovieService } from 'src/app/core/services/movie.service';
import { GlobalVariables } from '../../shared/global-variables';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];

  nowPlaying: Movies;
  popular: Movies;
  topRated: Movies;
  trending: Movies;
  upcoming: Movies;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.subs.push(this.movieService.getMovies(GlobalVariables.MOVIE_TRENDING, true).subscribe( data => {
      this.trending = data;
    }));
    this.subs.push(this.movieService.getMovies(GlobalVariables.MOVIE_POPULAR).subscribe( data => {
      this.popular = data;
    }));
    this.subs.push(this.movieService.getMovies(GlobalVariables.MOVIE_TOP_RATED).subscribe( data => {
      this.topRated = data;
    }));
    this.subs.push(this.movieService.getMovies(GlobalVariables.MOVIE_NOW_PLAYING).subscribe( data => {
      this.nowPlaying = data;
    }));
    this.subs.push(this.movieService.getMovies(GlobalVariables.MOVIE_UPCOMING).subscribe( data => {
      this.upcoming = data;
    }));

    this.subs.push(this.movieService.getShowMoviePreview().subscribe( visible => {
      if(visible){
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'visible';
      }
    }));

    this.movieService.loadList();
  }

  ngOnDestroy(): void {
    this.subs.map(sub => sub.unsubscribe());
  }

}
