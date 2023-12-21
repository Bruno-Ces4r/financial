import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "currencyFormat",
})
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: any): string {
    const numericValue = parseFloat(value);

    if (isNaN(numericValue)) {
      return "";
    }

    const currencyString = numericValue.toFixed(2).replace(".", ",");
    return `R$ ${currencyString}`;
  }
}
