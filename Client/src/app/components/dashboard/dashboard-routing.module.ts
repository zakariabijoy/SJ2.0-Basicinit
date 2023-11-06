import  { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartComponent } from './chart/chart.component';

var routingAnimation = localStorage.getItem('animate') 

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ChartComponent,
        data: { animation: [routingAnimation]}
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {
  constructor(){
    routingAnimation = localStorage.getItem("animate");
    
  }
}
