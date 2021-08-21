import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { tap, map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

const base_url = environment.url_base;
declare const gapi:any;

@Injectable({
  providedIn: 'root'
})

export class UserService {

  public auth2 : any;
  public user: User | undefined;

  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {
    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid():string {
    return this.user?.uid || '';
  }

  googleInit() {
    return new Promise<void> (resolve => {
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '493288621511-6a95bf813cfsni7hmvv32ehvadrlj6b2.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });     
        resolve();
      });
    })
  }

  validatedToken(): Observable<boolean> {
    //const token = localStorage.getItem('token') || '';
    return  this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( (resp:any) => {
        //console.log(resp);
        const {          
          email,
          google,
          img = '',
          name,
          roles,
          uid} = resp.user;
        this.user = new User(name, email, '', img, google, roles, uid);
        localStorage.setItem('token', resp.token);
        return true;
      }),
     
      catchError((error:any) => of(false))
    );
  }

  createUser(formData: RegisterForm) {
    return this.http.post(`${base_url}/users`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token)
      })
    )
  }

  updateUser(data: {email:string, name:string, role: string}) {
    data = {
      ...data,
      role: this.user?.role || ''
    };
    return this.http.put(`${base_url}/users/${this.uid}`, data, {
      headers: {
        'x-token': this.token
      }}).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token)
      })
    )
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData)
    .pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token)
      })
    )
  }

  loginGoogle(token: any) {
    return this.http.post(`${base_url}/login/google`, {token})
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      )
  }

  logOut(){
    localStorage.removeItem('token');
    this.auth2.signOut().then( () => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })     
    });
  }
}
