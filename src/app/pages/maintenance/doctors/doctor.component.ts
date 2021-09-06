import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { HospitalService } from 'src/app/services/hospital.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: [
  ]
})

export class DoctorComponent implements OnInit {

  public doctorForm: any;
  public hospitals: Hospital[] = [];
  public doctorSelected?: Doctor;
  public hospitalSelected?: Hospital;

  constructor(private fb: FormBuilder, private hospitalService: HospitalService, private doctorService: DoctorService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {   
    this.activatedRoute.params.subscribe(({id}) => {
      this.loadDoctor(id);
    })
      this.doctorForm = this.fb.group({
        name: ['', [Validators.required]],
        hospital: ['', [Validators.required]],
      });     
    this.loadHospital();
    this.doctorForm.get('hospital').valueChanges
    .subscribe((hospID:any) => {
      this.hospitalSelected = this.hospitals.find(h => h._id === hospID);
      //console.log(this.hospitalSelected);
    })
  }

  loadDoctor(id: string) {
    if (id === 'new') {
      return;
    } 
       this.doctorService.getDoctorByID(id)
       .pipe(
         delay(100)
       )
      .subscribe((doctor):any => {
        //console.log(doctor);
        const { name, hospital:{ _id } } = doctor;      
        this.doctorSelected = doctor;
        this.doctorForm.setValue({name, hospital: _id});
      });      
   
  }

  loadHospital() {
    this.hospitalService.loadHospitals()
    .subscribe((hospitals: Hospital[]) => {
      this.hospitals = hospitals;
    })
  }

  saveDoctor() {
    const { name } = this.doctorForm.value;
    if (this.doctorSelected) {
      const data = {
        ...this.doctorForm.value,
        _id: this.doctorSelected._id
      }
      this.doctorService.updateDoctor(data)
      .subscribe(resp => {
        //console.log(resp);
        Swal.fire(
          'Doctor Updated!',
          name,
          'success'
        )    
      });
    } else {
      this.doctorService.createDoctor(this.doctorForm.value)
      .subscribe((resp:any) => {
        //console.log(resp);
        Swal.fire(
          'Doctor Created!',
          name,
          'success'
        )
        this.router.navigateByUrl(`/dashboard/doctor/${resp.doctor._id}`)
      });      
    }
  }
}
