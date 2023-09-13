import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { map, of, Observable } from 'rxjs';
import { MustMatch } from '../_helpers/must-match.validator';
import { UsersService } from '../_services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  
  registrationForm: FormGroup;
  loading = false;
  submitted = false;
  phoneNumberValue = '';
  showAlert = false;
  showEmailAlert = false;
  confirmPassAlert = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder, 
    private usersService: UsersService) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      accountNumber: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
        validator: MustMatch('password', 'confirmPassword')
    });

    this.registrationForm.get('phoneNumber').valueChanges.subscribe((value) => {
      if (value.length === 11) {
        this.phoneNumberValue = value;
        this.checkPhoneNumberExists();
        this.registrationForm.get('accountNumber').setValue(value.substring(1));
      } else {
        this.showAlert = false;
        this.phoneNumberValue = '';
        this.registrationForm.get('accountNumber').setValue('');
      }
    });
    
    this.registrationForm.get('email').valueChanges
    .pipe(
      debounceTime(300), // Wait for 300ms pause in events
      distinctUntilChanged(), // Only emit if the value has changed
      switchMap((value) => this.checkEmailExists(value) as Observable<boolean>) // Perform search
    )
    .subscribe((emailExists: boolean) => {
      this.showEmailAlert = emailExists;
    });
  }

  checkPhoneNumberExists(): void {
    if (this.phoneNumberValue) {
      this.usersService.findPhoneNumber(this.phoneNumberValue).subscribe(
        (user) => {
          if (user) {
            this.showAlert = true;
          } else {
            this.showAlert = false;
          }
        },
        (error) => {
          console.error('Error checking phone number:', error);
        }
      );
    }
  }
  
  checkEmailExists(email: string): Observable<boolean> {
    return this.usersService.findEmail(email).pipe(
      switchMap((response) => {
        if (response) {
          return of(true); // Email exists
        } else {
          return of(false); // Email doesn't exist
        }
      }),
      catchError(() => of(false)) // Handle errors and return false
    );
  }
  
  get f() { return this.registrationForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    if (this.registrationForm.invalid) {
      return;
    }

    this.loading = true;
    this.usersService.register(this.registrationForm.value).subscribe(
      (response) => {
        console.log('Registration successful', response);
        this.router.navigate(['/dashboard']);
        this.loading = false;
      },
      (error) => {
        console.error('Registration failed', error);
        this.loading = false;
      }
    );
  }

  login() {
    this.router.navigate(['/login']);
  }
}

