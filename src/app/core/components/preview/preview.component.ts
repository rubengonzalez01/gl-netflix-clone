import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MovieService } from 'src/app/core/services/movie.service';
import { GlobalVariables } from '../../../shared/global-variables';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent implements OnInit {
  @Input() isActive: boolean;
  movie: any;
  thumbUp = false;
  thumbDown = false;
  myList = false;
  bgImage: string = 'https://image.tmdb.org/t/p/original';

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movie = this.movieService.activeMovie;
    this.bgImage = this.bgImage + this.movie.backdrop_path;

    this.myList = this.movieService.checkMovieList();
  }

  closePreview(): void {
    this.isActive = false;
    setTimeout(() => {
      this.movieService.setShowMoviePreview(false);
    }, 400);
  }

  setThumbUp(value: boolean): void {
    this.thumbUp = value;
    if (value) this.thumbDown = !value;
  }

  setThumbDown(value: boolean): void {
    this.thumbDown = value;
    if (value) this.thumbUp = !value;
  }

  getVideo() {
    this.movie.title
      ? this.movieService.getMovieVideo(GlobalVariables.MOVIE_VIDEO)
      : this.movieService.getMovieVideo(GlobalVariables.TVSHOW_VIDEO);
  }

  addToList() {
    this.movieService.addToList();
    this.myList = !this.myList;
  }

  removeToList() {
    this.movieService.removeItemToList();
    this.myList = !this.myList;
  }
}
