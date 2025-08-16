import {Component, inject} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {CollectionsService} from "../../../core/services/collections.service";
import {Observable, of, switchMap} from "rxjs";
import {Destination} from "../../../models/destination.model";
import {DestinationBoard} from "../../destinations/destination-board/destination-board";

@Component({
  selector: 'app-want-to-visit',
    imports: [
        DestinationBoard
    ],
  templateUrl: './want-to-visit.html',
  standalone: true,
  styleUrl: './want-to-visit.css'
})
export class WantToVisit {
    private authService = inject(AuthService);
    private collectionsService = inject(CollectionsService);

    readonly destinations$: Observable<Destination[]> =
        this.authService.uidOptional$.pipe(
            switchMap(uid => uid ? this.collectionsService.getWantToVisit$(uid) : of([]))
        );
}