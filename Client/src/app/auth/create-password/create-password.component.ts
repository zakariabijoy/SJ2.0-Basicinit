import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/shared/services/account.service';

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.scss']
})
export class CreatePasswordComponent implements OnInit {
  @Input() username:string ='';

  public show: boolean = false;
  public showConfirm: boolean = false;
  public createPasswordForm: FormGroup;

  constructor(private fb: FormBuilder, private accountService : AccountService, private router: Router, private toastr: ToastrService, private route: ActivatedRoute) { 
    this.createPasswordForm = this.fb.group({
      password: ["", Validators.required],
      confirmPassword: ["", [Validators.required, this.matchValues('password')]],
    });
    this.username = this.route.snapshot.paramMap.get('username')!;
  }

  ngOnInit(): void {
  }

  matchValues(matchTO: string): ValidatorFn {
    return (control:any) => {
      return control?.value === control?.parent?.controls[matchTO].value
        ? null
        : { isMatching: true };
    };
  }

  showPassword() {
    this.show = !this.show;
  }
  showConfirmPassword() {
    this.showConfirm = !this.showConfirm;
  }

  createPassword(){
    let model = {
      username:this.username,
      password: this.createPasswordForm.controls['password'].value
    };

    this.accountService.createPassword(model).subscribe({
      next: res => {
        this.router.navigateByUrl('/auth/login');
        this.toastr.success("Password created successfully. Please login with new password");
      }
    })
  }
}
