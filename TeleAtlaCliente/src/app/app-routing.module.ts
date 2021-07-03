import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from './_helper/AuthGuard';



import { IndexComponent } from "./pages/index/index.component";
import { ProfilepageComponent } from "./pages/examples/profilepage/profilepage.component";
import { RegisterpageComponent } from "./pages/examples/registerpage/registerpage.component";
import { RegisterrequestpageComponent } from "./pages/examples/registerrequestpage/registerrequest.component";
import { MainclientpageComponent } from "./pages/examples/mainclientpage/mainclientpage.component";
import { LandingpageComponent } from "./pages/examples/landingpage/landingpage.component";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: IndexComponent },
  { path: "profile", component: ProfilepageComponent },
  { path: "register", component: RegisterpageComponent },
  { path: "registerrequest", component: RegisterrequestpageComponent },
  { path: "mainclient", component: MainclientpageComponent },
  { path: "landing", component: LandingpageComponent },
  { path: '', redirectTo: 'supporter',pathMatch: 'full', canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: []
})
export class AppRoutingModule {}
