import { Component, OnInit, Input } from '@angular/core';
import { UpdateInfoService } from 'src/app/services/update-info.service';
import { User } from 'src/app/models/user';

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

  @Input() username : string;

  constructor(private update : UpdateInfoService) { }

  ngOnInit(): void {
  }
  viewUser(){

  }

  updateUser(){
    let u : User= new User();
    u.username = this.username;
    u.password = this.password;
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
