import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchService } from 'src/app/services/search.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit, OnDestroy {

  public totalUsers : number = 0;
  public users?: User[];
  public usersTemp: User[] = [];
  public imgSubs?: Subscription;
  public from: number = 0;
  public loading: boolean = true;


  constructor(private userService: UserService, private searchService: SearchService, private modalService: ModalImageService) { }

  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }

  ngOnInit(): void {
    this.loadUsers();
    this.imgSubs = this.modalService.newImg.pipe(
      delay(500)
    ).subscribe(img => {
      this.loadUsers();
    });
  }

  loadUsers() {
    this.loading = true;
    this.userService.loadUsers(this.from)
      .subscribe(({ total, users }) => {
        this.totalUsers = total; 
        //console.log(users);     
        this.users = users; 
        this.usersTemp = users;
        this.loading = false;
      })
  }

  changePage(value:number){
    this.from += value;
    if (this.from < 0) {
      this.from = 0;
    }else if (this.from >= this.totalUsers) {
      this.from -= value; 
    }
    this.loadUsers();
  }

  search(term:string): any {
    if (term.length === 0) {
      return this.users = this.usersTemp;
    }
    this.searchService.search('users', term)
    .subscribe(resp => {
     // console.log(resp);
      this.users = resp;
    });
  }

  deleteUser(user: User): any {
    if (user.uid === this.userService.uid) {
      return Swal.fire(
        'Error!',
        'Your cannot delete this user',
        'warning'
      )
    }   
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this ${user.name}!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user)
        .subscribe(resp => {
          Swal.fire(
            'Deleted!',
            'Your User has been deleted.',
            'success'
          )
          this.loadUsers();
        });
      }
    })
  }

  changeRole (user: User) {
    this.userService.updateRole(user)
    .subscribe(resp => {
      console.log(resp);
    });
  }

  openModal(user: User) {
    //console.log(user);
    if (user.uid) {
      this.modalService.openModal('users', user.uid, user.img);      
    }
  }

}
