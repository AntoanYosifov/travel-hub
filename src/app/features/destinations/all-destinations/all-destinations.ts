import {Component, inject, OnInit} from '@angular/core';
import {DestinationsService} from "../../../core/services/destinations.service";
import {Observable} from "rxjs";
import {Destination} from "../../../models/destination.model";
import {DestinationBoard} from "../destination-board/destination-board";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-all-destinations',
  imports: [
    DestinationBoard
  ],
  templateUrl: './all-destinations.html',
  standalone: true,
  styleUrl: './all-destinations.css'
})
export class AllDestinations implements OnInit{

  constructor(private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('All Destinations');
  }

  private destinationsService = inject(DestinationsService)
  destinations$: Observable<Destination[]> = this.destinationsService.getDestinations();
}
