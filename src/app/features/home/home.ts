import { Component } from '@angular/core';
import {Destination} from "../destination/destination";

@Component({
  selector: 'app-home',
    imports: [
        Destination
    ],
  templateUrl: './home.html',
  standalone: true,
  styleUrl: './home.css'
})
export class Home {

}
