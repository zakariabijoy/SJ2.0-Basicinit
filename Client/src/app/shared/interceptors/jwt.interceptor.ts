import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { AccountService } from '../services/account.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountService, private jwtHelper: JwtHelperService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (request.url.indexOf("/Cognitologin") > -1) {
      return next.handle(request);
    }

    if (request.url.indexOf("/CognitoRefreshToken") > -1) {
      return next.handle(request);
    }

    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if (user) {
          if(this.jwtHelper.isTokenExpired(user.accessToken)){
            this.accountService.refreshToken(user.refreshToken).subscribe({
              next: _ => {
                this.accountService.currentUser$.pipe(take(1)).subscribe({
                  next: user =>{
                    if(user){
                      request = request.clone({setHeaders: {
                        Authorization: `Bearer ${user.accessToken}`
                      }})
                    }
                  }
                })
                },
              error: _ => {
                this.accountService.logout();
                this.router.navigateByUrl('/auth/login');
              }
            })
          }
        }
      }
    })
    
    return next.handle(request);
  }
}
