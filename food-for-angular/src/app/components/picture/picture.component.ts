import { Component, OnInit} from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';
import { FormBuilder, FormGroup } from  '@angular/forms';
import { User } from 'src/app/models/user';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PictureDTO } from 'src/app/models/picture-dto';
import { LoginService } from 'src/app/services/login.service';
import { ImageToShow } from 'src/app/models/image-to-show';
import { POINT_CONVERSION_UNCOMPRESSED } from 'constants';

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
  imageToShow: string | ArrayBuffer;

  constructor(private uploadService: UploadService, private login : LoginService) { }
  ngOnInit(): void {
     //this.fileInfos = this.uploadService.getFiles();
    //  this.getCustomerImages();
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

  dowload() {
    
  }

  upload() {
    this.progress = 0;
  
    this.currentFile = this.selectedFiles.item(0);
    let pictureDTO = new PictureDTO();
    pictureDTO.picture = this.selectedFiles.item(0);
    pictureDTO.username = this.login.serviceUser.username;
    this.uploadService.upload(pictureDTO).subscribe(
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
    let pictureDTO = new PictureDTO();
    pictureDTO.username = this.login.serviceUser.username;
    this.getCustomerImagesSubscription = this.uploadService.getCustomerImages(pictureDTO).subscribe(
      data => {
        // this.createImageFromBlob(data);
        // this.isImageLoading = false;
        console.log(typeof data);
        console.log(typeof this.login.serviceUser.pictures[0].picture);
        console.log(this.login.serviceUser.pictures[0].picture);

      //   const reader = new FileReader();
      // reader.onload = (e) => this.imageToShow = e.target.result;
      // reader.readAsDataURL(new Blob([data]));
        //get string out of object 

        let image = new Image();

        
        image.src="data:image/jpeg;base64,"+this.login.serviceUser.pictures[this.login.serviceUser.pictures.length -1].picture;
        let w= window.open("");
        w.document.write(image.outerHTML);
      },
      error => {
        this.isImageLoading = false;
      });
  }

  // createImageFromBlob(image: string) {
  //   let reader = new FileReader();
 
  //   reader.addEventListener("load",
  //     () => {
  //       // reader.onload = (e) => this.imageToShow = e.target.result;
  //       // reader.readAsDataURL(this.imageToShow);
  //       window.open(image);
  //     }
  //   //     console.log(typeof reader.result);
  //   //     console.log("this is the reader" +reader.result);
  //   //       this.imageToShow.photo = reader.result;
  //   //   },
  //   //   false);

  //   // if (image) {
  //   //   if (image.type !== "application/pdf")
  //   //     reader.readAsDataURL(image);
  //   // }
  
 
  
  toUTF8Array(str :string){
      let utf8 = [];
      for (let i=0; i < str.length; i++) {
          let charcode = str.charCodeAt(i);
          if (charcode < 0x80) utf8.push(charcode);
          else if (charcode < 0x800) {
              utf8.push(0xc0 | (charcode >> 6), 
                        0x80 | (charcode & 0x3f));
          }
          else if (charcode < 0xd800 || charcode >= 0xe000) {
              utf8.push(0xe0 | (charcode >> 12), 
                        0x80 | ((charcode>>6) & 0x3f), 
                        0x80 | (charcode & 0x3f));
          }
          // surrogate pair
          else {
              i++;
              // UTF-16 encodes 0x10000-0x10FFFF by
              // subtracting 0x10000 and splitting the
              // 20 bits of 0x0-0xFFFFF into two halves
              charcode = 0x10000 + (((charcode & 0x3ff)<<10)
                        | (str.charCodeAt(i) & 0x3ff));
              utf8.push(0xf0 | (charcode >>18), 
                        0x80 | ((charcode>>12) & 0x3f), 
                        0x80 | ((charcode>>6) & 0x3f), 
                        0x80 | (charcode & 0x3f));
          }
      }
      return utf8;
  }
}