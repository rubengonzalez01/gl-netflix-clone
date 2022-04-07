// Modules
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from 'src/app/shared/shared.module';
import { MovieRoutingModule } from './movie-routing.module';

// Components
import { MovieComponent } from './movie.component';

@NgModule({
  declarations: [MovieComponent],
  imports: [SharedModule, MovieRoutingModule, CommonModule],
  providers: [],
  exports: [],
})
export class MovieModule {}
