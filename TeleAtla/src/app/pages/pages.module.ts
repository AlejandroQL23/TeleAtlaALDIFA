import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { TabsModule } from "ngx-bootstrap/tabs";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { AlertModule } from "ngx-bootstrap/alert";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { ModalModule } from "ngx-bootstrap/modal";
import { JwBootstrapSwitchNg2Module } from "jw-bootstrap-switch-ng2";
import { PopoverModule } from "ngx-bootstrap/popover";
import { ConfirmationPopoverModule } from "angular-confirmation-popover";

import { IndexComponent } from "./index/index.component";
import { ProfilesuppageComponent } from "./examples/profilesuppage/profilesuppage.component";
import { RegisterpageComponent } from "./examples/registerpage/registerpage.component";
import { RegisterusopageComponent } from "./examples/registerusopage/registerusopage.component";
import { MainsuppageComponent } from "./examples/mainsuppage/mainsuppage.component";
import { LandingpageComponent } from "./examples/landingpage/landingpage.component";
import { MaterialModule } from "../material/material.module";
import { SupporterpageComponent } from "./examples/supporterpage/supporterpage.component";
import { SupporterprofileComponent } from "./examples/supporterprofile/supporterprofile.component";
import { DetailpageComponent } from "./examples/detailpage/detailpage.component";
import { DetailpagesupportComponent } from "./examples/detailpagesupport/detailpagesupport.component";

@NgModule({
  imports: [
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger'
    }),
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    CollapseModule.forRoot(),
    JwBootstrapSwitchNg2Module,
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CarouselModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [
    IndexComponent,
    ProfilesuppageComponent,
    RegisterpageComponent,
    RegisterusopageComponent,
    LandingpageComponent,
    MainsuppageComponent,
    SupporterpageComponent,
    SupporterprofileComponent,
    DetailpageComponent,
    DetailpagesupportComponent
  ],
  exports: [
    IndexComponent,
    ProfilesuppageComponent,
    RegisterpageComponent,
    LandingpageComponent,
    MainsuppageComponent,
    SupporterpageComponent,
    SupporterprofileComponent,
    DetailpageComponent,
    DetailpagesupportComponent
  ],
  providers: []
})
export class PagesModule { }
