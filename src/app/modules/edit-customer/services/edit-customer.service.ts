import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IPutCustomer } from "src/shared/interfaces/customer.interface";

@Injectable({
  providedIn: "root",
})
export class EditCustomersService {
  headers: HttpHeaders;

  constructor(private http: HttpClient) {}

  getCustomer(id: string) {
    return this.http.get("http://localhost:3000/clientes/".concat(id));
  }

  putCustomer(user: IPutCustomer) {
    return this.http.put(
      "http://localhost:3000/clientes/".concat(user.id),
      user
    );
  }
}
