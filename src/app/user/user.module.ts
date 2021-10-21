import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserListModule } from '../user-list/user-list.module';
import { FriendsComponent } from './friends/friends.component';
import { UserResolver } from './user-resolver';
import { UserComponent } from './user.component';

const routes = [
  {
    path: 'sampleApp/add',
    component: UserComponent,
    resolve: [UserResolver],
  },
  {
    path: 'sampleApp/:id/view',
    component: UserComponent,
    resolve: [UserResolver],
  },
  {
    path: 'sampleApp/:id/edit',
    component: UserComponent,
    resolve: [UserResolver],
  },
];
@NgModule({
  declarations: [UserComponent, FriendsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserListModule,
    RouterModule.forChild(routes),
  ],
})
export class UserModule {}
