import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "dateFormat",
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;

    const formattedDate = `${value.substr(0, 2)}/${value.substr(
      2,
      2
    )}/${value.substr(4, 4)}`;
    return formattedDate;
  }
}
