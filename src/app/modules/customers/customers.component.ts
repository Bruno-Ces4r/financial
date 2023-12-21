import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { take, takeUntil } from "rxjs/operators";
import { CustomersService } from "./services/customers.service";
import { MatPaginator, MatTableDataSource } from "@angular/material";
import { ToastrService } from "ngx-toastr";
import { FormControl } from "@angular/forms";

export interface ICustomer {
  clientName: string;
  cpf: string;
  registerDate: string;
  monthlyIncome: string;
}

@Component({
  selector: "app-customers",
  templateUrl: "./customers.component.html",
  styleUrls: ["./customers.component.scss"],
})
export class CustomersComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    "customer",
    "cpf",
    "registerDate",
    "monthlyIncome",
    "options",
  ];

  elementData: ICustomer[] = [];
  dataSource = new MatTableDataSource<ICustomer>(this.elementData);

  fakeUsers = new Array(10);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  private destroy$: Subject<void> = new Subject<void>();

  searchName = new FormControl("");
  searchCpf = new FormControl("");

  constructor(
    private router: Router,
    private customersService: CustomersService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCustomers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getCustomers() {
    this.customersService
      .getCustomers()
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe(
        (res: ICustomer[]) => {
          this.elementData = res;
          this.dataSource = new MatTableDataSource<ICustomer>(this.elementData);
          this.dataSource.paginator = this.paginator;
        },
        (error) => {
          this.toast.error("Erro ao obter dados", "Error");
        }
      );
  }

  deleteCustomer(event: any) {
    this.customersService
      .deleteCustomer(event.id)
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe(
        (res) => {
          this.toast.success("Cliente removido com sucesso", "Sucesso");
          this.getCustomers();
        },
        (_) => {
          this.toast.error("Erro ao remover cliente", "Error");
        }
      );
  }

  applyFilter() {
    this.customersService
      .customFilter(this.searchName.value, this.searchCpf.value)
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe(
        (res: ICustomer[]) => {
          this.elementData = res;
          this.dataSource = new MatTableDataSource<ICustomer>(this.elementData);
          this.dataSource.paginator = this.paginator;
        },
        (error) => {
          this.toast.error("Erro ao aplicar filtro", "error");
        }
      );
  }

  editCustomer(event: any) {
    this.router.navigate(["/atualizar-dados-cliente", { user: event.id }]);
  }

  handleClientRegister() {
    this.router.navigateByUrl("cadastro-cliente");
  }
}
