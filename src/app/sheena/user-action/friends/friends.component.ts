import { Route } from '@angular/compiler/src/core';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css'],
})
export class FriendsComponent implements OnInit {
  @Input() currentTab;
  @Output() sendFriends = new EventEmitter<any>();
  firstName: string;
  lastName: string;
  trueFriends: any[];
  falseFriends: any[];
  allFriends: any[];
  @Input() friends: any[] = [];
  id: any;
  location: any;
  search: string;
  info: any[] = [];
  result: any[];
  constructor(private api: HttpService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const url = this.route.snapshot;
    this.id = url.params.id;
    this.location = this.id ? url.url[2].path : url.url[1].path;

    if (this.location == 'edit') {
      this.getFriends();
    } else {
      this.categorize();
    }
  }

  //input value
  inputValue(name, event) {
    this[`${name}Name`] = event.target.value.toLowerCase();
  }

  findValue(event) {
    var val = event.target.value;
    this.search = val.toLowerCase()
    return this.search;
  }


  find() {
    /*
    if (this.currentTab == 'all') {
      this.result = this.friends.filter((item) => item.firstName === this.search || item.lastName === this.search );
      if(this.result.length == 0){
        alert('Not found');
      };
    } else if (!this.currentTab) {
      this.result = this.friends.filter((item) => item.firstName === this.search && item.isActive === this.currentTab 
      || item.lastName === this.search && item.isActive === this.currentTab);
      if(this.result.length == 0){
        alert('Not found');
      };
      
    } else if (this.currentTab) {
      this.result = this.friends.filter((item) => item.firstName === this.search && item.isActive === this.currentTab
      || item.lastName === this.search && item.isActive === this.currentTab);
      if(this.result.length == 0){
        alert('Not found');
      };
    }*/

    this.currentTab || !this.currentTab ? this.result = this.friends.filter((item) => item.firstName === this.search && item.isActive === this.currentTab
    || item.lastName === this.search && item.isActive === this.currentTab) : ''
    this.currentTab == 'all' ? this.result = this.friends.filter((item) => item.firstName === this.search || item.lastName === this.search ) : null;
    
  }

  //adds a friend
  addFriend() {
    if(this.location == 'edit'){
    var users: any[] = JSON.parse(localStorage.getItem('users'));
    var found = users.findIndex(item => item.id === Number(this.id));
    var id = users[found].friends.length; 

  var users: any[] = users.filter(item => item.id === Number(this.id));
    
    this.friends.push({
      firstName: this.firstName,
      lastName: this.lastName,
      isActive: this.currentTab,
      id: id
    });
    this.sendFriends.emit(this.friends);
    this.categorize();
  }else{
    this.friends.push({
      firstName: this.firstName,
      lastName: this.lastName,
      isActive: this.currentTab,
      id: id
    });
    console.log(this.friends);
    this.sendFriends.emit(this.friends);
    this.categorize();
  }
  }

  //categorize on init
  categorize() {
    this[`${this.currentTab}Friends`] = this.friends.filter(
      (item) => item.isActive === this.currentTab
    );

    if (this.currentTab == 'all') {
      this.allFriends = this.friends;
    }
  }
  deleteFriend(index) {
    console.log('id',index, this.id);
    this.api.deleteFriend(this.id, index);
    this.getFriends();
    this.categorize();

  }

  getFriends() {
    this.info = this.api.getFriends(this.id);
    this.friends = this.info;
    this.allFriends = this.friends;
    this.categorize();
  }
}
