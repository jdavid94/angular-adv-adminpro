import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementalComponent } from './incremental/incremental.component';
import { FormsModule } from '@angular/forms';
import { DonutComponent } from './donut/donut.component';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    IncrementalComponent,
    DonutComponent
  ],
  exports: [
    IncrementalComponent,
    DonutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ]
})

export class ComponentsModule { }
