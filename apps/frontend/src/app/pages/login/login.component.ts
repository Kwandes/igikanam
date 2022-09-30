import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ILoginResponse } from '@igikanam/interfaces';
import { LocalStorageService, LocalStorageVars } from '@igikanam/local-storage';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'igikanam-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: UntypedFormGroup;
  /**
   * Small object used to show simple alerts to the user
   */
  alert?: { message: string; type: 'error' | 'info' };
  /**
   * Is set to true when certain actions like pressing the login button shouldn't be possible due to data loading / waiting for request result.
   */
  isLoading = false;
  isLoggedIn = false;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly localStorageService: LocalStorageService
  ) {}

  /**
   * Initialize the login form
   */
  ngOnInit(): void {
    this.loginForm = new UntypedFormGroup({
      email: new UntypedFormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ]),
    });
    this.isLoggedIn =
      this.localStorageService.getItem<ILoginResponse>(
        LocalStorageVars.accessTokenInfo
      )?.value != null;
  }

  /**
   *  Sign in the user with the credentials from the form.
   */
  async onSubmit(): Promise<void> {
    if (this.loginEnabled()) {
      console.warn('Tried to submit an invalid/dirty login form');

      return;
    }
    this.isLoading = true;
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    this.authService.login({ email: email, password: password }).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.alert = {
          message: `Logged in as ${email}:${password}. Role: ${response.role}`,
          type: 'info',
        };
        this.authService.saveAccessInfo({
          accessToken: response.accessToken,
          role: response.role,
        });
        // Redirect the user to the roles' page
        this.router.navigate(['/characters']);
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.isLoading = false;
        this.alert = {
          message:
            err.status === 401
              ? `Failed to log in due to invalid credentials`
              : 'Failed to log in',
          type: 'error',
        };
      },
    });
  }

  /**
   * Check whether the login forms' state allows logging in.
   * @returns whether it is possible to log in.
   */
  loginEnabled(): boolean {
    return !(this.isLoading || (this.loginForm.valid && this.loginForm.dirty));
  }

  /**
   * Allow pressing the log in button by pressing enter while the credentials are valid.
   */
  @HostListener('document:keydown.enter') enterKeyPressed() {
    if (this.loginEnabled()) {
      this.onSubmit();
    }
  }

  getAccessInfo(): ILoginResponse | null {
    return this.authService.getAccessInfo();
  }
}
