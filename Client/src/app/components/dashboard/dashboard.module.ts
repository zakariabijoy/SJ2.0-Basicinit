import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ChartComponent } from './chart/chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartsComponent } from './chart/charts/charts.component';
import { MarketingExpensesComponent } from './chart/marketing-expenses/marketing-expenses.component';
import { TotalEarningComponent } from './chart/total-earning/total-earning.component';
import { SkillStatusComponent } from './chart/skill-status/skill-status.component';
import { OrderStatusComponent } from './chart/order-status/order-status.component';
import { LiveProductsComponent } from './chart/live-products/live-products.component';
import { TurnoverComponent } from './chart/turnover/turnover.component';
import { MonthlySalesComponent } from './chart/monthly-sales/monthly-sales.component';
import { UserComponent } from './chart/user/user.component';

import {FormsModule} from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FinanceComponent } from './chart/finance/finance.component';
import { OrderStatus2Component } from './chart/order-status2/order-status2.component';
import { BrowserUsesComponent } from './chart/browser-uses/browser-uses.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { GetStartedComponent } from './get-started/get-started.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { HighChartsComponent } from './chart/highCharts/high-charts.component';

@NgModule({
  declarations: [
    ChartComponent,
    ChartsComponent,
    MarketingExpensesComponent,
    TotalEarningComponent,
    SkillStatusComponent,
    OrderStatusComponent,
    LiveProductsComponent,
    TurnoverComponent,
    MonthlySalesComponent,
    UserComponent,
    FinanceComponent,
    OrderStatus2Component,
    BrowserUsesComponent,
    GetStartedComponent,
    HighChartsComponent
  ],
  imports: [CommonModule,
    DashboardRoutingModule,
    SharedModule,
    NgbModule,
    FormsModule,
    NgApexchartsModule,
    HighchartsChartModule,
    AngularSvgIconModule,],
})
export class DashboardModule {}
