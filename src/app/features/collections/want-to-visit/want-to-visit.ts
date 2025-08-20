import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {CollectionsService} from "../../../core/services/collections.service";
import {Observable, of, switchMap} from "rxjs";
import {Destination} from "../../../models/destination.model";
import {DestinationBoard} from "../../destinations/destination-board/destination-board";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-want-to-visit',
    imports: [
        DestinationBoard
    ],
  templateUrl: './want-to-visit.html',
  standalone: true,
  styleUrl: './want-to-visit.css'
})
export class WantToVisit implements OnInit{
    private authService = inject(AuthService);
    private collectionsService = inject(CollectionsService);

  constructor(private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('Want to visit');
  }

    readonly destinations$: Observable<Destination[]> =
        this.authService.uidOptional$.pipe(
            switchMap(uid => uid ? this.collectionsService.getWantToVisit$(uid) : of([]))
        );
}