import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../core/services/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    imports: [
        ReactiveFormsModule
    ],
    templateUrl: './login.html',
    standalone: true,
    styleUrl: './login.css'
})
export class Login {
    loginForm: FormGroup;
    error: string | null = null;

    private readonly firebaseErrorMessages: Record<string, string> = {
        'auth/invalid-email': 'Please enter a valid email address.',
        'auth/invalid-credential': 'Incorrect email or password. Please try again.',
        'auth/too-many-requests': 'Too many failed attempts. Please try again later.'
    };

    constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
        this.loginForm = this.formBuilder.group(
            {
                email: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)]],
                password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^[a-zA-Z0-9]+$/)]]
            }
        )
    }

    get email(): AbstractControl<any, any> | null {
        return this.loginForm.get('email');
    }

    get password(): AbstractControl<any, any> | null {
        return this.loginForm.get('password');
    }

    get isEmailNotValid(): boolean {
        return this.email?.invalid && (this.email?.dirty || this.email?.touched) || false;
    }

    get isPasswordNotValid(): boolean {
        return this.password?.invalid && (this.password?.dirty || this.password?.touched) || false;
    }

    get emailErrorMessage(): string {
        if (this.email?.errors?.['required']) {
            return 'Email is required';
        }

        if (this.email?.errors?.['pattern']) {
            return 'Email is not valid';
        }

        return '';
    }

    get passwordErrorMessage(): string {
        if (this.password?.errors?.['required']) {
            return 'Password is required';
        }

        if (this.password?.errors?.['minlength']) {
            return 'Password must be at least 6 characters!';
        }

        if (this.password?.errors?.['pattern']) {
            return 'Password must contain only Latin letters and numbers (no spaces or special characters).!';
        }

        return '';
    }

    onSubmit() {
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            return;
        }

        const {email, password} = this.loginForm.value;

        this.authService.login$(email, password).subscribe(
            {
                next: () => {
                    this.router.navigate(['/'])
                },
                error: err => {
                    this.error = err.message ?? 'Login failed';
                    console.error(this.error);
                    this.error = this.firebaseErrorMessages[err.code] || 'Login failed. Please try again.';
                    this.password?.reset();
                }
            }
        )
    }
}
