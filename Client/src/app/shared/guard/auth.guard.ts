import { inject } from "@angular/core";
import { CanActivateFn, Router} from "@angular/router";
import { map } from "rxjs";
import { AccountService } from "../services/account.service";
import { ToastrService } from "ngx-toastr";

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const toastr = inject(ToastrService);
  const router = inject(Router);

  return accountService.currentUser$.pipe(
    map(user => {
        if (user) return true;     
        else{
          toastr.error('You shall not pass! Please login with correct credentials');
          router.navigate(["/auth/login"]);
          return false;
        }
    })
  )
};