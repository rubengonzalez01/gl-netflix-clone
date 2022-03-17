// Modules
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MaterialModule } from './material/material.module';

// Components
import { SliderComponent } from './slider/slider.component';

@NgModule({
    declarations: [
        SliderComponent,
    ],
    imports: [
        MaterialModule,
        CommonModule,
        SlickCarouselModule
    ],
    providers: [],
    exports: [
        SliderComponent,
        MaterialModule
    ],
})
export class SharedModule { }