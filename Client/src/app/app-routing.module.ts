import { NgModule } from "@angular/core";
var routingAnimation = localStorage.getItem("animate");
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { ContentComponent } from "./shared/components/layout/content/content.component";
import { content } from "./shared/routes/routes/routers";
import { FullComponent } from "./shared/components/layout/full/full.component";
import { full } from "./shared/routes/full";
import { authGuard } from "./shared/guard/auth.guard";
import { CreatePasswordComponent } from "./auth/create-password/create-password.component";
import { ForgetPasswordComponent } from "./auth/forget-password/forget-password.component";
const routes: Routes = [
  {
    path: "",
    redirectTo: "auth/login",
    pathMatch: "full",
  },
  {
    path: "auth/login",
    component: LoginComponent,
  },
  {
    path: "create-password",
    component: CreatePasswordComponent,
  },
  {
    path: "forgot-password",
    component: ForgetPasswordComponent,
  },
  {
    path: "",
    component: ContentComponent,
    canActivate: [authGuard],
    children: content,
  },
  {
    path: "",
    component: FullComponent,
    canActivate: [authGuard],

    children: full,
  },
  {
    path: "**",
    redirectTo: "auth/login",
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: "enabled",
      scrollPositionRestoration: "enabled",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
