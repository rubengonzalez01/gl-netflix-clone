// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { SharedModule } from '../shared/shared.module';

// Components
import { HeaderComponent } from './components/header/header.component';
import { MoviePlayerComponent } from './components/movie-player/movie-player.component';
import { PreviewComponent } from './components/preview/preview.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiMovieInterceptor } from './interceptors/api-movie.interceptor';

@NgModule({
  declarations: [HeaderComponent, PreviewComponent, MoviePlayerComponent],
  imports: [
    YouTubePlayerModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    RouterModule,
    // HttpClientModule,
  ],
  // providers: [
  //   {
  //     provide: HTTP_INTERCEPTORS,
  //     useClass: ApiMovieInterceptor,
  //     multi: true,
  //   },
  // ],
  exports: [PreviewComponent, MoviePlayerComponent, HeaderComponent],
})
export class CoreModule {}
