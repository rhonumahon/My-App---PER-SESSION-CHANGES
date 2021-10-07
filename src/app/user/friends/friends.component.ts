import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  @Input() currentTab;
  @Output() sendFriends = new EventEmitter<any>();

  firstName: string;
  lastName: string;
  @Input() friends: any[] = [];

  trueFriends: any[];
  falseFriends: any[];
  constructor() { }

  ngOnInit(): void {
    this.categorizedFriends();

  }

  inputFriend(name, event) {
    // if(name === 'first'){
    //   this.firstName = event.target.value;
    // } else if( name === 'last'){
    //   this.lastName = event.target.value;
    // }

    this[`${name}Name`] = event.target.value;
  }

  addFriend() {
    this.friends.push({ firstName: this.firstName, lastName: this.lastName, isActive: this.currentTab });
    this.sendFriends.emit(this.friends);
    this.categorizedFriends();

  }

  categorizedFriends() {
    // this.activeFriends = this.friends.filter(item => item.isActive === true);
    // this.inactiveFriends = this.friends.filter(item => item.isActive === false);

    this[`${this.currentTab}Friends`] = this.friends.filter(item => item.isActive === this.currentTab);
  }

}
