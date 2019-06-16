import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListeTachesComponent } from './liste-taches/liste-taches.component';

const routes: Routes = [
  {path: 'liste', component: ListeTachesComponent},
  {path: '**', redirectTo: 'liste', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
