import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraphComponent } from './graph/graph.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromiseComponent } from './promise/promise.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './maintenance/users/users.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { PipesModule } from '../pipes/pipes.module';
import { DoctorComponent } from './maintenance/doctors/doctor.component';
import { SearchsComponent } from './searchs/searchs.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    GraphComponent,
    PagesComponent,
    AccountSettingsComponent,
    PromiseComponent,
    RxjsComponent,
    ProfileComponent,
    UsersComponent,
    HospitalsComponent,
    DoctorsComponent,
    DoctorComponent,
    SearchsComponent
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    GraphComponent,
    PagesComponent,
    AccountSettingsComponent,
    PromiseComponent,
    RxjsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ComponentsModule,
    ReactiveFormsModule,
    PipesModule,
    AppRoutingModule

  ]
})

export class PagesModule { }
