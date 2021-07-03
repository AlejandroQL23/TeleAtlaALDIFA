import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import {CommonModule } from '@angular/common';
import { AuthHtppInterceptorService } from './service/Interceptor/auth-htpp-interceptor.service';
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

import { PagesModule } from "./pages/pages.module";

import { IndexComponent } from "./pages/index/index.component";
import { ProfilepageComponent } from "./pages/examples/profilepage/profilepage.component";
import { RegisterpageComponent } from "./pages/examples/registerpage/registerpage.component";
import { RegisterusopageComponent } from "./pages/examples/registerusopage/registerusopage.component";
import { LandingpageComponent } from "./pages/examples/landingpage/landingpage.component";
import { GetSupporterIdComponent } from './componets/get-supporter-id/get-supporter-id.component';
import { GetSupportersListComponent } from './componets/get-supporters-list/get-supporters-list.component';
import { UpdateSupporterComponent } from './componets/update-supporter/update-supporter.component';
import { DeleteSupporterComponent } from './componets/delete-supporter/delete-supporter.component';
@NgModule({
  declarations: [
    AppComponent,
    GetSupporterIdComponent,
    GetSupportersListComponent,
    UpdateSupporterComponent,
    DeleteSupporterComponent
    // IndexComponent,
    // ProfilepageComponent,
    // RegisterpageComponent,
    // RegisterusopageComponent,
    // LandingpageComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    CommonModule,
    // BsDropdownModule.forRoot(),
    // ProgressbarModule.forRoot(),
    // TooltipModule.forRoot(),
    // CollapseModule.forRoot(),
    // TabsModule.forRoot(),
    PagesModule
    // PaginationModule.forRoot(),
    // AlertModule.forRoot(),
    // BsDatepickerModule.forRoot(),
    // CarouselModule.forRoot(),
    // ModalModule.forRoot()
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS, useClass:AuthHtppInterceptorService, multi:true

  }],
  bootstrap: [AppComponent]
})
export class AppModule {}
