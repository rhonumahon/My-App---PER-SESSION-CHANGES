import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor() { }

  addUser(data){
    console.log(data);
      var users: any[] = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
      if (users.length > 0){
        data['id'] =  users[users.length - 1]['id'] + 1;
      }
      else{
        data ['id'] = 1;
      }
      console.log(data);
      users.push(data);
      localStorage.setItem('users', JSON.stringify(users));
      return users;
  }

getUser(){
  var users: any[] = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
  return users;
}

getFriends(id){
  var users: any[] = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
  var users: any[] = JSON.parse(localStorage.getItem('users'));
  var found = users.findIndex(item => item.id === Number(id));
  var values: any[] = Object.values(users[found].friends);
  return values;

}

deleteUser(data){
  var users: any[] = JSON.parse(localStorage.getItem('users'));
  users.splice(data, 1);
  localStorage.setItem('users', JSON.stringify(users));
  console.log('users delete:',users);
  return users;

}


updateUser(data,id){
  var users: any[] = JSON.parse(localStorage.getItem('users'))
  var found = users.findIndex(item => item.id === Number(id));
  var ids= parseInt(id);
  data['id'] = ids;
  users[found] = data;
  console.log(data);
  localStorage.setItem('users', JSON.stringify(users));
  return users;


  
}

deleteFriend(uid, fid){
  var users: any[] = JSON.parse(localStorage.getItem('users'));
  var users: any[] = users.filter(item => item.id === Number(uid));
  users[0]['friends'].splice(fid,1);
  localStorage.setItem('users', JSON.stringify(users));
  return users;
  
}
}
