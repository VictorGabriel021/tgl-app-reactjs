export interface IFormLogin {
  email: string;
  password: string;
}

export interface IFormReset {
  email: string;
}

export interface IFormChangePassword {
  password: string;
  confirmPassword: string;
}
