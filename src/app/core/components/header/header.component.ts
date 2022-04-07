import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieService } from 'src/app/core/services/movie.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  sticky = false;
  subs: Subscription[] = [];
  headerMovie: any;

  @ViewChild('stickHeader') header: ElementRef;
  headerBGUrl: string;
  currentSection: string;

  constructor(private movies: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.currentSection = this.router.url;
      }
    });

    this.subs.push(
      this.movies.getHeaderMovie().subscribe(data => {
        this.headerMovie = data;
        if (this.headerMovie) {
          this.headerBGUrl =
            'https://image.tmdb.org/t/p/original' +
            this.headerMovie.backdrop_path;
        }
      })
    );
  }

  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const windowScroll = window.scrollY;
    if (windowScroll >= this.header.nativeElement.offsetHeight) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }

  showMoreInfo() {
    this.movies.activeMovie = this.headerMovie;
    this.movies.setShowMoviePreview(true);
  }
}
