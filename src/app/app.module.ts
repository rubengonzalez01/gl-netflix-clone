
// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './components/shared/material/material.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HttpClientModule } from '@angular/common/http';
import { YouTubePlayerModule } from '@angular/youtube-player';

// Components
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SliderComponent } from './components/slider/slider.component';
import { PreviewComponent } from './components/preview/preview.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { TvShowComponent } from './components/tv-show/tv-show.component';
import { MovieComponent } from './components/movie/movie.component';
import { MoviePlayerComponent } from './components/movie-player/movie-player.component';

@NgModule({
  declarations: [
    AppComponent,
    SliderComponent,
    PreviewComponent,
    HeaderComponent,
    HomeComponent,
    TvShowComponent,
    MovieComponent,
    MoviePlayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SlickCarouselModule,
    HttpClientModule,
    YouTubePlayerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
