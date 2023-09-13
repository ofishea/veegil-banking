export interface User {
    _id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    accountNumber: string;
    accountBalance: number;
    password: string;
    transactionHistory: [
       { 
        reference: string;
        amount: number;
        fromAccountNumber: number;
        fromAccountName: string;
        toAccountNumber: number;
        toAccountName: string;
        type: string;
        date: string;
        time: string;
        }
    ]
  }

  export interface AuthResponse {
    token: string;
  }

  export class Transfer {
      reference: string;
      amount: number;
      fromAccountNumber: number;
      fromAccountName: string;
      toAccountNumber: number;
      toAccountName: string;
      type: string;
      date: string;
      time: string;
  }