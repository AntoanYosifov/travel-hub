import {Component, effect, inject, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Destination} from "../../../models/destination.model";
import {CollectionsService} from "../../../core/services/collections.service";
import {AuthService} from "../../../core/services/auth.service";
import {BehaviorSubject, map, combineLatest, switchMap, of, Observable, take} from "rxjs";
import {AsyncPipe} from "@angular/common";

@Component({
    selector: 'app-wtv-button',
    imports: [
        AsyncPipe
    ],
    templateUrl: './wtv-button.html',
    standalone: true,
    styleUrl: './wtv-button.css'
})
export class WtvButton implements OnChanges {

    @Input({required: true}) destination!: Destination;
    private collectionService = inject(CollectionsService);
    private authService = inject(AuthService);

    private dest$ = new BehaviorSubject<Destination | null>(null);
    private destId$ = this.dest$.pipe(map(d => d?.id ?? null));

    private uid$ = new BehaviorSubject<string | null>(null);
    uidPresent$ = this.uid$.pipe(map(Boolean));

    constructor() {
        effect(() => {
            const u = this.authService.userSignal();
            this.uid$.next(u?.uid ?? null);
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['destination']) this.dest$.next(this.destination ?? null);
    }

    has$: Observable<Boolean> = combineLatest([this.uid$, this.destId$]).pipe(
        switchMap(([uid, id]) =>
            (uid && id) ? this.collectionService.hasWantToVisit$(uid, id) : of(false)
        )
    );

    toggle(): void {
        combineLatest([this.uid$, this.dest$, this.destId$, this.has$]).pipe(take(1))
            .subscribe(([uid, dest, id, has]) => {
                if (!uid || !dest || !id) return;

                const operation$ = has
                    ? this.collectionService.removeWantToVisit$(uid, id)
                    : this.collectionService.addWantToVisit$(uid, dest);

                operation$.pipe(take(1)).subscribe();
            });
    }

}
