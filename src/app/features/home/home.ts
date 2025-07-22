import { Component } from '@angular/core';
import {DestinationBoard} from "../destinations/destination-board/destination-board";

@Component({
  selector: 'app-home',
    imports: [
        DestinationBoard
    ],
  templateUrl: './home.html',
  standalone: true,
  styleUrl: './home.css'
})
export class Home {

}
