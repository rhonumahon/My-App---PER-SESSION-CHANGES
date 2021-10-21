import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';
import { Friends } from '../models/friends.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private EndpointAPIURL: string;
  UsersUpdated = new Subject<User[]>();
  UsersAdded = new Subject<User>();

  Users: User[] = [];

  private httpOptions : any = {
    headers: new HttpHeaders({
      'Accept': 'text/html, application/xhtml+xml, */*',
      'Content-Type': 'text/plain; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) {
    this.EndpointAPIURL = environment.endpointsurl;
  }

  getUsers() {
    return this.http.get<User[]>(this.EndpointAPIURL + '/GetAllUsers/').pipe(
      map((values) => {
        return values.map((users) => {
          return {
            ...users,
          };
        });
      }),
      tap((users) => {
        this.setUsers(users);
      })
    );
  }

  getUserById(id: number) {
    return this.http.get<User>(this.EndpointAPIURL + '/GetUserById/' + id);
  }

  getLatestUsers() {
    return this.Users.slice();
  }

  addNewUser(user: User) {
    const body: User = {
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      contact: user.contact,
    };
    return this.http
      .post(this.EndpointAPIURL + '/AddNewUser/', body)
      .subscribe((data: User) => {
        this.UsersAdded.next(data);
      });
  }

  addFriendToUser(id: number, friends: Friends[]) {
    const body: Friends[] = [...friends];
    return this.http
      .post(this.EndpointAPIURL + '/AddFriendToUser/' + id, body,
      { headers: this.httpOptions, responseType: 'text' as 'json'})
      .subscribe((data: any) => {});
  }

  deleteUserById(id: number) {
    return this.http
      .delete(this.EndpointAPIURL + '/DeleteUserById/' + id,
      )
      .subscribe((data) => {
        alert(data);
      });
  }

  updateUserById(id: number, user: User) {
    const body: User = {
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      contact: user.contact,
    };
    return this.http
      .put<User>(this.EndpointAPIURL + '/UpdateUserById/' + id, body,
      { headers: this.httpOptions, responseType: 'text' as 'json'})
      .subscribe((data: any) => {
      });
  }

  addFriendToExistingUser(id: number, friends: Friends[]) {
    const body: Friends[] = friends;
    return this.http
      .put<Friends>(
        this.EndpointAPIURL + '/AddFriendToExistingUser/' + id,
        body,
        { headers: this.httpOptions, responseType: 'text' as 'json'}
      )
      .subscribe((data) => {
      });
  }

  deleteUserUI(id: number) {
    let indexInArray = this.Users.findIndex((value) => value.id === id);
    this.Users.splice(indexInArray, 1);
    this.UsersUpdated.next(this.Users.slice());
  }

  setUsers(users: User[]) {
    this.Users = users;
    this.UsersUpdated.next(this.Users.slice());
  }
}
