import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        {title: 'Main', url: '/'},
        { title: 'ProgressBar', url: 'progress' },
        { title: 'Graph', url: 'graph' },
        { title: 'Promise', url: 'promise' },
        { title: 'Rxjs', url: 'rxjs' }
      ]
    },
    {
      title: 'Maintenance',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        { title: 'Users', url: 'users' },
        { title: 'Hospitals', url: 'hospitals' },
        { title: 'Doctors', url: 'doctors' }       
      ]
    }
  ]

  constructor() { }
}
