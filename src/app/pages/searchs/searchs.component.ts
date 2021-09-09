import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { User } from 'src/app/models/user.model';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-searchs',
  templateUrl: './searchs.component.html',
  styles: [
  ]
})
export class SearchsComponent implements OnInit {

  public users: User[] = [];
  public doctors: Doctor[] = [];
  public hospitals: Hospital[] = [];

  constructor(private activatedRoute: ActivatedRoute, private searchService: SearchService) { }

  ngOnInit(): void {
    this.activatedRoute.params
    .subscribe(({term}) => {
      this.search(term);
    })
  }

  search(term: string) {
    this.searchService.searchGlobal(term)
    .subscribe((resp:any) => {
      this.users = resp.users;
      this.doctors = resp.doctors;
      this.hospitals = resp.hospitals;
    })
  }

  openDoctor(doc: Doctor) {

  }

}
