import  { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgetPasswordComponent } from '../authentication/forget-password/forget-password.component'
import { RegisterImageOneComponent } from './register/register-image-one/register-image-one.component'
import { LoginImageOneComponent } from './login/login-image-one/login-image-one.component';
import { LoginImageTwoComponent } from './login/login-image-two/login-image-two.component';
import { LoginSimpleComponent } from './login/login-simple/login-simple.component';
import { SweetalertComponent } from './login/sweetalert/sweetalert.component';
import { ValidationComponent } from './login/validation/validation.component';
import { BgVideoComponent } from './register/bg-video/bg-video.component';
import { RegisterSimpleComponent } from './register/register-simple/register-simple.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { UnlockUserComponent } from './unlock-user/unlock-user.component';
import { CreatePasswordComponent } from './create-password/create-password.component';

var routingAnimation = localStorage.getItem('animate') 

const routes: Routes = [
  {
    path: 'login',
    children: [
      {
        path: 'login-simple',
        component: LoginSimpleComponent,
        data: { animation: [routingAnimation]}
      },
      {
        path: 'login-image-one',
        component: LoginImageOneComponent,
        data: { animation: [routingAnimation]}
      },
      {
        path: 'login-image-two',
        component: LoginImageTwoComponent,
        data: { animation: [routingAnimation]}
      },
      {
        path: 'sweetalert',
        component: SweetalertComponent,
        data: { animation: [routingAnimation]}
      },
      {
        path: 'tooltip',
        component: SweetalertComponent,
        data: { animation: [routingAnimation]}
      },
      {
        path: 'validation',
        component: ValidationComponent,
        data: { animation: [routingAnimation]}
      },
    ]
  },

  {
    path: 'register',
    children: [
      {
        path: 'register-image-one',
        component: RegisterImageOneComponent,
        data: { animation: [routingAnimation]}
      },
      {
        path: 'register-bg-video',
        component: BgVideoComponent,
        data: { animation: [routingAnimation]}
      },
      {
        path: 'register-simple',
        component: RegisterSimpleComponent,
        data: { animation: [routingAnimation]}
      },
    ]
  },

  {
    path: 'forgot-password',
    component: ForgetPasswordComponent,
    data: { animation: [routingAnimation]}
  },
  {
    path: 'create-password',
    component: CreatePasswordComponent,
    data: { animation: [routingAnimation]}
  },
  {
    path: 'maintenance',
    component: MaintenanceComponent,
    data: { animation: [routingAnimation]}
  },
  {
    path: 'unlock-user',
    component: UnlockUserComponent,
    data: { animation: [routingAnimation]}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
