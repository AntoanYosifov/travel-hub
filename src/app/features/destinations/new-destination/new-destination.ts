import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {DestinationsService} from "../../../core/services/destinations.service";
import {Router} from "@angular/router";
import {Destination} from "../../../models/destination.model";

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

    constructor(private formBuilder: FormBuilder,
                private destinationService: DestinationsService,
                private router: Router) {
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

        const data: Omit<Destination, 'id'> = this.form.value;

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
