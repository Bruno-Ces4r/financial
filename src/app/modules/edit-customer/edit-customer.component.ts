import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subject } from "rxjs";
import { debounceTime, take, takeUntil } from "rxjs/operators";
import { EditCustomersService } from "./services/edit-customer.service";
import { ToastrService } from "ngx-toastr";
import { IGetConstumer } from "src/shared/interfaces/customer.interface";

@Component({
  selector: "app-edit-customer",
  templateUrl: "./edit-customer.component.html",
  styleUrls: ["./edit-customer.component.scss"],
})
export class EditCustomerComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  subject = new Subject();

  showHintError: boolean;

  phoneMask = "(00) 00000-0000";

  cpfMask = "000.000.000-00";

  birthMask = "00/00/0000";

  monthlyIncomeMask = "R$ 0.00";

  cpf: string;

  id: string;

  maxLength = 250;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private editCustomersService: EditCustomersService,
    private toast: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.user;
    });
    this.getUserData();
  }

  ngOnInit() {
    this.createAccountForm();
    this.checkFormErrors();
  }

  ngOnDestroy() {
    this.subject.unsubscribe();
  }

  createAccountForm() {
    this.registerForm = this.formBuilder.group({
      customer: [
        "",
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      birthDate: ["", Validators.required],
      monthlyIncome: ["", Validators.required],
      email: ["", Validators.compose([Validators.required, Validators.email])],
      registerDate: ["", Validators.required],
    });
  }

  getUserData() {
    this.editCustomersService.getCustomer(this.id).subscribe(
      (res: IGetConstumer) => {
        this.registerForm.patchValue({
          customer: res.customer,
          birthDate: res.birthDate,
          monthlyIncome: res.monthlyIncome,
          email: res.email,
          registerDate: res.registerDate,
        });
        this.cpf = res.cpf;
      },
      (_) => {
        this.toast.error("Erro ao obter dados do usuário", "error");
      }
    );
  }

  goToLogin() {
    this.router.navigate(["login"]);
  }

  checkFormErrors() {
    this.registerForm.valueChanges
      .pipe(debounceTime(100), takeUntil(this.subject))
      .subscribe((res) => (this.showHintError = this.registerForm.valid));
  }

  handleSubmit() {
    if (this.registerForm.valid) {
      const user = {
        ...this.registerForm.value,
        cpf: this.cpf,
        id: this.id,
      };
      this.editCustomersService
        .putCustomer(user)
        .pipe(take(1))
        .subscribe(
          (res) => {
            this.toast.success("Dados atualizados com sucesso", "success");
            this.router.navigateByUrl("/home");
          },
          (_) => {
            this.toast.error("Erro ao atualizar dados do cliente", "error");
          }
        );
    }
  }
}
