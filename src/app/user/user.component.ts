import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  id: any;
  location: any;

  constructor(private route: ActivatedRoute, private router: Router) { 
    const url = this.route.snapshot;
    this.id = url.params.id;
    this.location = this.id ? url.url[2].path : url.url[1].path;
  }

  ngOnInit(): void {
  }

  back(){
    this.router.navigate(['myApp'])
  }

  submit() {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
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
  }

}
