import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-user-action',
  templateUrl: './user-action.component.html',
  styleUrls: ['./user-action.component.css']
})
export class UserActionComponent implements OnInit {
id: any;
url: any;
location: string;
form: FormGroup;
firstName = new FormControl('', Validators.compose([Validators.required, Validators.minLength(2),Validators.maxLength(10)]));
lastName = new FormControl('', Validators.compose([Validators.required]));
address = new FormControl('', Validators.compose([Validators.required]));
contact = new FormControl('', Validators.compose([Validators.required]));
EmployeeId: number;
FirstName: string;
LastName: string;
Contact: string;
Address: string;
newUpdate : any;

activeTab: boolean = true;
inActiveTab: boolean = true;
allTab: boolean = true;
all: any;
friends: any[] =[];



  constructor(private router: Router, private route:ActivatedRoute, public formBuilder: FormBuilder,
              private api: HttpService , public location2: Location) { 
  this.form = this.createForm(formBuilder);
  this.url = this.route.snapshot;
  this.id = this.url.params.id;
  this.location =  this.id ? this.url.url[2].path : this.url.url[1].path;
  console.log(this.location);

    
  }
  createForm(formBuilder: FormBuilder){
    return formBuilder.group({
      firstName: this.firstName,
      lastName: this.lastName,
      address: this.address,
      contact: this.contact,

    })
  }
  
back(){
  this.location2.back();
//this.router.navigate(['api/Users'])
}

  ngOnInit(): void {
 this.viewUser(this.location, this.id);
  }

tab(value){
  this.activeTab = value;
  this.inActiveTab = value;
  this.allTab = true;
}

allTabs(value){
  this.allTab = value;
  this.activeTab = false;
  this.inActiveTab = true;
  this.all = 'all';

}
collectData(event){
  this.friends = event;
}

  viewUser(loc, id){
    const data = this.api.getUser().find(item => item.id === Number(id));
    if(loc === 'view' && id){
      this.form.patchValue({
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        contact: data.contact,
      });
      this.form.disable();
  }else if(loc === 'edit' && id){
    this.form.patchValue({
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      contact: data.contact,
      uid : this.id
    });
  }
  }

  save(){

    const {...etc} = this.form.value;
    const friends = this.friends;
    const result = {...etc, friends};
    if(this.form.valid){
      this.api.updateUser(result, this.id);
    }
    alert("Successfully Updated")
  }


submit(){
  'use strict'
  var forms = document.querySelectorAll('.needs-validation')
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
    const {...etc} = this.form.value;
    const friends = this.friends;
    const result = {...etc,friends};
    if(this.form.valid){
      this.api.addUser(result);
    }
    alert("Successfully Added")
  this.location2.back();
}
}
