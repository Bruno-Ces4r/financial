import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "cpfFormat",
})
export class CpfFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value || typeof value !== "string" || !/^\d{11}$/.test(value)) {
      return value;
    }

    return `${value.substr(0, 3)}.${value.substr(3, 3)}.${value.substr(
      6,
      3
    )}-${value.substr(9)}`;
  }
}
