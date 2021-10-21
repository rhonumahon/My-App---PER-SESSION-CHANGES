import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { PhonePipe } from "./phone.pipe";
import { UserListComponent } from "./user-list.component";

const routes = [
  { path: '', component: UserListComponent }
];

@NgModule({
  declarations: [
    UserListComponent,
    PhonePipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UserListModule {}
