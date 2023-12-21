import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CpfFormatPipe } from "./cpf-pipe";

@NgModule({
  declarations: [CpfFormatPipe],
  imports: [CommonModule],
  exports: [CpfFormatPipe],
})
export class CpfPipeModule {}
