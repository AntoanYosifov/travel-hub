import {Component, inject, Input} from '@angular/core';
import {Destination} from "../../../models/destination.model";
import {RouterLink} from "@angular/router";
import {AuthService} from "../../../core/services/auth.service";
import {LikeButton} from "../like-button/like-button";
import {WtvButton} from "../wtv-button/wtv-button";

@Component({
    selector: 'app-destination-item',
    imports: [
        RouterLink,
        LikeButton,
        WtvButton,
    ],
    templateUrl: './destination-item.html',
    standalone: true,
    styleUrl: './destination-item.css'
})
export class DestinationItem {
    @Input({required: true}) destination!: Destination;
    @Input() showDetailsLink = true;
    @Input() variant: 'card' | 'detail' = 'card';
    @Input() compact = false;

    private authService = inject(AuthService);

    readonly profile = this.authService.profileSignal;
}
