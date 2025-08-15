import {Component, inject, Input} from '@angular/core';
import {Destination} from "../../../models/destination.model";
import {RouterLink} from "@angular/router";
import {AuthService} from "../../../core/services/auth.service";
import {LikeButton} from "../like-button/like-button";

@Component({
    selector: 'app-destination-item',
    imports: [
        RouterLink,
        LikeButton
    ],
    templateUrl: './destination-item.html',
    standalone: true,
    styleUrl: './destination-item.css'
})
export class DestinationItem {
    @Input({required: true}) destination!: Destination;
    @Input() showDetailsLink = true;

    private authService = inject(AuthService);

    readonly user = this.authService.profileSignal;
}
