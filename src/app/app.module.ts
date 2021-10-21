import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user-list/user-list.component';
import { RouterModule } from '@angular/router';
import { PhonePipe } from './phone.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { FriendsComponent } from './friends/friends.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';

const routes = [
  {
    path: '',
    redirectTo: 'sampleApp',
    pathMatch: 'full',
  },
  {
    path: 'sampleApp',
    component: UserListComponent
  },
  {
    path: 'sampleApp/add',
    component: UserComponent
  },
  {
    path: 'sampleApp/:id/edit',
    component: UserComponent
  },
  // {
  //   path: 'sampleApp/:id/edit',
  //   component: EditComponent
  // }

]
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserListComponent,
    PhonePipe,
    FriendsComponent,
    ViewComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
