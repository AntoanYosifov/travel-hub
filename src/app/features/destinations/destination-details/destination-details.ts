import {Component, inject, OnInit} from '@angular/core';
import {DestinationItem} from "../destination-item/destination-item";
import {filter, map, Observable, switchMap} from "rxjs";
import {Destination} from "../../../models/destination.model";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {DestinationsService} from "../../../core/services/destinations.service";
import {AsyncPipe} from "@angular/common";
import {AuthService} from "../../../core/services/auth.service";
import {FormsModule} from "@angular/forms";
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-destination-details',
    imports: [DestinationItem, AsyncPipe, FormsModule],
    templateUrl: './destination-details.html',
    standalone: true,
    styleUrl: './destination-details.css'
})
export class DestinationDetails implements OnInit{

    constructor(private title: Title) {}

    ngOnInit(): void {
        this.title.setTitle('Details');
    }

    private route = inject(ActivatedRoute);
    private destinationService = inject(DestinationsService);
    private router = inject(Router);
    private auth = inject(AuthService);

    readonly profile = this.auth.profileSignal;

    readonly destination$: Observable<Destination | undefined> =
        this.route.paramMap.pipe(
            map(pm => pm.get('id')),
            filter((id): id is string => !!id),
            switchMap(id => this.destinationService.getDestinationById(id))
        );


    editing = false;
    draftDescription = '';

    startEdit(desc: string | undefined) {
        this.draftDescription = desc ?? '';
        this.editing = true;
    }

    cancelEdit() {
        this.editing = false;
    }

    saveDescription(id: string | undefined) {
        if (!id) return;
        const trimmed = this.draftDescription.trim();
        if (!trimmed) return;
        this.destinationService.updateDescription$(id, trimmed).subscribe({
            next: () => { this.editing = false; },
            error: err => alert('Update failed: ' + (err?.message ?? 'Unknown error'))
        });
    }

    onDelete(id: string | undefined): void {
        if (!id) {
            return;
        }

        if (!confirm('Delete this destination? This can not be undone!')) {
            return;
        }

        this.destinationService.deleteDestination$(id).subscribe({
            next: () => this.router.navigate(['/destinations']),
            error: err => alert('Delete failed: ' + (err?.message ?? 'Unknown error'))
        });
    }

}
