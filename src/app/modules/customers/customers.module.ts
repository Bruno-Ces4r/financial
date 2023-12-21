import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatStepperModule } from "@angular/material/stepper";
import { MatFormFieldModule } from "@angular/material/form-field";
import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatPaginatorModule,
  MatSelectModule,
  MatTableModule,
} from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";
import { NgxMaskModule } from "ngx-mask";
import { MatRadioModule } from "@angular/material/radio";
import { CustomersComponent } from "./customers.component";
import { DateFormatPipe } from "src/app/pipes/date-pipe";
import { CurrencyFormatPipe } from "src/app/pipes/currency-pipe";
import { CpfPipeModule } from "src/app/pipes/cpf/cpf-pipe.module";

@NgModule({
  declarations: [CustomersComponent, DateFormatPipe, CurrencyFormatPipe],
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
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatIconModule,
    CpfPipeModule,
  ],
  exports: [CustomersComponent],
})
export class CustomersModule {}
