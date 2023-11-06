import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/shared/services/account.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  public show: boolean = false;
  public showConfirm: boolean = false;
  public sendButton = 'Send';

  public forgotPasswordRequestForm: FormGroup;
  public forgotPasswordForm: FormGroup;

  constructor(private fb: FormBuilder, private accountService : AccountService, private router: Router, private toastr: ToastrService) { 
    this.forgotPasswordRequestForm = this.fb.group({
      username: ["", [Validators.required]]
    });

    this.forgotPasswordForm = this.fb.group({
      password: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required, this.matchValues('password')]],
      code: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
  }
  showPassword() {
    this.show = !this.show;
  }

  showConfirmPassword() {
    this.showConfirm = !this.showConfirm;
  }

  forgotPasswordRequest(){
    let model = {
      username:this.forgotPasswordRequestForm.controls['username'].value,
    };

    this.accountService.forgotPasswordRequest(model).subscribe({
      next: res => {
        this.toastr.success("Password reset code sent to your email address please check");
        this.sendButton ='Sent';
      }
    })
  }

  forgotPassword(){
    let model = {
      username:this.forgotPasswordRequestForm.controls['username'].value,
      password:this.forgotPasswordForm.controls['password'].value,
      confirmationCode:this.forgotPasswordForm.controls['code'].value,
    };

    this.accountService.forgotPassword(model).subscribe({
      next: res => {
        this.router.navigateByUrl('/auth/login');
        this.toastr.success("Password resetted successfully. Please login with new password");
      },
      error: _ =>{
        this.sendButton='Send';
      }
    })
  }

  matchValues(matchTO: string): ValidatorFn {
    return (control:any) => {
      return control?.value === control?.parent?.controls[matchTO].value
        ? null
        : { isMatching: true };
    };
  }
}
