import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from './_helper/AuthGuard';



import { IndexComponent } from "./pages/index/index.component";
import { ProfilesuppageComponent } from "./pages/examples/profilesuppage/profilesuppage.component";
import { RegisterpageComponent } from "./pages/examples/registerpage/registerpage.component";
import { RegisterusopageComponent } from "./pages/examples/registerusopage/registerusopage.component";
import { MainsuppageComponent } from "./pages/examples/mainsuppage/mainsuppage.component";
import { LandingpageComponent } from "./pages/examples/landingpage/landingpage.component";
import { SupporterpageComponent } from "./pages/examples/supporterpage/supporterpage.component";
import { SupporterprofileComponent } from "./pages/examples/supporterprofile/supporterprofile.component";
import { DetailpageComponent } from "./pages/examples/detailpage/detailpage.component";
import { DetailpagesupportComponent } from "./pages/examples/detailpagesupport/detailpagesupport.component";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: IndexComponent },
  { path: 'profile/:Id', component: ProfilesuppageComponent },
  { path: "register", component: RegisterpageComponent },
  { path: "registerUSO", component: RegisterusopageComponent },
  { path: "mainsup", component: MainsuppageComponent },
  { path: "landing", component: LandingpageComponent },
  { path: "mainsupporter", component: SupporterpageComponent },
  { path: 'profileSupporter/:Id', component: SupporterprofileComponent },
  { path: 'detailIssue/:Id', component: DetailpageComponent },
  { path: 'detailSupportIssue/:Id', component: DetailpagesupportComponent },
  { path: '', redirectTo: 'supporter',pathMatch: 'full', canActivate: [AuthGuard] },
  { path: '', redirectTo: 'supervisor',pathMatch: 'full', canActivate: [AuthGuard] }
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
