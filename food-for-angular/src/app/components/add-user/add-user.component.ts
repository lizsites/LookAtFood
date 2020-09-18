import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { User } from 'src/app/models/user';
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  public username : string;
  public password : string;
  constructor(private register : RegisterService) {

   }

  ngOnInit(): void {
  }

  addUserFunc(){
    
    let u = new User();
    u.username = this.username;
    u.password = Md5.hashStr(this.password).toString().toUpperCase();
    u.id = null;
    console.log(u);
    this.register.register(u);
    this.register.register(u).subscribe((data) => {
      console.log(data);
      u = data;
    }, () => {
      console.log("No you goofed");
    })
  }

}
