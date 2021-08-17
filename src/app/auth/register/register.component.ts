import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formSubmitted = false;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { 
   
  }

  public registerForm = this.fb.group({
    name: ['David63', [Validators.required]],
    email: ['test63@gmail.com', [Validators.required, Validators.email]],
    password: ['12345', [Validators.required]],
    password2: ['12345', [Validators.required]],
    terms: [true, [Validators.required]],
  },{
    validators: this.equalPasswords('password','password2')
  });

  createUser() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);
    if (this.registerForm.invalid) {
      return;
    }
    // Post
    this.userService.createUser(this.registerForm.value)
    .subscribe( resp => {
      //console.log('User Created');
      //console.log(resp);
      this.router.navigateByUrl('/dashboard');
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error');
    });
  }

  invalidInput (input: string): boolean {
    if (this.registerForm.get(input)?.invalid && this.formSubmitted) {
      return true;
    }else{
      return false;
    }
  }

  invalidPasswords() {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;
    if (pass1 != pass2 && this.formSubmitted) {
      return true;
    }else{
      return false;
    }
  }

  acceptedTerm() {
    return !this.registerForm.get('terms')?.value && this.formSubmitted;
  }

  equalPasswords(pass1 : string, pass2: string) {
    return (formGroup : FormGroup) => {
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);
      if (pass1Control?.value === pass2Control?.value){
        pass2Control?.setErrors(null)
      }else{
        pass2Control?.setErrors({ notEquals: true})
      }
    }
  }

  
  

}
