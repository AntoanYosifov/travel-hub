import {Component, Input} from '@angular/core';
import {DestinationItem} from "../destination-item/destination-item";
import {Destination} from "../../../models/destination.model";
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {list} from "@angular/fire/storage";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-destination-board',
  imports: [
    DestinationItem,
    AsyncPipe,
    RouterLink
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
