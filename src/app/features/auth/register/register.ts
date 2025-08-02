import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
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
                displayName: ['', Validators.required],
                email: ['', Validators.required],
                password: ['', Validators.required]
            }
        )
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
