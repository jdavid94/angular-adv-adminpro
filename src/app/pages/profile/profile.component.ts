import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  
  public profileForm: any;
  public user?: any;
  public uploadedPhoto?: File;
  public imgTemp: any = null;
  
  constructor(private fb: FormBuilder, private userService: UserService, private fileUploadService: FileUploadService) { 
    this.user = userService.user;
  }


  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: [this.user?.name || 'Error', [Validators.required]],
      email: [this.user?.email || 'Error', [Validators.required, Validators.email]],
    })
  }

  updateProfile() {
    //console.log(this.profileForm?.value);
    this.userService.updateUser(this.profileForm.value)
    .subscribe( resp => {
      const {name, email} = this.profileForm.value;
        this.user.name = name;
        this.user.email = email;
        Swal.fire('Saved', 'Profile Updated', 'success')
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error')    
    })
  }

  changeImage(event:any) {
    //console.log(event.target.files[0]);
    this.uploadedPhoto = event.target.files[0];
    if (!this.uploadedPhoto) {
      this.imgTemp = null;
    }
    const reader = new FileReader();
    //const url64 = reader.readAsDataURL(this.uploadedPhoto);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  uploadImage() {
    if (this.uploadedPhoto) {
      this.fileUploadService.updatePhoto(this.uploadedPhoto, 'users', this.user.uid)
      .then(img => {
        this.user.img = img
        Swal.fire('Saved', 'Image Updated', 'success')
      });      
    }else{
      Swal.fire('Error', 'Not File Error', 'error')
      console.log('Not File Error');
    }      
    }

}
