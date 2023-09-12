import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../_services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  
  registrationForm: FormGroup;
  loading = false;

  constructor(private formBuilder: FormBuilder, private usersService: UsersService) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      fullName: ['John Doe', Validators.required],
      email: ['johndoe@gmail.com', [Validators.required, Validators.email]],
      phoneNumber: ['08137800667', Validators.required],
      password: ['vegetable01', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['vegetable01', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.registrationForm.invalid) {
      return;
    }

    if (this.registrationForm.value.password !== this.registrationForm.value.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    this.loading = true;
    this.usersService.register(this.registrationForm.value).subscribe(
      (response) => {
        console.log('Registration successful', response);
        this.loading = false;
      },
      (error) => {
        console.error('Registration failed', error);
      }
    );
  }
}
