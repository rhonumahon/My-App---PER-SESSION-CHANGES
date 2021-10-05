import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user/user.component';
import { PhonePipe } from './phone.pipe';

const routes = [
  {
    path: 'myApp',
    component: UserListComponent
  },
  {
    path: 'myApp/add',
    component: UserComponent
  },
  {
    path: 'myApp/:id/view',
    component: UserComponent
  }
]
@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserComponent,
    PhonePipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
