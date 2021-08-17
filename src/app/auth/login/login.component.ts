import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';

declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css'  ]
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private fb: FormBuilder, private userService : UserService, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.renderButton();
  }

  public formSubmitted = false;
  public auth2: any;
  
  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember : [false]
  });
  
  login() {
    this.userService.login(this.loginForm.value)
    .subscribe(resp=> {
      if (this.loginForm.get('remember')?.value) {
        localStorage.setItem('email', this.loginForm.get('email')?.value);
      }else{
        localStorage.removeItem('email');
      }
      // Redirect to dashboard
      this.router.navigateByUrl('/dashboard');
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error');
    });
    //console.log(this.loginForm.value);
    //this.router.navigateByUrl('/');
  } 


  renderButton() {
  gapi.signin2.render('my-signin2', {
    'scope': 'profile email',
    'width': 240,
    'height': 50,
    'longtitle': true,
    'theme': 'dark'  
  });  
  this.startApp();
}

async startApp() {
  await this.userService.googleInit();
  this.auth2 = this.userService.auth2;
  this.attachSignin(document.getElementById('my-signin2'));  
};

attachSignin(element:any) {
  //console.log(element.id);
  this.auth2.attachClickHandler(element, {},
    (googleUser:any) => {
      const id_token = googleUser.getAuthResponse().id_token;
      //console.log(id_token);
      this.userService.loginGoogle(id_token)
      .subscribe(resp => {
        // Redirect to dashboard
        this.ngZone.run(() => {
          this.router.navigateByUrl('/dashboard');        
        })
      });
    }, function (error:any) {
      alert(JSON.stringify(error, undefined, 2));
    });
}

}
