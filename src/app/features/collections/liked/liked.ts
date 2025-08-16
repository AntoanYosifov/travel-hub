import {Component, inject} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {CollectionsService} from "../../../core/services/collections.service";
import {Observable, of, switchMap} from "rxjs";
import {Destination} from "../../../models/destination.model";
import {DestinationBoard} from "../../destinations/destination-board/destination-board";

@Component({
  selector: 'app-liked',
  imports: [
    DestinationBoard
  ],
  templateUrl: './liked.html',
  standalone: true,
  styleUrl: './liked.css'
})
export class Liked {
  private authService = inject(AuthService);
  private collectionsService = inject(CollectionsService);

  readonly destinations$: Observable<Destination[]> =
      this.authService.uidOptional$.pipe(
          switchMap(uid => uid ? this.collectionsService.getLikedByUser$(uid) : of([]))
      );
}
