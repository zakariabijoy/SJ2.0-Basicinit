import { Component, Input, OnInit } from '@angular/core';

import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-high-charts',
  templateUrl: './high-charts.component.html',
  styleUrls: ['./high-charts.component.scss']
})
export class HighChartsComponent implements OnInit {

  @Input() data: Highcharts.Options | any;

  Highcharts: typeof Highcharts = Highcharts;

  constructor() { }

  ngOnInit(): void {
  }

}
