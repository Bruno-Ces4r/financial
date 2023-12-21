import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CustomersComponent } from "./modules/customers/customers.component";
import { RegisterCustomerComponent } from "./modules/register-customer/register-customer.component";
import { EditCustomerComponent } from "./modules/edit-customer/edit-customer.component";

const routes: Routes = [
  { path: "home", component: CustomersComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "*", redirectTo: "/home", pathMatch: "full" },
  { path: "cadastro-cliente", component: RegisterCustomerComponent },
  { path: "atualizar-dados-cliente", component: EditCustomerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
