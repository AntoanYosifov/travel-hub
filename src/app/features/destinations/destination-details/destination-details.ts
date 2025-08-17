import {Component, inject} from '@angular/core';
import {DestinationItem} from "../destination-item/destination-item";
import {filter, map, Observable, switchMap} from "rxjs";
import {Destination} from "../../../models/destination.model";
import {ActivatedRoute} from "@angular/router";
import {DestinationsService} from "../../../core/services/destinations.service";
import {AsyncPipe} from "@angular/common";

@Component({
    selector: 'app-destination-details',
    imports: [DestinationItem, AsyncPipe],
    templateUrl: './destination-details.html',
    standalone: true,
    styleUrl: './destination-details.css'
})
export class DestinationDetails  {

    private route = inject(ActivatedRoute);
    private destinationService = inject(DestinationsService);

    readonly destination$: Observable<Destination | undefined> =
        this.route.paramMap.pipe(
            map(pm => pm.get('id')),
            filter((id): id is string => !!id),
            switchMap(id => this.destinationService.getDestinationById(id))
        );

}
