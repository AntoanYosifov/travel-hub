import {Component, OnDestroy, OnInit} from '@angular/core';
import {DestinationItem} from "../destination-item/destination-item";
import {DestinationsService} from "../../../core/services/destinations.service";
import {Destination} from "../../../models/destination.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-destination-board',
  imports: [
    DestinationItem
  ],
  templateUrl: './destination-board.html',
  standalone: true,
  styleUrl: './destination-board.css'
})
export class DestinationBoard implements OnInit, OnDestroy{

  destinations: Destination[] = [];
  private sub!: Subscription;
  constructor(private destinationsService: DestinationsService) {}

  ngOnInit(): void {
        this.sub = this.destinationsService.getDestinations()
            .subscribe((data) => {
              this.destinations = data;
            });
    }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
