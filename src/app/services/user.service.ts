import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { tap, map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { LoadUser } from '../interfaces/load-users.interface';

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

  get role(): any {
    if (this.user?.roles) {
      return this.user.roles;
    }    
    return null;
  }

  get uid():string {
    return this.user?.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
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

  saveLocalStorage(token: string, menu: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
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
        this.saveLocalStorage(resp.token, resp.menu);    
        return true;
      }),
     
      catchError((error:any) => of(false))
    );
  }

  createUser(formData: RegisterForm) {
    return this.http.post(`${base_url}/users`, formData).pipe(
      tap((resp: any) => {
        this.saveLocalStorage(resp.token, resp.menu);
      })
    )
  }

  updateUser(data: {email:string, name:string, roles: string}) {
    data = {
      ...data,
      roles: this.user?.roles || ''
    };
    return this.http.put(`${base_url}/users/${this.uid}`, data, this.headers);
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData)
    .pipe(
      tap((resp: any) => {
        this.saveLocalStorage(resp.token, resp.menu);
      })
    )
  }

  loginGoogle(token: any) {
    return this.http.post(`${base_url}/login/google`, {token})
      .pipe(
        tap((resp: any) => {
          this.saveLocalStorage(resp.token, resp.menu);
        })
      )
  }

  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    this.auth2.signOut().then( () => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })     
    });
  }

  loadUsers(from:number = 0) {
    const url = `${base_url}/users?from=${from}`;
    return this.http.get<LoadUser>(url, this.headers)
    .pipe( 
      map(resp => {
        const users = resp.users.map(user => new User(user.name, user.email, '', user.img, user.google, user.roles, user.uid));
        return {
          total: resp.total,
          users
        };
      })
    )
  }

  deleteUser(user: User) {
    const url = `${base_url}/users/${user.uid}`;
    return this.http.delete(url, this.headers);
  }

  updateRole(user: User) {
    //data = {
    //  ...data,
    //  roles: this.user?.roles || ''
    //};
    //console.log(user);
    return this.http.put(`${base_url}/users/${user.uid}`, user, this.headers);      
  }
}
