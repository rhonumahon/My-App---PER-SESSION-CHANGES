import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  deleteUser(id: any){
    //will delete user
  }

  createUser(data: any[]){

  }

  updateUser(id: any, data: any[]){

  }

  getUser(){
    return [
      {   id: 11111,
          firstName: "Tony",
          lastName: "Stark",
          address: "New York",
          contact: "8673653083",
          friends : [
        { 
           id: 1,
           firstName: "Bruce",
           lastName: "Banner",
           isActive: true
        },
      { 
           id: 2,
           firstName: "Peter",
           lastName: "Parker",
           isActive: true
        },
      { 
           id: 3,
           firstName: "Wanda",
           lastName: "Maximoff",
           isActive: true
        },
      { 
           id: 4,
           firstName: "James Rupert",
           lastName: "Rhodes",
           isActive: false
        },
      { 
           id: 5,
           firstName: "Steven",
           lastName: "Strange",
           isActive: false
        }
        ]
      },
      {   id: 22222,
          firstName: "Steve",
          lastName: "Rogers",
          address: "Germany",
          contact: "8673655555",
          friends : [
        { 
           id: 6,
           firstName: "James Buchanan",
           lastName: "Barnes",
           isActive: true
        },
      { 
          id: 7,
           firstName: "Clinton Francis",
           lastName: "Barton",
           isActive: true
        },
      { 
          id: 8,
           firstName: "Natasha Alianovna",
           lastName: "Romanoff",
           isActive: true
        },
      { 
          id: 9,
           firstName: "Samuel Thomas",
           lastName: "Wilson",
          isActive: false
        },
      { 
          id: 10,
           firstName: "Dr. Henry Jonathan",
           lastName: "Pym",
          isActive: false
        }
        ]
      }
      ]
  }
}
