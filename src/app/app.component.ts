import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieService } from './core/services/movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  previewVisible: boolean = false;
  isPlay: boolean = false;

  constructor(private movieService: MovieService){

  }

  ngOnInit(): void {
    this.subs.push(this.movieService.getShowMoviePreview().subscribe( data => {
      this.previewVisible = data;
    }));
    this.subs.push(this.movieService.getShowMoviePlayer().subscribe( data => {
      this.isPlay = data;
    }));

  }

  ngOnDestroy(): void {
      this.subs.forEach(s => s.unsubscribe());
  }

}
