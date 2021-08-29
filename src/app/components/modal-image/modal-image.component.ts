import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [
  ]
})
export class ModalImageComponent implements OnInit {

  public uploadedPhoto?: File;
  public imgTemp: any = null;

  constructor(public modalService: ModalImageService, public fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.imgTemp = null;
    this.modalService.closeModal();
  }

 
  changeImage(event: any): any {
    //console.log(event.target.files[0]);
    this.uploadedPhoto = event.target.files[0];
    if (!this.uploadedPhoto) {
      return this.imgTemp = null;
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.uploadedPhoto);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  uploadImage() {
    const id = this.modalService.id;
    const type = this.modalService.type;
    if (type && id) {
      if (this.uploadedPhoto) {
        this.fileUploadService.updatePhoto(this.uploadedPhoto, type, id)
          .then(img => {
             Swal.fire('Saved', 'Image Updated', 'success')
             this.modalService.newImg.emit(img);
             this.closeModal();
          });
      } else {
        Swal.fire('Error', 'Not File Error', 'error')
        console.log('Not File Error');
      }      
    }
  }

}
