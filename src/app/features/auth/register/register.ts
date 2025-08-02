import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
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
                password: ['', Validators.required]
            }
        )
    }

    get displayName(): AbstractControl<any,any> | null  {
        return this.registerForm.get('displayName');
    }

    get email(): AbstractControl<any,any> | null  {
        return this.registerForm.get('email');
    }

    get password(): AbstractControl<any,any> | null  {
        return this.registerForm.get('password');
    }

    get isDisplayNameNotValid() : boolean {
        return this.displayName?.invalid && (this.displayName?.dirty || this.displayName?.touched) || false;
    }

    get isEmailNotValid() : boolean {
        return this.email?.invalid && (this.email?.dirty || this.email?.touched) || false;
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
        if(this.email?.errors?.['required']) {
            return 'Email is required';
        }

        if(this.email?.errors?.['pattern']) {
            return 'Email is not valid';
        }

        return '';
    }

    onSubmit() {
        if (this.registerForm.invalid) {
            this.registerForm.markAllAsTouched();
            return;
        }

        const {displayName, email, password} = this.registerForm.value;

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
}
