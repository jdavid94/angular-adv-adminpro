import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  public user?: User;

  constructor(private userService: UserService, private router: Router) { 
    this.user = userService.user;
  }

  logOut() {
    this.userService.logOut();  
  }

  search(term : string) {
    if (term.length === 0) {
      this.router.navigateByUrl(`/dashboard`);
    }
    this.router.navigateByUrl(`/dashboard/search/${term}`);
  }

}
