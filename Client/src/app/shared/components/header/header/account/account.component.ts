import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AccountService } from "src/app/shared/services/account.service";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"],
})
export class AccountComponent implements OnInit {
  public userName: string;
  public profileImg: "assets/images/dashboard/profile.jpg";

  constructor(private accountService: AccountService, public router: Router) {}

  logoutFunc() {
    this.accountService.logout();
    this.router.navigate(["/auth/login"]);
  }
  ngOnInit(): void {}
}
