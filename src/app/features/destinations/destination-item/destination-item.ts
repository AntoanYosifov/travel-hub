import {Component, Input} from '@angular/core';
import {Destination} from "../../../models/destination.model";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-destination-item',
  imports: [
    RouterLink
  ],
  templateUrl: './destination-item.html',
  standalone: true,
  styleUrl: './destination-item.css'
})
export class DestinationItem {
  @Input() destination!: Destination;
}
