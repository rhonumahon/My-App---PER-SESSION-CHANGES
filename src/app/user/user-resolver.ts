import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { User } from "../shared/models/user.model";
import { ApiService } from "../shared/services/api.service";

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<User[]>{
  constructor(private api: ApiService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const latestUsers = this.api.getLatestUsers();

    if (latestUsers.length === 0) {
      return this.api.getUsers();
    }
    else {
      return latestUsers;
    }
  }
}
