import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Header} from "./shared/components/header/header";
import {Footer} from "./shared/components/footer/footer";
import {SeedService} from "./core/seed.service";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true
})
export class App implements OnInit{
  protected title = 'TravelHub';

  constructor(private seed: SeedService) {}

  ngOnInit(): void {
        this.seed.seedOnce();
    }


}
