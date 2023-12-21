export interface IPostCustomer {
  name: string;
  cpf: string;
  birthDate: string;
  monthlyIncome: string;
  email: string;
  registerDate: string;
  lastName: string;
}

export interface IGetConstumer {
  id: number;
  customer: string;
  cpf: string;
  registerDate: string;
  monthlyIncome: string;
  birthDate: string;
  email: string;
}

export interface IPutCustomer {
  cpf: string;
  id: string;
  name: string;
  birthDate: string;
  monthlyIncome: string;
  email: string;
  registerDate: string;
}
