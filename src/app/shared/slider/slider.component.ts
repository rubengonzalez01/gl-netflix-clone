import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Movies } from 'src/app/core/models/movies.interface';
import { MovieService } from 'src/app/core/services/movie.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements AfterViewChecked {
  @Input() sliderConfig: any;
  @Input() movies: Movies;
  @Input() title: string;
  @Output() preview: EventEmitter<boolean> = new EventEmitter<boolean>();
  leftArrowVisible = false;
  rightArrowVisible = true;

  @ViewChild('carousel') carouselElement: ElementRef;

  constructor(
    private movieService: MovieService,
    private cd: ChangeDetectorRef
  ) {}

  ngAfterViewChecked(): void {
    if (
      this.carouselElement &&
      this.carouselElement.nativeElement.scrollLeft > 0
    ) {
      this.leftArrowVisible = true;
    } else {
      this.leftArrowVisible = false;
    }

    const element = this.carouselElement.nativeElement;
    if (element.scrollLeft + element.clientWidth + 1 <= element.scrollWidth) {
      this.rightArrowVisible = true;
    } else {
      this.rightArrowVisible = false;
    }
    this.cd.detectChanges();
  }

  identify(index: number, item: any) {
    return item.id;
  }

  showPreview(movie: any) {
    console.log(movie);
    this.movieService.activeMovie = movie;
    this.movieService.setShowMoviePreview(true);
  }

  scrollCarousel(dir: string): void {
    if (this.carouselElement) {
      if (dir === 'l') {
        this.carouselElement.nativeElement.scrollLeft -= 100;
      } else {
        this.carouselElement.nativeElement.scrollLeft += 100;
      }
    }
  }
}
