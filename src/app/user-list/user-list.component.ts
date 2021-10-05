import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
data: any[];
  constructor(private api: ApiService, private router: Router) { 
    this.data = this.api.getUser();
    console.log(this.data);
    
  }

  ngOnInit(): void {
  }

  addUser(){
    this.router.navigate(['myApp/add']);
  }

  deleteUser(index){
    this.data.splice(index, 1);
  }

}
