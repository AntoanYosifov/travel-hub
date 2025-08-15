import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {BehaviorSubject, combineLatest, of, switchMap, take} from "rxjs";
import {DestinationsService} from "../../../core/services/destinations.service";
import {AsyncPipe} from "@angular/common";

@Component({
    selector: 'app-like-button',
    imports: [
        AsyncPipe
    ],
    templateUrl: './like-button.html',
    standalone: true,
    styleUrl: './like-button.css'
})
export class LikeButton implements OnChanges {
    @Input({required: true}) destId!: string;
    @Input() uid: string | null = null;

    private destId$ = new BehaviorSubject<string | null>(null);
    private uid$ = new BehaviorSubject<string | null>(null);

    likesCount$ = this.destId$.pipe(
        switchMap(id => id ? this.destService.likesCount$(id) : of(0))
    );

    hasLiked$ = combineLatest([this.destId$, this.uid$]).pipe(
        switchMap(([id, uid]) => (id && uid) ? this.destService.hasLiked$(id, uid) : of(false))
    );

    constructor(private destService: DestinationsService) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['destId']) {
            this.destId$.next(this.destId ?? null);
        }
        if (changes['uid']) {
            this.uid$.next(this.uid ?? null);
        }
    }

    toggleLike(): void {
        const id = this.destId$.value;
        const uid = this.uid$.value;

        if (!id || !uid) {
            console.error('Missing destination || user ids');
            console.log(`Destination id -> ${id} | User id -> ${uid}`);
            return;
        }

        this.hasLiked$.pipe(take(1)).subscribe(liked => {
            (liked ? this.destService.unlike$(id, uid) : this.destService.like$(id, uid))
                .pipe(take(1))
                .subscribe();
        })
    }

}
