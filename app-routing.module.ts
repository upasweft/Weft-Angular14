import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, InitialNavigation } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./authentication/authentication.module').then(mod => mod.AuthenticationModule),
  },
  {
    path: '',
    loadChildren: () => import('./zine-modules/zine/zine.module').then(mod => mod.ZineModule),
  },
  // {
  //   path: 'ui',
  //   loadChildren: () => import('./ui-components/ui-components.module').then(mod => mod.UiComponentsModule),
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
      initialNavigation: 'enabled' as InitialNavigation, // Specify 'enabled' as InitialNavigation type
      preloadingStrategy: PreloadAllModules
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
