import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from "@angular/forms";

import { UpdateUserComponent } from './components/update-user/update-user.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { LogoutComponent } from './components/logout/logout.component';
import { SearchApiComponent } from './components/search-api/search-api.component';
import { HomeComponent } from './components/home/home.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UpdateUserComponent,
    AddUserComponent,
    LogoutComponent,
    SearchApiComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }