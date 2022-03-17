import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movies } from 'src/app/core/models/movies.interface';
import { MovieService } from 'src/app/core/services/movie.service';
import { GlobalVariables } from '../../../shared/global-variables';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  sticky = false;
  subs: Subscription[] = [];
  headerMovie: any;
  sections = {
    home: true,
    tvshows: false,
    movies: false,
    latest: false,
    myList: false,
  }
  
  @ViewChild('stickHeader') header: ElementRef;
  headerBGUrl: string;

  constructor(private movies: MovieService, private router: Router) { }

  ngOnInit(): void {
    this.subs.push(this.movies.getHeaderMovie().subscribe( data => {
      this.headerMovie = data;
      this.headerBGUrl = 'https://image.tmdb.org/t/p/original' + this.headerMovie.backdrop_path;
    }));
  }

  @HostListener('window:scroll', ['$event'])
  handleScroll(){
    const windowScroll = window.scrollY;
    if(windowScroll >= this.header.nativeElement.offsetHeight){
      this.sticky = true;
    } else{
      this.sticky = false;
    }
  }

  setSection(section: string){
    this.sections = {
      home: false,
      tvshows: false,
      movies: false,
      latest: false,
      myList: false,
    }

    switch(section){
      case 'home': 
        this.sections[section] = true;  
        this.router.navigate(['/browse']); 
        break;
      case 'tvshows': 
        this.sections[section] = true; 
        this.router.navigate(['/tvshows']); 
        break;
      case 'movies': 
        this.sections[section] = true; 
        this.router.navigate(['/movies']); 
        break;
      case 'latest': this.sections[section] = true; break;
      case 'myList': 
        this.sections[section] = true; 
        this.router.navigate(['/mylist']); 
        break;
    }
  }

  showMoreInfo(){
    this.movies.activeMovie = this.headerMovie;
    this.movies.setShowMoviePreview(true);
  }

}
