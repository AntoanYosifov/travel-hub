import {Component, effect, inject, Input, OnChanges, SimpleChanges} from '@angular/core';
import {BehaviorSubject, combineLatest, map, of, switchMap, take} from "rxjs";
import {DestinationsService} from "../../../core/services/destinations.service";
import {AsyncPipe} from "@angular/common";
import {AuthService} from "../../../core/services/auth.service";

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

    private authService = inject(AuthService);
    private destService = inject(DestinationsService);

    @Input({required: true}) destId!: string;

    private destId$ = new BehaviorSubject<string | null>(null);
    private uid$ = new BehaviorSubject<string | null>(null);

    uidPresent$ = this.uid$.pipe(map(uid => !!uid));

    likesCount$ = this.destId$.pipe(
        switchMap(id => id ? this.destService.likesCount$(id) : of(0))
    );

    hasLiked$ = combineLatest([this.destId$, this.uid$]).pipe(
        switchMap(([id, uid]) => (id && uid) ? this.destService.hasLiked$(id, uid) : of(false))
    );

    constructor() {
        effect(() => {
            const u = this.authService.userSignal();
            this.uid$.next(u?.uid ?? null);
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['destId']) {
            this.destId$.next(this.destId ?? null);
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
