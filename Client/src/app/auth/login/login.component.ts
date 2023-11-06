import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AccountService } from "src/app/shared/services/account.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public show: boolean = false;
  public loginForm: FormGroup;
  public errorMessage: any;

  constructor(private fb: FormBuilder, public router: Router, private accountService: AccountService) {
    this.loginForm = this.fb.group({
      username: ["", [Validators.required]],
      password: ["", Validators.required],
    });
  }

  ngOnInit() {}

  showPassword() {
    this.show = !this.show;
  }

  login() {
   let model = {
    username: this.loginForm.controls['username'].value,
    password: this.loginForm.controls['password'].value
  };

    this.accountService.login(model).subscribe({
      next: res => {
        if(res.challengeName)
          this.router.navigate(['create-password',{username: this.loginForm.controls['username'].value}]);
        else
          this.router.navigateByUrl("/dashboard");
      }
    })
  }
}
