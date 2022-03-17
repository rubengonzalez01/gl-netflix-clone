import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieService } from 'src/app/core/services/movie.service';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss']
})
export class MyListComponent implements OnInit {
  movieList: any;
  subs: Subscription[] = [];

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.loadList();

    this.subs.push(this.movieService.getMovieList().subscribe( list => {
      this.movieList = list;
    }));

  }

  ngOnDestroy(){
    this.subs.forEach(s => s.unsubscribe());
  }

  showPreview(movie: any){
    this.movieService.activeMovie = movie;
    this.movieService.setShowMoviePreview(true);
  }

}
