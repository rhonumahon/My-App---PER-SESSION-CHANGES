import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
info: any[];
  constructor(private api:HttpService, private router: Router) {  }

  ngOnInit(): void {
   this.info= this.api.getUser();

  }
  deleteUser(data){
    this.info = this.api.deleteUser(data);
  }

  addUser(){
    this.router.navigate(['api/add'])
  }
  viewUser(){

  }

}
