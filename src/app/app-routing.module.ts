import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReposComponent } from './features/repos/repos.component';
import { CommitsComponent } from './features/commits/commits.component';

const routes: Routes = [
  { path: 'repos', loadComponent: () =>import("./features/repos/repos.component").then((m) => m.ReposComponent), },
  { path: 'commits',  loadComponent: () =>import("./features/commits/commits.component").then((m) => m.CommitsComponent), },
  { path: '', redirectTo: '/repos', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
