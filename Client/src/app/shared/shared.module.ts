import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './components/header/header/header.component';
import { ContentComponent } from './components/layout/content/content.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { NavService } from './services/nav.service';
import { FeatherIconComponent } from './components/feather-icon/feather-icon.component';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { TapToTopComponent } from './components/tap-to-top/tap-to-top.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotificationComponent } from './components/header/header/notification/notification.component';
import { AccountComponent } from './components/header/header/account/account.component';
import { ModeComponent } from './components/header/header/mode/mode.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomizerComponent } from './components/customizer/customizer.component';
import { LoaderComponent } from './components/loader/loader.component';
import { FullComponent } from './components/layout/full/full.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SearchComponent } from './components/header/header/search/search.component';
import { ColorComponent } from './components/customizer/color/color.component';
import { LayoutSettingComponent } from './components/customizer/layout-setting/layout-setting.component';
import { SearchCustomizeComponent } from './components/header/header/search-customize/search-customize.component';
import { MaximizeComponent } from './components/header/header/maximize/maximize.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ContentComponent,
    SidebarComponent,
    FeatherIconComponent,
    BreadcrumbComponent,
    TapToTopComponent,
    FooterComponent,
    NotificationComponent,
    MaximizeComponent,
    AccountComponent,
    ModeComponent,
    CustomizerComponent,
    LoaderComponent,
    FullComponent,
    SearchComponent,
    ColorComponent,
    LayoutSettingComponent,
    SearchCustomizeComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AngularSvgIconModule.forRoot(),
    
    
  ],
  providers: [
    NavService,
    DecimalPipe    
  ],
  exports: [
    RouterModule,
    BreadcrumbComponent,
    TapToTopComponent,
    FeatherIconComponent,
    ContentComponent,
    LoaderComponent,
    NgbModule,
    AngularSvgIconModule,
    FormsModule,
    ReactiveFormsModule


  ]
})
export class SharedModule { }
