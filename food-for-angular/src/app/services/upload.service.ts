import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest, HttpEvent, HttpErrorResponse, HttpEventType, HttpHeaders} from '@angular/common/http';
import { Observable } from  'rxjs';

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

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json',
      withCredentials: true,
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
  }
