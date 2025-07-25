import {Component, OnDestroy, OnInit} from '@angular/core';
import {DestinationItem} from "../destination-item/destination-item";
import {Subscription} from "rxjs";
import {Destination} from "../../../models/destination.model";
import {ActivatedRoute} from "@angular/router";
import {DestinationsService} from "../../../core/services/destinations.service";

@Component({
    selector: 'app-destination-details',
    imports: [DestinationItem],
    templateUrl: './destination-details.html',
    standalone: true,
    styleUrl: './destination-details.css'
})
export class DestinationDetails implements OnInit, OnDestroy{
    destination?: Destination;
    private routeSub?: Subscription;
    private dataSub?: Subscription;

    constructor(private route: ActivatedRoute,
                private destinationService: DestinationsService) {}


    ngOnInit(): void {
        this.routeSub = this.route.paramMap.subscribe(pm => {
            const id = pm.get('id');

            if(!id) {
                console.log('Missing id');
                return
            }

            console.log(id);

            this.dataSub?.unsubscribe();
            this.destination = undefined;

            this.dataSub = this.destinationService.getDestinationById(id)
                .subscribe(dest => {
                    this.destination = dest ?? undefined;
                })
        })
    }

    ngOnDestroy(): void {
       this.routeSub?.unsubscribe();
       this.dataSub?.unsubscribe();
    }

}
