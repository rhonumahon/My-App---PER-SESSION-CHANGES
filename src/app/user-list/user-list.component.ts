import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../shared/models/user.model';
import { ApiService } from '../shared/services/api.service';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
// tslint:disable-next-line: no-trailing-whitespace
export class UserListComponent implements OnInit, OnDestroy {

  UserSubscription: Subscription;

  Users: User[] = [];

  is_loading: boolean = false;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
      this.is_loading = true;
      this.doTask();
  }

  addUser(){
    return this.router.navigate(['sampleApp/add']);
  }

  deletes(id: number){
    let successDelete = this.api.deleteUserById(id);
    if(successDelete){
      this.api.deleteUserUI(id);
    }
  }

  doTask(){
    return new Promise(resolve => {
      setTimeout(() => {
        this.api.getUsers().subscribe();
        this.UserSubscription = this.api.UsersUpdated.subscribe(
          (users: User[]) => {
            this.Users = users;
          }
        );
        this.is_loading = false;
        resolve('done');
      }, 2000);
    })
  }

  ngOnDestroy() {
    this.UserSubscription.unsubscribe();
  }
}
