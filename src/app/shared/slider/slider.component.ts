import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Movies } from 'src/app/core/models/movies.interface';
import { MovieService } from 'src/app/core/services/movie.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  @Input() sliderConfig: any;
  @Input() movies: Movies;
  @Input() title: string;
  @Output() preview: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('carousel') carouselElement: ElementRef;

  constructor(private movieService: MovieService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

 
  identify(index: number, item: any) {
    return item.id;
  }

  showPreview(movie: any){
    console.log(movie)
    this.movieService.activeMovie = movie;
    this.movieService.setShowMoviePreview(true);
  }

  scrollCarousel(dir: string): void {
    if(this.carouselElement){
      if(dir === 'l'){
        this.carouselElement.nativeElement.scrollLeft -= 100;
      } else{
        this.carouselElement.nativeElement.scrollLeft += 100;
      }
    }
  }

  moveLeftIsVisible(){
    if(this.carouselElement && this.carouselElement.nativeElement.scrollLeft > 0){
      return true;
    }
    return false;
  }

  moveRightIsVisible(){
    if(this.carouselElement){
      const element = this.carouselElement.nativeElement;
      if(element.scrollLeft + element.clientWidth + 1 <= element.scrollWidth){
        return true;
      }
    }
    return false;
  }

}
