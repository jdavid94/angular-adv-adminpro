import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementalComponent } from './incremental/incremental.component';
import { FormsModule } from '@angular/forms';
import { DonutComponent } from './donut/donut.component';
import { ChartsModule } from 'ng2-charts';
import { ModalImageComponent } from './modal-image/modal-image.component';


@NgModule({
  declarations: [
    IncrementalComponent,
    DonutComponent,
    ModalImageComponent
  ],
  exports: [
    IncrementalComponent,
    DonutComponent,
    ModalImageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ]
})

export class ComponentsModule { }
