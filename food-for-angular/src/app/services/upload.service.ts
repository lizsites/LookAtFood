import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpErrorResponse, HttpEventType} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor(private http : HttpClient) { }

  
public upload(formData) {
  return this.http.post("http://localhost:8089/food/upload", formData, {    
        reportProgress: true,
        observe: 'events'
      });
  }
}
