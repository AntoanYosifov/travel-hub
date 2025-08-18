import {Component, inject} from '@angular/core';
import {DestinationBoard} from "../destinations/destination-board/destination-board";
import {DestinationsService} from "../../core/services/destinations.service";
import {map, Observable} from "rxjs";
import {Destination} from "../../models/destination.model";
import {list} from "@angular/fire/storage";
import {RouterLink} from "@angular/router";
import {AuthService} from "../../core/services/auth.service";

@Component({
    selector: 'app-home',
    imports: [
        DestinationBoard,
        RouterLink
    ],
    templateUrl: './home.html',
    standalone: true,
    styleUrl: './home.css'
})
export class Home {

    private auth = inject(AuthService);
    private destinationsService = inject(DestinationsService)

    readonly authResolved = this.auth.authResolved;
    readonly isLoggedIn = this.auth.isLoggedIn;

    destinationsLimited$: Observable<Destination[]> =
        this.destinationsService.getDestinations()
            .pipe(map(list => list.slice(0, 3)));
}
