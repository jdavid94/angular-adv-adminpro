import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Doctor } from '../models/doctor.model';

const base_url = environment.url_base;

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  loadDoctors() {
    const url = `${base_url}/doctors`;
    return this.http.get<Doctor[]>(url, this.headers)
      .pipe(
        map((resp: any) => resp.doctors)
      );
  }

  getDoctorByID(id: string) {
    const url = `${base_url}/doctors/${id}`;
    return this.http.get<Doctor>(url, this.headers)
      .pipe(
        map((resp: any) => resp.doctor)
      );
  }
  
  createDoctor(doctor: {name: string, hospital: string}) {
    const url = `${base_url}/doctors`;
    return this.http.post(url, doctor, this.headers);
  }

  updateDoctor(doctor: Doctor) {
    const url = `${base_url}/doctors/${doctor._id}`;
    return this.http.put(url, doctor, this.headers);
  }

  deleteDoctor(_id: string) {
    const url = `${base_url}/doctors/${_id}`;
    return this.http.delete(url, this.headers);
  }

}
