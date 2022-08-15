import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthResponse } from './models/auth-response.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  public isLoginMode = true;
  public isLoading = false;
  public error: string | null = null;
  public signForm: FormGroup;

  constructor(private authService: AuthService) {}

  public ngOnInit(): void {
    this.signForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  public onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  public onSubmit() {
    if (this.signForm.invalid) return;
    const { email, password } = this.signForm.value;
    this.isLoading = true;

    let authObs: Observable<AuthResponse>;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }

    authObs
      .subscribe(
        (response) => {
          console.log(response);
          this.isLoading = false;
        },
        (errorMessage) => {
          this.error = errorMessage;
          this.isLoading = false;
        }
      );

    this.error = null;
    this.signForm.reset();
  }
}
