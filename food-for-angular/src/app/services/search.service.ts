import { Injectable } from '@angular/core';
import { Preference } from '../models/preference';
import { Recipe } from '../models/recipe';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  

  constructor(private http : HttpClient) { }

  initiateUserSearch(preference : Preference) : Observable<Recipe> {
    return this.http.get("http://localhost:8080/JenkinsRepo/update/", {

      headers : {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      },
      withCredentials : true,
      responseType : "json"
    }) as Observable<Recipe>;
  }

}
