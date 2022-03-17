import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movies } from 'src/app/core/models/movies.interface';
import { MovieService } from 'src/app/core/services/movie.service';
import { GlobalVariables } from '../../shared/global-variables';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  subs: Subscription[] = [];

  trending: Movies;
  popular: Movies;
  topRated: Movies;
  originals: Movies;
  nowPlaying: Movies;

  sliderConfig = {
    slidesToShow: 6,
    slidesToScroll: 2,
    arrows: true,
    autoplay: false,
  }

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.subs.push(this.movieService.getMovies(GlobalVariables.HOME_TRENDING, true).subscribe( data => {
      this.trending = data;
    }));
    this.subs.push(this.movieService.getMovies(GlobalVariables.MOVIE_POPULAR).subscribe( data => {
      this.popular = data;
    }));
    this.subs.push(this.movieService.getMovies(GlobalVariables.MOVIE_TOP_RATED).subscribe( data => {
      this.topRated = data;
    }));
    this.subs.push(this.movieService.getMovies(GlobalVariables.HOME_ORIGINALS).subscribe( data => {
      this.originals = data;
    }));
    this.subs.push(this.movieService.getMovies(GlobalVariables.MOVIE_NOW_PLAYING).subscribe( data => {
      this.nowPlaying = data;
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
