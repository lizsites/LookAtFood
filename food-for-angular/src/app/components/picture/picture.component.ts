import { Component, OnInit} from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';
import { FormBuilder, FormGroup } from  '@angular/forms';
import { User } from 'src/app/models/user';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.css']
})
export class PictureComponent implements OnInit {
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';

  user : User;
  //change this to get userId

  fileInfos: Observable<any>;
  isImageLoading: boolean;
  getCustomerImagesSubscription: any;
  getCustomerService: any;
  imageToShow: any;

  constructor(private uploadService: UploadService) { }
  ngOnInit(): void {
     //this.fileInfos = this.uploadService.getFiles();
  }

  url;
	msg = "";
	
	selectFile(event) {
    this.selectedFiles = event.target.files;
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.msg = "";
			this.url = reader.result; 
		}
	}

  upload(): void {
    this.progress = 0;
  
    this.currentFile = this.selectedFiles.item(0);
    this.uploadService.upload(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          // this.fileInfos = this.uploadService.getFiles();
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      });
    this.selectedFiles = undefined;
  }

  getCustomerImages() {
    this.isImageLoading = true;
    this.getCustomerImagesSubscription = this.getCustomerService.getCustomerImages(this.refNo).subscribe(
      data => {
        this.createImageFromBlob(data);
        this.isImageLoading = false;
      },
      error => {
        this.isImageLoading = false;
      });
  }
  refNo(refNo: any) {
    throw new Error("Method not implemented.");
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load",
      () => {
          this.imageToShow.photo = reader.result;
      },
      false);

    if (image) {
      if (image.type !== "application/pdf")
        reader.readAsDataURL(image);
    }
  }


}