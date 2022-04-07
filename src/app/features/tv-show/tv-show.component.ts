import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movies } from 'src/app/core/models/movies.interface';
import { MovieService } from 'src/app/core/services/movie.service';
import { GlobalVariables } from '../../shared/global-variables';

@Component({
  selector: 'app-tv-show',
  templateUrl: './tv-show.component.html',
  styleUrls: ['./tv-show.component.scss'],
})
export class TvShowComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];

  airingToday: Movies;
  popular: Movies;
  topRated: Movies;
  trending: Movies;
  onAir: Movies;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.subs.push(
      this.movieService
        .getMovies(GlobalVariables.TVSHOW_TRENDING, true)
        .subscribe(data => {
          this.trending = data;
        })
    );
    this.subs.push(
      this.movieService
        .getMovies(GlobalVariables.TVSHOW_POPULAR)
        .subscribe(data => {
          this.popular = data;
        })
    );
    this.subs.push(
      this.movieService
        .getMovies(GlobalVariables.TVSHOW_TOP_RATED)
        .subscribe(data => {
          this.topRated = data;
        })
    );
    this.subs.push(
      this.movieService
        .getMovies(GlobalVariables.TVSHOW_AIRING_TODAY)
        .subscribe(data => {
          this.airingToday = data;
        })
    );
    this.subs.push(
      this.movieService
        .getMovies(GlobalVariables.TVSHOW_ON_THE_AIR)
        .subscribe(data => {
          this.onAir = data;
        })
    );

    this.subs.push(
      this.movieService.getShowMoviePreview().subscribe(visible => {
        if (visible) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'visible';
        }
      })
    );

    this.movieService.loadList(false);
  }

  ngOnDestroy(): void {
    this.subs.map(sub => sub.unsubscribe());
  }
}
