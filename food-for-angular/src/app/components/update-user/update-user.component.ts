import { Component, OnInit, Input } from '@angular/core';
import { UpdateInfoService } from 'src/app/services/update-info.service';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { Preference } from 'src/app/models/preference';
import { Md5 } from 'ts-md5';
import { Router } from '@angular/router';


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
  //passedUsername : string;
  user : User;
  //@Input() username : string;

  constructor(private update : UpdateInfoService, private login : LoginService, private route : Router) { }

  ngOnInit(): void {
   //fill recipe form
   this.user = this.login.serviceUser;
   this.minCalories = this.user.preference.minCalories;
   this.maxCalories = this.user.preference.maxCalories;
   this.diet = this.user.preference.dietType;
  }

  updateUser(){
    let u : User = this.login.serviceUser;
    if(this.password != null && this.password != ""){
      u.password = Md5.hashStr(this.password).toString().toUpperCase();
    }
    u.preference = new Preference(u.preference.id,this.minCalories,this.maxCalories,this.diet);
    console.log("updated user being sent: "+ u);

    this.update.updateUserInfo(u).subscribe((data)=>{
      console.log("data returned: " + data);
      this.login.serviceUser = data;
      console.log("update user " + u)
      this.route.navigate(['search']);
      window.sessionStorage.setItem("user", u.username)}, () =>{
        console.log("error in the update user info");
      }

      )

  }
}
