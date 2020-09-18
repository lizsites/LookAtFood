import { Component, OnInit, Input } from '@angular/core';
import { UpdateInfoService } from 'src/app/services/update-info.service';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  
  password : string;
  diet : string;
  minCalories : number;
  maxCalories : number;
  passedUsername : string;
  user : User;
  @Input() username : string;

  constructor(private update : UpdateInfoService, private login : LoginService) { }

  ngOnInit(): void {
    
  }
  viewUser(){
    /*
    When you come to the update-user component, you should be able to test 
    if the serviceUser field is working correctly by pressing the "view user "
    button.

    It should print the user info of the user who logged in.

    Temporarily, this is available while update-user and login components are on
    the same page, because I do not know how to make a navbar yet.
    */

    this.user = this.login.serviceUser;
    console.log(this.user);
  }

  updateUser(){
    let u : User= new User();
    u.username = this.username;
    u.password = Md5.hashStr(this.password).toString().toUpperCase();
    u.diet = this.diet;
    u.minCalories = this.minCalories;
    u.maxCalories = this.maxCalories;
    console.log(u);
    this.update.updateUserInfo(u);
    this.update.updateUserInfo(u).subscribe((data)=>{
      console.log(data);
      u = data;
      window.sessionStorage.setItem("user", u.username)}, () =>{
        console.log("error in the update user info");
      }
      )

  }
}
