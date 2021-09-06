import { Component, OnDestroy, OnInit } from '@angular/core';
import { Doctor } from 'src/app/models/doctor.model';
import { SearchService } from 'src/app/services/search.service';
import { DoctorService } from '../../../services/doctor.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: [
  ]
})
export class DoctorsComponent implements OnInit, OnDestroy {

  public doctors: Doctor[] = [];
  public doctorsTemp: Doctor[] = [];
  public loading: boolean = true;
  public imgSubs?: Subscription;

  constructor(private doctorService: DoctorService, private searchService: SearchService, private modalService: ModalImageService) { }
  
  ngOnInit(): void {
    this.loadDoctors();
    this.imgSubs = this.modalService.newImg.pipe(
      delay(500)
      ).subscribe(img => {
        this.loadDoctors();
      });
    }
    
  ngOnDestroy(): void {
      this.imgSubs?.unsubscribe();
  }

  loadDoctors() {
    this.doctorService.loadDoctors()
    .subscribe( resp => {
      console.log(resp);
      this.loading = false;
      this.doctors = resp;
      this.doctorsTemp = resp;
    })
  }

  search(term: string): any {
    if (term.length === 0) {
      return this.doctors = this.doctorsTemp;
    }
    this.searchService.search('doctors', term)
      .subscribe((resp: any) => {
        // console.log(resp);
        this.doctors = resp;
      });
  }

 
  openModal(doctor: Doctor) {
    //console.log(hospital);
    if (doctor._id) {
      this.modalService.openModal('doctors', doctor._id, doctor.img);
    }
  }

  deleteDoctor(doctor: Doctor): any {
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this Doctor ${doctor.name}!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        if (doctor._id) {
          this.doctorService.deleteDoctor(doctor._id)
            .subscribe(resp => {
              Swal.fire(
                'Deleted!',
                'Your Doctor has been deleted.',
                'success'
              )
              this.loadDoctors();
            });          
        }
      }
    })
  }

}
