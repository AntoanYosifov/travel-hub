import {Component} from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    ValidationErrors,
    Validators
} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../../core/services/auth.service";

@Component({
    selector: 'app-register',
    imports: [ReactiveFormsModule, FormsModule, RouterLink],
    templateUrl: './register.html',
    standalone: true,
    styleUrl: './register.css'
})
export class Register {
    registerForm: FormGroup;
    error: string | null = null;

    constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
        this.registerForm = this.formBuilder.group(
            {
                displayName: ['', [Validators.required, Validators.minLength(5)]],
                email: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)]],
                passwords: this.formBuilder.group({
                    password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^[a-zA-Z0-9]+$/)]],
                    rePassword: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^[a-zA-Z0-9]+$/)]]
                }, {validators: this.passwordMatchValidator})
            }
        )
    }

    get displayName(): AbstractControl<any, any> | null {
        return this.registerForm.get('displayName');
    }

    get email(): AbstractControl<any, any> | null {
        return this.registerForm.get('email');
    }

    get passwords(): FormGroup<any> {
        return this.registerForm.get('passwords') as FormGroup;
    }

    get password(): AbstractControl<any, any> | null {
        return this.passwords.get('password');
    }

    get rePassword(): AbstractControl<any, any> | null {
        return this.passwords.get('rePassword');
    }


    get isDisplayNameNotValid(): boolean {
        return this.displayName?.invalid && (this.displayName?.dirty || this.displayName?.touched) || false;
    }

    get isEmailNotValid(): boolean {
        return this.email?.invalid && (this.email?.dirty || this.email?.touched) || false;
    }

    get isPasswordsNotValid(): boolean {
        return this.passwords?.invalid && (this.passwords?.dirty || this.passwords?.touched) || false;
    }

    get isPasswordsMismatch(): boolean {
        const mismatch = this.passwords.errors?.['passwordMismatch'];
        const reTouched = this.rePassword?.dirty || this.rePassword?.touched;

        return !!(mismatch && reTouched);
    }

    get displayNameErrorMessage(): string {
        if (this.displayName?.errors?.['required']) {
            return 'Display Name is required!';
        }
        if (this.displayName?.errors?.['minlength']) {
            return 'Minimum of 5 characters!';
        }
        return '';
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
            return 'Password must contain only Latin letters and numbers (no spaces or special characters).';
        }

        return '';
    }

    get rePasswordErrorMessage(): string {
        if (this.rePassword?.errors?.['required']) {
            return 'You must confirm your password!';
        }

        if (this.rePassword?.errors?.['minlength']) {
            return 'Password must be at least 6 characters!';
        }
        if (this.rePassword?.errors?.['pattern']) {
            return 'Password must contain only Latin letters and numbers (no spaces or special characters).';
        }

        return '';
    }

    get passwordsMismatchErrorMessage(): string {
        return 'Passwords do not match!';
    }

    onSubmit() {
        if (this.registerForm.invalid) {
            this.registerForm.markAllAsTouched();
            return;
        }

        const {displayName, email, passwords} = this.registerForm.value;
        const password = passwords.password;

        this.authService.register$(displayName, email, password).subscribe(
            {
                next: () => {
                    this.router.navigate(['/'])
                },
                error: err => {
                    this.error = err.message ?? 'Failed to register';
                    console.error(this.error);
                }
            }
        )
    }

    private passwordMatchValidator(passwordsControl: AbstractControl): ValidationErrors | null {
        const password = passwordsControl.get('password');
        const rePassword = passwordsControl.get('rePassword');

        if(password && rePassword && password.value !== rePassword.value) {
            return {passwordMismatch: true}
        }

        return null;
    }
}
