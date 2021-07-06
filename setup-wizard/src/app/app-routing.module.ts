import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CanActivateHome, CanActivateRecover } from './guards/guards'
const routes: Routes = [
  {
    path: 'wizard',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [CanActivateHome],

  },
  {
    path: 'recover',
    loadChildren: () => import('./pages/recover/recover.module').then( m => m.RecoverPageModule),
    canActivate: [CanActivateRecover]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }