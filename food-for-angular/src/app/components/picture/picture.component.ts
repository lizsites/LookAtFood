import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';
import {HttpEventType, HttpErrorResponse} from '@angular/common/http';
import {of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.css']
})
export class PictureComponent implements OnInit {
  // @ViewChild("fileUpload", {static: false}) 
  // fileUpload: ElementRef;files = [];
  uploader: FileUploader = new FileUploader({ url: "api/your_upload", removeAfterUpload: false, autoUpload: true });
  constructor(private uploadService: UploadService) { }

  ngOnInit(): void {
  }

//   uploadFile(file) {
//       const formData = new FormData();  
//       formData.append('file', file.data);  
//       file.inProgress = true;
//       this.uploadService.upload(formData).pipe(
//         map(event => {
//           switch (event.type) {
//             case HttpEventType.UploadProgress:
//               file.progress = Math.round(event.loaded * 100 / event.total);
//               break;
//             case HttpEventType.Response:
//               return event;
//           }  
//         }),  
//         catchError((error: HttpErrorResponse) => {
//           file.inProgress = false;
//           return of(`Upload failed: ${file.data.name}`);
//         })).subscribe((event: any) => {
//           if (typeof (event) === 'object') {
//             console.log(event.body);
//           }  
  
//         });  
//         onClick() {
//               const fileUpload = this.fileUpload.nativeElement;fileUpload.onchange = () => {
//               for (let index = 0; index < fileUpload.files.length; index++)
//               {
//                const file = fileUpload.files[index];
//                this.files.push({ data: file, inProgress: false, progress: 0});
//               }
//                 this.uploadFile();
//               };
//               fileUpload.click();
//           }
// }
}
