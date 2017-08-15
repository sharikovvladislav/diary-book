import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './core/containers/not-found-page';

export const routes: Routes = [
  {path: '', redirectTo: '/diary', pathMatch: 'full'},
  {
    path: 'diary',
    loadChildren: './diary/diary.module#DiaryModule',
  },
  { path: '**', component: NotFoundPageComponent },
];
