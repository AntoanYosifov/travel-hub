import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DestinationItem} from "../destination-item/destination-item";
import {DestinationsService} from "../../../core/services/destinations.service";
import {Destination} from "../../../models/destination.model";
import {Observable, Subscription} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {list} from "@angular/fire/storage";

@Component({
    selector: 'app-destination-board',
    imports: [
        DestinationItem,
        AsyncPipe
    ],
    templateUrl: './destination-board.html',
    standalone: true,
    styleUrl: './destination-board.css'
})
export class DestinationBoard {

    @Input({required: true}) destinations$!: Observable<Destination[]>;
    @Input() title = '';
    @Input() emptyText = 'No items yet.';
    protected readonly list = list;
}
