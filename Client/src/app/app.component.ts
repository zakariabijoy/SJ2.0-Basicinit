import { Component, HostBinding, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { delay, map, withLatestFrom } from 'rxjs';
import { User } from './shared/model/user';
import { AccountService } from './shared/services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @HostBinding('@.disabled')
  public animationsDisabled = false;

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }


  toggleAnimations() {
    this.animationsDisabled = !this.animationsDisabled;
  }
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private loader: LoadingBarService, private accountService: AccountService) {
    
  }
  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user: User = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }
  
}
