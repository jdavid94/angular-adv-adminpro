import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-incremental',
  templateUrl: './incremental.component.html',
  styles: [
  ]
})
export class IncrementalComponent implements OnInit {

  ngOnInit() {
    this.btnClass = `btn ${ this.btnClass }`;
  }

  @Input('value') progress: number = 50;
  @Input() btnClass: string = 'btn-primary';

  @Output() valueOutput: EventEmitter<number> = new EventEmitter();

  changeValue(value: number): void {
    if (this.progress >= 100 && value >= 0) {
      this.valueOutput.emit(100);
      this.progress = 100;
    }

    if (this.progress <= 0 && value < 0) {
      this.valueOutput.emit(0);
      this.progress = 0;
    }
    this.progress = this.progress + value;
    this.valueOutput.emit(this.progress);
  }

  onChange(newValue: number) {
    if (newValue>=100) {
      this.progress = 100;
    }else if (newValue <= 0) {
      this.progress = 0;
    }else{
      this.progress = newValue;
    }
    this.valueOutput.emit(this.progress);
  }

}
