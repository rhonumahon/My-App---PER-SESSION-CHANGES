import { NgModule } from '@angular/core';
import {
  PreloadAllModules,
  PreloadingStrategy,
  RouterModule,
  Routes,
} from '@angular/router';
import { UserResolver } from './user/user-resolver';

const routes: Routes = [
  { path: '', redirectTo: 'sampleApp', pathMatch: 'full' },
  {
    path: 'sampleApp',
    loadChildren: () =>
      import('./user-list/user-list.module').then((m) => m.UserListModule),
  },
  {
    path: 'sampleApp/add',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'sampleApp/:id/view',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'sampleApp/:id/edit',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
