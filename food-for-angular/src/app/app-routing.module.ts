import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { HomeComponent } from './components/home/home.component';
import { SearchApiComponent } from './components/search-api/search-api.component';
import { LogoutComponent } from './components/logout/logout.component';

const routes: Routes = [
  {
    path : "",
    component : LoginComponent
  },
  {
    path : "register",
    component : AddUserComponent
  },
  {
    path : "updateInfo",
    component : UpdateUserComponent
  },
  {
    path : "home",
    component : HomeComponent
  },
  {
    path : "search",
    component : SearchApiComponent
  },
  {
    path : "logout",
    component : LogoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
