import { Component, OnDestroy, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/services/hospital.service';
import Swal from 'sweetalert2';
import { Hospital } from '../../../models/hospital.model';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [
  ]
})
export class HospitalsComponent implements OnInit, OnDestroy {

  public hospitals: Hospital[] = [];
  public hospitalsTemp: Hospital[] = [];
  public loading: boolean = true;
  public imgSubs?: Subscription;
 

  constructor(private hospitalService: HospitalService, private modalService: ModalImageService, private searchService: SearchService) { }
  
  ngOnInit(): void {
    this.loadHospitals();
    this.imgSubs = this.modalService.newImg.pipe(
      delay(500)
      ).subscribe(img => {
        this.loadHospitals();
      });
    }
    
  ngOnDestroy(): void {
      this.imgSubs?.unsubscribe();
  }

  loadHospitals() {
    this.hospitalService.loadHospitals()
    .subscribe(resp => {
      //console.log(resp);
      this.loading = false;
      this.hospitals = resp;
      this.hospitalsTemp = resp;
    });    
  }

  search(term: string): any {
    if (term.length === 0) {
      return this.hospitals = this.hospitalsTemp;
    }
    this.searchService.search('hospitals', term)
      .subscribe((resp: any) => {
        // console.log(resp);
        this.hospitals = resp;
      });
  }

  update(hospital: Hospital) {
    //console.log(hospital);
    if (hospital._id && hospital.name) {
      this.hospitalService.updateHospital(hospital._id, hospital.name)
      .subscribe(resp => {
        this.loadHospitals();
        Swal.fire(
          'Updated!',
          hospital.name,
          'success'
        )
      })      
    }
  }

  delete(hospital: Hospital) {
    //console.log(hospital);
    if (hospital._id && hospital.name) {
      this.hospitalService.deleteHospital(hospital._id)
        .subscribe(resp => {
          this.loadHospitals();
          Swal.fire(
            'Deleted!',
            hospital.name,
            'success'
          )
        })
    }
  }

  async openCreateModal() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Create New Hospital',
      input: 'text',
      inputLabel: 'Hospital Name',
      inputPlaceholder: 'Enter Name',
      showCancelButton: true,
    })
    if (value) {
      if (value.trim().length > 0 ) {
        this.hospitalService.createHospital(value)
        .subscribe((resp:any) => {
          //this.loadHospitals();
          this.hospitals.push(resp.hospital);
          //console.log(resp);
        })
      }      
    }
  }

  openModal(hospital: Hospital) {
    //console.log(hospital);
    if (hospital._id) {
      this.modalService.openModal('hospitals', hospital._id, hospital.img);
    }
  }
}
