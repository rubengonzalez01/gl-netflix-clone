import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TvShowComponent } from './tv-show.component';

const routes: Routes = [
    {
        path: '',
        component: TvShowComponent
    },  
];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class TvShowRoutingModule { }