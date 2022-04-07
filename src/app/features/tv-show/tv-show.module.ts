// Modules
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from 'src/app/shared/shared.module';
import { TvShowRoutingModule } from './tv-show-routing.module';

// Components
import { TvShowComponent } from './tv-show.component';

@NgModule({
  declarations: [TvShowComponent],
  imports: [SharedModule, TvShowRoutingModule, CommonModule],
  providers: [],
  exports: [],
})
export class TvShowModule {}
