// Modules
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SharedModule } from 'src/app/shared/shared.module';
import { ApiMovieInterceptor } from './interceptors/api-movie.interceptor';
import { MovieRoutingModule } from './movie-routing.module';

// Components
import { MovieComponent } from './movie.component';

@NgModule({
  declarations: [MovieComponent],
  imports: [SharedModule, MovieRoutingModule, CommonModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiMovieInterceptor,
      multi: true,
    },
  ],
  exports: [],
})
export class MovieModule {}
