import { Component } from '@angular/core';
import {DestinationItem} from "../destination-item/destination-item";

@Component({
  selector: 'app-destination-board',
  imports: [
    DestinationItem
  ],
  templateUrl: './destination-board.html',
  standalone: true,
  styleUrl: './destination-board.css'
})
export class DestinationBoard {

}
