import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest, HttpEvent, HttpErrorResponse, HttpEventType, HttpHeaders} from '@angular/common/http';
import { Observable } from  'rxjs';

import { User } from '../models/user';
import { PictureDTO } from '../models/picture-dto';
import { formattedError } from '@angular/compiler';
import { formatDate } from '@angular/common';


// used for seeing upload process?

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private baseUrl = 'http://ec2-18-218-228-24.us-east-2.compute.amazonaws.com:8090/food';

  constructor(private http : HttpClient) { }

  
public upload(pictureDTO : PictureDTO): Observable<HttpEvent<any>> {
  const formData: FormData = new FormData();

    formData.append('file', pictureDTO.picture);
    formData.append('username', pictureDTO.username);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json',
      //withCredentials: true,
      headers : new HttpHeaders({
        'Access-Control-Allow-Headers': 'Content-Type',
        //'Access-Control-Allow-Origin': '*',
        },
        ),
    });

    return this.http.request(req);
      
    }

    
    getFiles(): Observable<any> {
      return this.http.get(`${this.baseUrl}/files`);
    }

    getCustomerImages(pictureDTO : PictureDTO): Observable<File> {
     let username = pictureDTO.username;
      return this.http.post(`${this.baseUrl}/download`, username, {
        headers : {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        responseType: "blob" 
        }) as Observable<any>;
    }
  }
