import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Friends } from 'src/app/shared/models/friends.model';
import { User } from 'src/app/shared/models/user.model';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css'],
})
export class FriendsComponent implements OnInit {
  @Input() value: string;
  @Input() location: string;
  @Input() activeTab: any; // take note of the current tab
  @Output() sendFriend = new EventEmitter<any>();

  @ViewChild('firstName') elFirst: ElementRef;
  @ViewChild('lastName') elLast: ElementRef;

  urlId: number;
  newValue: any;
  firstName: string;
  lastName: string;
  userFriendId: number;
  activeList: any[];
  inactiveList: any[];
  allList: any[];
  activeDisplay: any[];
  inactiveDisplay: any[];
  allDisplay: any[];
  friends: Friends[] = [];

  isFiltered: boolean = false;
  isEditFriendMode = false;
  filteredBy: any;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    if (this.value === 'active') {
      this.newValue = 'active';
    } else if (this.value === 'inactive') {
      this.newValue = 'inactive';
    } else {
      this.newValue = 'all';
    }

    setTimeout(() => {
      this.activeDisplay = this.activeList;
      this.inactiveDisplay = this.inactiveList;
      this.allDisplay = this.allList;
    }, 1000);
    const url = this.route.snapshot;
    this.urlId = url.params.id;

    /*
        if localStorage length not empty, then user friends will be taken from
        the localStorage. if empty, it will be taken from the data that was returned
        by the HTTP (API) request.

        There is a function to clear the localStorage everytime it changes the
        location (located in the user component)
    */
    if (localStorage.getItem('allList')) {
      this.activeList = JSON.parse(localStorage.getItem('activeList'));
      this.inactiveList = JSON.parse(localStorage.getItem('inactiveList'));
      this.allList = JSON.parse(localStorage.getItem('allList'));
      this.activeDisplay = this.activeList;
      this.inactiveDisplay = this.inactiveList;
      this.allDisplay = this.allList;
    } else {
      this.getCurrentFriendsOfUser(this.urlId);
    }
  }

  inputFriend(name, event) {
    this[`${name}Name`] = event.target.value;
  }

  addFriend() {
    const firstNameInput = this.firstName;
    const lastNameInput = this.lastName;
    let isActiveSet;
    let currentLocalStorage: Friends[];

    //check active tab and assign active or inactive friend
    if (this.activeTab === 'active') {
      isActiveSet = 'Y';
    } else {
      isActiveSet = 'N';
    }

    /**
     *  Check if friend is in EditMode.
     *  if not in edit mode, friend should just add normally
     *  if in editmode, friend's firstName and lastName must be taken
     *  from the DOM element
     */
    if (!this.isEditFriendMode) {
      /**
       *  Check if localStorage contains key 'allList'
       *  if contains, get the existing list and append to that list
       *  if not contains, friends will be pushed initially then will just be set
       *  in the localStorage in categorizedFriends() function
       */
      if (localStorage.getItem('allList')) {
        currentLocalStorage = JSON.parse(localStorage.getItem('allList'));
        currentLocalStorage.push({
          firstName: firstNameInput,
          lastName: lastNameInput,
          isActive: isActiveSet,
        });
        this.friends = currentLocalStorage;
        this.categorizedFriends();
      } else {
        this.friends.push({
          firstName: firstNameInput,
          lastName: lastNameInput,
          isActive: isActiveSet,
        });
        this.categorizedFriends();
      }

    } else {
      this.isEditFriendMode = false;
      let currentFriends: Friends[] = [];
      currentFriends = JSON.parse(localStorage.getItem('allList'));
      let indexInArray: number = currentFriends.findIndex(
        (value) => value.userId === this.userFriendId
      );
      currentFriends[indexInArray].firstName = this.elFirst.nativeElement.value;
      currentFriends[indexInArray].lastName = this.elLast.nativeElement.value;
      this.friends = currentFriends;
      this.categorizedFriends();  // need to call categorizeFriends() function to display changes
    }
    this.elFirst.nativeElement.value = '';  // after adding/editing, set DOM element to ''
    this.elLast.nativeElement.value = '';
    this.sendFriend.emit(this.friends);
  }

  searchFriend(event) {
    if (this.filteredBy === 'first') {
      this[`${this.value}List`] = this[`${this.value}List`].filter((item) => {
        const firstName = `${item.firstName}`;
        if (
          firstName.toLowerCase().includes(event.target.value.toLowerCase())
        ) {
          return item;
        }
      });
    } else if (this.filteredBy === 'last') {
      this[`${this.value}List`] = this[`${this.value}List`].filter((item) => {
        const lastName = `${item.lastName}`;
        if (lastName.toLowerCase().includes(event.target.value.toLowerCase())) {
          return item;
        }
      });
    } else {
      this[`${this.value}List`] = this[`${this.value}List`].filter((item) => {
        const fullName = `${item.firstName} ${item.lastName}`;
        if (fullName.toLowerCase().includes(event.target.value.toLowerCase())) {
          return item;
        }
      });
    }
    // tslint:disable-next-line: align
    if (event.target.value === '') {
      this[`${this.value}List`] = this[`${this.value}Display`];
    }
  }

  getCurrentFriendsOfUser(id: number) {
    this.api.getUserById(id).subscribe((user: User) => {
      this.friends = user.friends;
      this.categorizedFriends();
    });
  }

  categorizedFriends() {
    this.activeList = this.friends.filter((user) => {
      return user.isActive === 'Y';
    });
    localStorage.setItem('activeList', JSON.stringify(this.activeList));
    this.inactiveList = this.friends.filter((user) => {
      return user.isActive === 'N';
    });
    localStorage.setItem('inactiveList', JSON.stringify(this.inactiveList));
    this.allList = this.friends;
    localStorage.setItem('allList', JSON.stringify(this.allList));
  }

  filter(filterByName) {
    if (filterByName != 'none') {
      this.isFiltered = true;
      this.filteredBy = filterByName;
    } else {
      this.isFiltered = false;
    }
  }

  editFriend(userId: number) {
    this.isEditFriendMode = true;
    this.userFriendId = userId;
    let currentFriends: Friends[] = [];
    currentFriends = JSON.parse(localStorage.getItem('allList'));
    let indexInArray: number = currentFriends.findIndex(
      (value) => value.userId === userId
    );
    this.elFirst.nativeElement.value = currentFriends[indexInArray].firstName;
    this.elLast.nativeElement.value = currentFriends[indexInArray].lastName;
  }

  deleteFriend(userId: number) {
    let currentFriends: Friends[] = JSON.parse(localStorage.getItem('allList'));
    let indexInArray: number = currentFriends.findIndex(
      (value) => value.userId === userId
    );
    currentFriends.splice(indexInArray, 1);
    this.friends = currentFriends;
    this.categorizedFriends();
    this.sendFriend.emit(this.friends);
  }
}
