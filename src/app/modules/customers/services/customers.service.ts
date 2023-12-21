import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CustomersService {
  constructor(private http: HttpClient) {}

  getCustomers() {
    return this.http.get("http://localhost:3000/clientes");
  }

  deleteCustomer(id: string) {
    return this.http.delete("http://localhost:3000/clientes/".concat(id));
  }

  customFilter(name?: string, cpf?: string) {
    const numericCpf = cpf ? cpf.replace(/\D/g, "") : "";

    if (!!name && !!cpf) {
      return this.http.get(
        `http://localhost:3000/clientes?customer=${name}&cpf=${cpf}`
      );
    } else if (!name && !cpf) {
      return this.http.get("http://localhost:3000/clientes");
    } else if (!name && !!cpf) {
      return this.http.get(`http://localhost:3000/clientes?cpf=${numericCpf}`);
    } else {
      return this.http.get(`http://localhost:3000/clientes?customer=${name}`);
    }
  }
}
