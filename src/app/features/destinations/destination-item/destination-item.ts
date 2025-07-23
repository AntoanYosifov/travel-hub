import {Component, Input} from '@angular/core';
import {Destination} from "../../../models/destination.model";

@Component({
  selector: 'app-destination-item',
  imports: [],
  templateUrl: './destination-item.html',
  standalone: true,
  styleUrl: './destination-item.css'
})
export class DestinationItem {
  @Input() destination!: Destination;
}
