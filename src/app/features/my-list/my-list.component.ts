import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieService } from 'src/app/core/services/movie.service';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss'],
})
export class MyListComponent implements OnInit, OnDestroy {
  movieList: any;
  subs: Subscription[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.loadList(true);

    this.subs.push(
      this.movieService.getMovieList().subscribe(list => {
        this.movieList = list;
        console.log('movieList', this.movieList);
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
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }

  showPreview(movie: any) {
    console.log(movie);
    this.movieService.activeMovie = movie;
    this.movieService.setShowMoviePreview(true);
  }
}
