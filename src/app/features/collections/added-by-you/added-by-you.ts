import {Component, inject} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {CollectionsService} from "../../../core/services/collections.service";
import {Observable, of, switchMap} from "rxjs";
import {Destination} from "../../../models/destination.model";
import {DestinationBoard} from "../../destinations/destination-board/destination-board";

@Component({
  selector: 'app-added-by-you',
  imports: [
    DestinationBoard
  ],
  templateUrl: './added-by-you.html',
  standalone: true,
  styleUrl: './added-by-you.css'
})
export class AddedByYou {
  private authService = inject(AuthService);
  private collectionsService = inject(CollectionsService);

  readonly destinations$: Observable<Destination[]> =
      this.authService.uidOptional$.pipe(
          switchMap(uid => uid ? this.collectionsService.getAddedByYou$(uid) : of([]))
      );
}
