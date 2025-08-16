import {Component, inject} from '@angular/core';
import {DestinationBoard} from "../destinations/destination-board/destination-board";
import {DestinationsService} from "../../core/services/destinations.service";
import {Observable} from "rxjs";
import {Destination} from "../../models/destination.model";

@Component({
    selector: 'app-home',
    imports: [
        DestinationBoard
    ],
    templateUrl: './home.html',
    standalone: true,
    styleUrl: './home.css'
})
export class Home {

    private destinationsService = inject(DestinationsService)
    destinations$: Observable<Destination[]> = this.destinationsService.getDestinations();
}
