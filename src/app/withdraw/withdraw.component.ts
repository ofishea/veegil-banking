import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UsersService } from '../_services';
import { User } from '../_models';
import { formatDate } from '@angular/common';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { of, Subject } from 'rxjs';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent {
  private toAccountNumberInput = new Subject<string>();
  user: User;
  withdrawForm: FormGroup;
  loading = false;
  fullName: string | null = null;

  constructor(
    private formBuilder: FormBuilder, 
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.usersService.user.subscribe((user) => {
      this.user = user;
    });
    this.withdrawForm = this.formBuilder.group({
      amount: ['', [Validators.required]],
      fromAccountNumber: [this.user.accountNumber],
      fromAccountName: [this.user.fullName],
      toAccountNumber: [null, [Validators.required, Validators.minLength(10)]],
      toAccountName: ['', [Validators.required]],
      date: [formatDate(new Date(Date.now()), 'd MMM yy', 'en')],
      time: [formatDate(new Date(Date.now()), 'h:mm:ss a', 'en')], 
    });
    
    this.withdrawForm.get('toAccountNumber')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value: string) => {
        const accountNumber = value.toString();
        if (accountNumber.length === 10) {
          return this.usersService.getUserByAccountNumber(accountNumber);
        } else {
          return of(null);
        }
      })
    ).subscribe((user) => {
      if (user) {
        this.fullName = user.fullName;
        this.withdrawForm.get('toAccountName')?.setValue(this.fullName);
      } else {
        this.fullName = null;
        this.withdrawForm.get('toAccountName')?.setValue('');
      }
    });
  }
  onToAccountNumberInput(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.toAccountNumberInput.next(inputValue);
  }

  get f() {
    return this.withdrawForm.controls;
  }

  onSubmit(): void {
    if (this.withdrawForm.invalid) {
      return;
    }

    this.loading = true;
    this.usersService.transfer(this.withdrawForm.value).subscribe(
      (response) => {
        if (response) {
          this.router.navigate(['/dashboard']);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
}

