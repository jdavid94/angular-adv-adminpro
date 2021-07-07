import { Component } from '@angular/core';



@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styles: [
  ]
})
export class GraphComponent {

  public labels1: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public data1 = [
    [350, 450, 100]
  ];
  public labels2: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public data2 = [
    [250, 250, 500]
  ];
  public labels3: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public data3 = [
    [350, 350, 100]
  ];
  public labels4: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public data4 = [
    [150, 250, 600]
  ];

  constructor() { }

 

}
