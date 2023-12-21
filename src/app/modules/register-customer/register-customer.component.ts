import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { debounceTime, take, takeUntil } from "rxjs/operators";
import { RegisterCustomersService } from "./services/register-customer.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-register-customer",
  templateUrl: "./register-customer.component.html",
  styleUrls: ["./register-customer.component.scss"],
})
export class RegisterCustomerComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  subject = new Subject();

  showHintError: boolean;

  phoneMask = "(00) 00000-0000";

  cpfMask = "000.000.000-00";

  birthMask = "00/00/0000";

  monthlyIncomeMask = "R$ 0.00";

  maxLength = 250;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private registerCustomersService: RegisterCustomersService,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.createAccountForm();
    this.checkFormErrors();
  }

  ngOnDestroy() {
    this.subject.unsubscribe();
  }

  createAccountForm() {
    this.registerForm = this.formBuilder.group({
      name: [
        "",
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      lastName: [
        "",
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      cpf: ["", Validators.required],
      birthDate: ["", [Validators.required], this.forAge()],
      monthlyIncome: ["", Validators.required],
      email: ["", Validators.compose([Validators.required, Validators.email])],
      registerDate: ["", [Validators.required, this.registerDateValidator()]],
    });
  }

  forAge(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ):
      | Promise<ValidationErrors | null>
      | Observable<ValidationErrors | null> => {
      return this.validateAge(control);
    };
  }

  validateAge(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return new Promise((resolve) => {
      const currentDate = new Date();
      const birthDateString = control.value;

      // Verificar se a data está em um formato válido
      if (!/^\d{8}$/.test(birthDateString)) {
        resolve({ invalidDateFormat: true });
      }

      const day = parseInt(birthDateString.substr(0, 2), 10);
      const month = parseInt(birthDateString.substr(2, 2), 10);
      const year = parseInt(birthDateString.substr(4, 4), 10);

      if (month < 1 || month > 12) {
        resolve({ invalidMonth: true });
      }

      const birthDate = new Date(year, month - 1, day);

      let age = currentDate.getFullYear() - birthDate.getFullYear();
      const monthDiff = currentDate.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      const minAge = 19;
      const maxAge = 59;

      if (age < minAge || age > maxAge) {
        resolve({ invalidAge: true });
      }

      resolve(null);
    });
  }

  registerDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const currentDate = new Date();
      const registerDateString = control.value;

      // Verificar se a data está em um formato válido
      if (!/^\d{8}$/.test(registerDateString)) {
        return { invalidDateFormat: true };
      }

      const day = parseInt(registerDateString.substr(0, 2), 10);
      const month = parseInt(registerDateString.substr(2, 2), 10);
      const year = parseInt(registerDateString.substr(4, 4), 10);

      if (month < 1 || month > 12) {
        return { invalidMonth: true };
      }

      const registerDate = new Date(year, month - 1, day);

      if (registerDate > currentDate) {
        return { futureDate: true };
      }

      return null;
    };
  }

  checkFormErrors() {
    this.registerForm.valueChanges
      .pipe(debounceTime(100), takeUntil(this.subject))
      .subscribe((res) => (this.showHintError = this.registerForm.valid));
  }

  handleSubmit() {
    if (this.registerForm.valid) {
      this.registerCustomersService
        .postCustomers(this.registerForm.value)
        .pipe(take(1))
        .subscribe(
          (res) => {
            this.toast.success("Cliente cadastrado com sucesso", "Sucesso");
            this.router.navigateByUrl("home");
          },
          (error) => {
            this.toast.error("Erro ao cadastrar cliente", "Error");
          }
        );
    }
  }
}
