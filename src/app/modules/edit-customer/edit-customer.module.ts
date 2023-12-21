import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatStepperModule } from "@angular/material/stepper";
import { MatFormFieldModule } from "@angular/material/form-field";
import {
  MatButtonModule,
  MatDatepickerModule,
  MatInputModule,
  MatSelectModule,
} from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";
import { NgxMaskModule } from "ngx-mask";
import { MatRadioModule } from "@angular/material/radio";
import { EditCustomerComponent } from "./edit-customer.component";
import { CpfPipeModule } from "src/app/pipes/cpf/cpf-pipe.module";

@NgModule({
  declarations: [EditCustomerComponent],
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
    CpfPipeModule,
  ],
  exports: [EditCustomerComponent],
})
export class EditCostumerModule {}
