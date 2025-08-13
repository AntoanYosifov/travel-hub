import {Component, Signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {DestinationsService} from "../../../core/services/destinations.service";
import {Router} from "@angular/router";
import {Destination} from "../../../models/destination.model";
import {AuthService} from "../../../core/services/auth.service";
import {UserModel} from "../../../models/user.model";

@Component({
    selector: 'app-new-destination',
    imports: [
        ReactiveFormsModule
    ],
    templateUrl: './new-destination.html',
    standalone: true,
    styleUrl: './new-destination.css'
})
export class NewDestination {

    form: FormGroup;
    readonly profile: Signal<UserModel | null>;

    constructor(private formBuilder: FormBuilder,
                private destinationService: DestinationsService,
                private router: Router,
                private authService: AuthService) {

        this.profile = this.authService.profileSignal;

        this.form = this.formBuilder.group(
            {
                locationName: ['', Validators.required],
                description: ['', Validators.required],
                imgUrl: ['', Validators.required],
                photoCredit: ['']
            }
        )
    }

    onSubmit(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        const currentUser = this.profile();
        if(!currentUser) {
            console.error('No logged-in user');
            return;
        }

        const v = this.form.getRawValue();

        const data: Omit<Destination, 'id'> = {
            locationName: v.locationName,
            description: v.description,
            imgUrl: v.imgUrl,
            photoCredit: v.photoCredit,
            authorId: currentUser.uid,
            authorName: currentUser.displayName
        };

        this.destinationService.addDestination(data).subscribe({
            next: newDest => {
                this.router.navigate(['/destinations'])
            },
            error: err => {
                console.error('Failed to add destination', err);
            }
        })
    }
}
