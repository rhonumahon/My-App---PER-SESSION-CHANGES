import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserActionComponent } from './Components/user-action/user-action.component';
import { UserComponent } from './Components/user/user.component';

const routes: Routes = [
  {
    path : 'api/:id/view',
    component: UserActionComponent
  },
  {
    path : 'api/:id/edit',
    component: UserActionComponent
  },
  {
    path : 'api/add',
    component: UserActionComponent
  },
  {
    path : 'api/Users',
    component: UserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
