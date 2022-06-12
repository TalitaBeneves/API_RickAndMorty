import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./components/pages/login/login.module').then(
        (m) => m.LoginModule
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./components/pages/register/register.module').then(
        (m) => m.RegisterModule
      ),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./components/pages/home/home.module').then((m) => m.HomeModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'character-list',
    loadChildren: () =>
      import(
        './components/pages/characters/character-list/character-list.module'
      ).then((m) => m.CharacterListModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'character-details/:id',
    loadChildren: () =>
      import(
        './components/pages/characters/character-details/character-details.module'
      ).then((m) => m.CharacterDetailsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'episodes',
    loadChildren: () =>
      import('./components/pages/episodes/episodes.module').then(
        (m) => m.EpisodesModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./components/pages/about/about.module').then(
        (m) => m.AboutModule
      ),
    canActivate: [AuthGuard],
  },

  {
    path: '**',
    loadChildren: () =>
      import('./components/pages/notFound/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
