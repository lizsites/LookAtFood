import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest, HttpEvent, HttpErrorResponse, HttpEventType, HttpHeaders} from '@angular/common/http';
import { Observable } from  'rxjs';
import { User } from '../models/user';

// used for seeing upload process?

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private baseUrl = 'http://ec2-18-218-228-24.us-east-2.compute.amazonaws.com:8090/food';

  constructor(private http : HttpClient) { }

  
public upload(file: File): Observable<HttpEvent<any>> {
  const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('PUT', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json',
      //withCredentials: true,
      headers : new HttpHeaders({
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': '*',
        },
        ),
    });

    return this.http.request(req);
      
    }

    
    getFiles(): Observable<any> {
      return this.http.get(`${this.baseUrl}/files`);
    }

    getCustomerImages(user : User): Observable<File> {
      let jsonUser : string = JSON.stringify(user);
      return this.http.post(`${this.baseUrl}/download`, jsonUser, {
        headers : {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        responseType: "blob" 
        }) as Observable<any>;
    }
  }
