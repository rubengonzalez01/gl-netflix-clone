import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'browse',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'tvshows',
    loadChildren: () => import('./features/tv-show/tv-show.module').then(m => m.TvShowModule)
  },
  {
    path: 'movies',
    loadChildren: () => import('./features/movie/movie.module').then(m => m.MovieModule)
  },
  {
    path: 'mylist',
    loadChildren: () => import('./features/my-list/my-list.module').then(m => m.MyListModule)
  },
  {
    path: '**',
    redirectTo: 'browse',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
