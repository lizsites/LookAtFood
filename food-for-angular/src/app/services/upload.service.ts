import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest, HttpEvent, HttpErrorResponse, HttpEventType, HttpHeaders} from '@angular/common/http';
import { Observable } from  'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private baseUrl = 'http://localhost:8090/food';

  constructor(private http : HttpClient, private loginService: LoginService) { }
  
  
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
        }),
    });

    return this.http.request(req) as Observable<HttpEvent<any>>;
    }

    // gets called when the user clicks on view images button to get the image from the back end
    getFiles(): Observable<any> {
      return this.http.get(`${this.baseUrl}/`);
    }
  }
