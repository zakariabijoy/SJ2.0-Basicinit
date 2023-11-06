import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccountService } from 'src/app/shared/services/account.service';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.scss']
})
export class GetStartedComponent implements OnInit {
  name:string = '';
  constructor(private accounService: AccountService, private jwtHelper: JwtHelperService) { }

  ngOnInit(): void {
    this.accounService.currentUser$.subscribe({
      next: (user) =>{
        this.name = this.jwtHelper.decodeToken(user?.accessToken!).username;
      }
    })
  }

}
