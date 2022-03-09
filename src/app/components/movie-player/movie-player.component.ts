import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-player',
  templateUrl: './movie-player.component.html',
  styleUrls: ['./movie-player.component.scss']
})
export class MoviePlayerComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('youTubePlayer') youTubePlayer: ElementRef<HTMLDivElement>;
  movie: any;
  movieKey: string = '';
  videoWidth: number | undefined;
  videoHeight: number | undefined;

  playerConfig = {
    controls: 1,
    mute: 0,
    autoplay: 1
  };

  constructor(
      private movieService: MovieService, 
      private _changeDetectorRef: ChangeDetectorRef) 
  { }

  ngOnInit(): void {
    this.movie = this.movieService.activeMovie;
    this.movieKey = this.movieService.movieKey;    
  }

  ngAfterViewInit(): void {
    this.onResize();
    window.addEventListener('resize', this.onResize);
  }

  onResize = (): void => {
    // Automatically expand the video to fit the page up to 1200px x 720px
    this.videoWidth = Math.min(this.youTubePlayer.nativeElement.clientWidth, 1200);
    this.videoHeight = this.videoWidth * 0.6;
    this._changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.onResize);
  }

  goBack(){
    this.movieService.setShowMoviePlayer(false);
  }

}
