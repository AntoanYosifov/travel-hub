import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {CollectionsService} from "../../../core/services/collections.service";
import {Observable, of, switchMap} from "rxjs";
import {Destination} from "../../../models/destination.model";
import {DestinationBoard} from "../../destinations/destination-board/destination-board";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-added-by-you',
  imports: [
    DestinationBoard
  ],
  templateUrl: './added-by-you.html',
  standalone: true,
  styleUrl: './added-by-you.css'
})
export class AddedByYou implements OnInit{
  private authService = inject(AuthService);
  private collectionsService = inject(CollectionsService);

  constructor(private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('Added by you');
  }
  readonly destinations$: Observable<Destination[]> =
      this.authService.uidOptional$.pipe(
          switchMap(uid => uid ? this.collectionsService.getAddedByYou$(uid) : of([]))
      );
}
