import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderModule } from "src/shared/header/header.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule,
} from "@angular/material";
import { CustomersModule } from "./modules/customers/customers.module";
import { HttpClientModule } from "@angular/common/http";
import { RegisterCostumerModule } from "./modules/register-customer/register-customer.module";
import { ToastrModule } from "ngx-toastr";
import { EditCostumerModule } from "./modules/edit-customer/edit-customer.module";
import { registerLocaleData } from "@angular/common";
import localeBr from "@angular/common/locales/pt";

registerLocaleData(localeBr, "pt");

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CustomersModule,
    HttpClientModule,
    EditCostumerModule,
    RegisterCostumerModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: "toast-top-right",
      preventDuplicates: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
