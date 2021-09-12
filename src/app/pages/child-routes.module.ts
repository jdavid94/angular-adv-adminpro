import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraphComponent } from './graph/graph.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromiseComponent } from './promise/promise.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './maintenance/users/users.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { DoctorComponent } from './maintenance/doctors/doctor.component';
import { SearchsComponent } from './searchs/searchs.component';
import { AdminGuard } from '../guards/admin.guard';


const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
  { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Account Settings' } },
  { path: 'search/:term', component: SearchsComponent, data: { title: 'Searchs' } },
  { path: 'graph', component: GraphComponent, data: { title: 'Graph' } },
  { path: 'profile', component: ProfileComponent, data: { title: 'Profile' } },
  { path: 'progress', component: ProgressComponent, data: { title: 'Progress' } },
  { path: 'promise', component: PromiseComponent, data: { title: 'Promise' } },
  { path: 'rxjs', component: RxjsComponent, data: { title: 'Rxjs' } },
  //Maintenance
  { path: 'doctors', component: DoctorsComponent, data: { title: 'Doctors' } },
  { path: 'doctor/:id', component: DoctorComponent, data: { title: 'Doctor' } },
  { path: 'hospitals', component: HospitalsComponent, data: { title: 'Hospitals' } },
  //Admin Routes
  { path: 'users', canActivate: [AdminGuard], component: UsersComponent, data: { title: 'Users' } },
            //{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
]


@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})

export class ChildRoutesModule { }
