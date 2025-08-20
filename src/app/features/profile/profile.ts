import {Component, effect, OnInit, Signal} from '@angular/core';
import {AuthService} from "../../core/services/auth.service";
import {Router} from "@angular/router";
import {UserModel} from "../../models/user.model";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-profile',
    imports: [
        ReactiveFormsModule
    ],
  templateUrl: './profile.html',
  standalone: true,
  styleUrl: './profile.css'
})
export class Profile implements OnInit{
    form: FormGroup;

    readonly authResolved: Signal<boolean>;
    readonly isLoggedIn: Signal<boolean>;
    readonly profile: Signal<UserModel | null>;

    isEdit = false
    constructor(private authService: AuthService, private router: Router, private formBuilder : FormBuilder, private title: Title) {
            this.authResolved = this.authService.authResolved;
            this.isLoggedIn = this.authService.isLoggedIn;
            this.profile = this.authService.profileSignal;
            this.form = this.formBuilder.nonNullable.group({
                displayName: ['', [Validators.required, Validators.minLength(5)]]
            });

        effect(() => {
            if (this.authResolved() && !this.isLoggedIn()) {
                this.router.navigate(['/login'])
            }
        })

        effect(() => {
            const p = this.profile();
            if(!this.isEdit && p) {
                this.form.patchValue({displayName: p.displayName ?? ''}, {emitEvent: false})
            }
        });
    }

    ngOnInit(): void {
        this.title.setTitle('Profile');
    }

    startEdit() {
        const p = this.profile();
        this.form.patchValue({ displayName: p?.displayName ?? '' });
        this.isEdit = true;
    }

    cancelEdit() {
        this.isEdit = false;
        const p = this.profile();
        this.form.reset({ displayName: p?.displayName ?? '' });
    }

    save() {
        if (this.form.invalid) return;
        const name = this.form.controls['displayName'].value.trim();
        if (!name) return;

        this.authService.updateDisplayName$(name).subscribe({
            next: () => {
                this.isEdit = false;
            },
            error: (e) => console.error('Failed to update display name', e),
        });
    }
    get nameInvalid() {
        const c = this.form.controls['displayName'];
        return c.invalid && (c.dirty || c.touched);
    }
}
