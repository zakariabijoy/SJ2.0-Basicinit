import { Component, OnInit } from '@angular/core';
import * as chartDatas from '../../../shared/data/components/widgest/charts/charts'
import * as Highcharts from 'highcharts';
import { DashboardService } from 'src/app/shared/services/dashboard.service';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  // charts
  public linechart1 = chartDatas.linechart1;
  public linechart2 = chartDatas.linechart2;
  public linechart3 = chartDatas.linechart3;
  
  Highcharts: typeof Highcharts = Highcharts;
	chartOptions1: Highcharts.Options = chartDatas.heighchartData1;
	chartOptions2: Highcharts.Options = chartDatas.heighchartData2;
	chartOptions3: Highcharts.Options = chartDatas.heighchartData3;
  constructor(private dashBoardService: DashboardService) { }

  ngOnInit(): void {
    this.dashBoardService.getAreaSeries().subscribe({
      next: (series) =>{
        this.chartOptions1 = {...chartDatas.heighchartData1,series}
      }
    });

    // this.dashBoardService.getColumnSeries().subscribe({
    //   next: (series) =>{
    //     this.chartOptions3 = {...chartDatas.heighchartData3,series}
    //   }
    // });
    
  }

}
