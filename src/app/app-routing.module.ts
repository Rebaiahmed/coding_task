import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReposComponent } from './features/repos/repos.component';
import { CommitsComponent } from './features/commits/commits.component';

const routes: Routes = [
  { path: 'repos', component: ReposComponent },
  { path: 'commits', component:CommitsComponent },
  { path: '', redirectTo: '/repos', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
