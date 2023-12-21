import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatStepperModule } from "@angular/material/stepper";
import { MatFormFieldModule } from "@angular/material/form-field";
import {
  MatButtonModule,
  MatInputModule,
  MatSelectModule,
} from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";
import { NgxMaskModule } from "ngx-mask";
import { MatRadioModule } from "@angular/material/radio";
import { RegisterCustomerComponent } from "./register-customer.component";

@NgModule({
  declarations: [RegisterCustomerComponent],
  imports: [
    CommonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    MatRadioModule,
    MatSelectModule,
  ],
  exports: [RegisterCustomerComponent],
})
export class RegisterCostumerModule {}
