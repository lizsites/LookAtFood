import { Component, OnInit, Input } from '@angular/core';
import { UpdateInfoService } from 'src/app/services/update-info.service';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { Preference } from 'src/app/models/preference';
import { Md5 } from 'ts-md5';


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
   this.password = this.login.serviceUser.password;
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

    let u : User = this.login.serviceUser;
    u.password = Md5.hashStr(this.password).toString().toUpperCase();
    u.preference = new Preference(u.preference.id,this.minCalories,this.maxCalories,this.diet);
    console.log(u);
    this.update.updateUserInfo(u).subscribe((data)=>{
      console.log("data returned " + data);
      this.login.serviceUser = data;
      window.sessionStorage.setItem("user", u.username)}, () =>{
        console.log("error in the update user info");
      }
      )

  }
}
