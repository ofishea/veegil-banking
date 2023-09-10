export interface User {
    _id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    accountNumber: string;
    accountBalance: string;
    password: string;
  }

  export interface AuthResponse {
    token: string;
  }