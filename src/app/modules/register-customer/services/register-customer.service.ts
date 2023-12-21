import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IPostCustomer } from "src/shared/interfaces/customer.interface";

@Injectable({
  providedIn: "root",
})
export class RegisterCustomersService {
  headers: HttpHeaders;

  constructor(private http: HttpClient) {}

  postCustomers(data: IPostCustomer) {
    const url = "http://localhost:3000/clientes";
    const body = {
      customer: `${data.name} ${data.lastName}`,
      cpf: data.cpf,
      birthDate: data.birthDate,
      monthlyIncome: data.monthlyIncome,
      email: data.email,
      registerDate: data.registerDate,
    };
    return this.http.post(url, body);
  }
}
