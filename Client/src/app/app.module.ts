import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { RouterModule } from "@angular/router";
import { SharedModule } from "./shared/shared.module";
import { OverlayModule } from "@angular/cdk/overlay";
import { LoginComponent } from "./auth/login/login.component";
// for HttpClient import:
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
// // for Router import:
import { LoadingBarRouterModule } from "@ngx-loading-bar/router";
// // for Core import:
import { LoadingBarModule } from "@ngx-loading-bar/core";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { JwtInterceptor } from "./shared/interceptors/jwt.interceptor";
import { ErrorInterceptor } from "./shared/interceptors/error.interceptor";
import { JwtModule } from "@auth0/angular-jwt";
import { User } from "./shared/model/user";
import { CreatePasswordComponent } from "./auth/create-password/create-password.component";
import { ForgetPasswordComponent } from "./auth/forget-password/forget-password.component";
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

export function tokenGetter() { 
  const userString = localStorage.getItem('user');
  if (!userString) return '';
  const user: User = JSON.parse(userString);
  return user.accessToken;
}

@NgModule({
  declarations: [AppComponent,LoginComponent, CreatePasswordComponent, ForgetPasswordComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
    SharedModule,
    OverlayModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    LoadingBarModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    ToastrModule.forRoot(),
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5011","localhost:5010"],
        disallowedRoutes: []
      }
    })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
