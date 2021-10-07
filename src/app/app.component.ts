import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'myApp';
  data = [
    {
      title: 'Foundation',
      id: 1
    },
    {
      title: 'Advanced',
      id: 2
    },
    {
      title: 'Leading',
      id: 3
    }
  ]


  getId(event){
    console.log('clicked');
    console.log(event.target.value);
    
  }
  
}
