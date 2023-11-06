import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthReult, User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post<AuthReult>(this.baseUrl + 'Auth/Cognitologin', model).pipe(
      map((response: AuthReult) => {
        if (response.authenticationResult.accessToken && response.authenticationResult.refreshToken) {
          this.setCurrentUser(response.authenticationResult);
        }
        return response;
      })
    )
  }

  refreshToken(refreshToken:string){
    return this.http.post<User>(this.baseUrl + 'Auth/CognitoRefreshToken', {refreshToken : refreshToken}).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
        }
      })
    )
  }

  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  getDecodedToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]))
  }

  createPassword(model: any) {
    return this.http.post<any>(this.baseUrl + 'Auth/CognitoCreatePassword', model);
  }

  forgotPasswordRequest(model: any) {
    return this.http.post<any>(this.baseUrl + 'Auth/CognitoForgotPasswordRequest', model);
  }

  forgotPassword(model: any) {
    return this.http.post<any>(this.baseUrl + 'Auth/CognitoForgotPassword', model);
  }
}
