import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Friends } from '../shared/models/friends.model';
import { User } from '../shared/models/user.model';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit, OnDestroy {
  id: string;
  location: string;
  activeTab: any = 'active';
  friends: Friends[] = [];
  form: FormGroup;
  firstName = new FormControl('', Validators.compose([Validators.required]));
  lastName = new FormControl('', Validators.compose([Validators.required]));
  address = new FormControl('', Validators.compose([Validators.required]));
  contact = new FormControl('', Validators.compose([Validators.required]));

  APISubscription: Subscription;

  // tslint:disable-next-line: max-line-length
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public formBuilder: FormBuilder,
    public toastr: ToastrService,
    private api: ApiService
  ) {
    this.form = this.createForm(formBuilder);

    const url = this.route.snapshot;
    this.id = url.params.id;
    this.location = this.id ? url.url[2].path : url.url[1].path;
  }

  ngOnInit(): void {
    if(this.location === 'add') {
      this.clearLocalStorage();
    } else {
      this.openUser(this.location, this.id);
      this.clearLocalStorage();
    }
  }

  clearLocalStorage() {
    localStorage.removeItem('activeList');
    localStorage.removeItem('inactiveList');
    localStorage.removeItem('allList');
  }

  openUser(loc, id) {
    let SingleUser: User;
    this.api.getUserById(id).subscribe((user: User) => {
      SingleUser = user;
      if (loc === 'view' && id) {
        // tslint:disable-next-line: max-line-length
        this.form.patchValue({
          firstName: SingleUser.firstName,
          lastName: SingleUser.lastName,
          address: SingleUser.address,
          contact: SingleUser.contact,
        });
        this.form.disable();
        this.friends = SingleUser.friends;
      } else if (loc === 'edit' && id) {
        // tslint:disable-next-line: max-line-length
        this.form.patchValue({
          firstName: SingleUser.firstName,
          lastName: SingleUser.lastName,
          address: SingleUser.address,
          contact: SingleUser.contact,
        });
        this.friends = SingleUser.friends;
      }
    });
  }

  createForm(formBuilder: FormBuilder) {
    return formBuilder.group({
      firstName: this.firstName,
      lastName: this.lastName,
      address: this.address,
      contact: this.contact,
    });
  }

  back() {
    this.router.navigate(['/sampleApp']);
  }

  tab(event) {
    this.activeTab = event;
  }

  submit() {
    const { ...formValue } = this.form.value;
    const friends = this.friends;
    const result = { ...formValue, friends };

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation');

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        'submit',
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add('was-validated');
        },
        false
      );
    });

    if (this.location === 'add' && this.form.valid) {
      // call api to add user
      let successDataAddNewUser = this.api.addNewUser(result);
      console.log('Result: ', result);
      if (successDataAddNewUser != null && successDataAddNewUser != undefined) {
        this.APISubscription = this.api.UsersAdded.subscribe((data: User) => {
          this.api.addFriendToUser(data.id,friends);
        });
        alert('Data successfully added. Will now redirect to main window.');
        this.router.navigate(['/sampleApp']);
      }
    } else if (this.location === 'edit' && this.form.valid) {
      console.log('Result: ', result);
      let successUpdateUser = this.api.updateUserById(
        parseInt(this.id),
        result
      );
      if (successUpdateUser != null && successUpdateUser != undefined) {
        this.api.addFriendToExistingUser(parseInt(this.id), friends);
        alert('Data successfully updated. Redirecting to main window.');
        this.router.navigate(['/sampleApp']);
      }
    }
    ('use strict');
  }

  receiveFriend(event) {
    this.friends = event;
  }

  ngOnDestroy() {}
}
