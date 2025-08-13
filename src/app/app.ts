import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Header} from "./shared/components/header/header";
import {Footer} from "./shared/components/footer/footer";

import {Auth} from "@angular/fire/auth";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true
})
export class App {
  protected title = 'TravelHub';

  constructor(private auth: Auth) {
    // signInAnonymously(this.auth).then(cred => console.log('anon uid= ', cred.user.uid))
    //     .catch(err => console.error('Anon sign in failed ', err));
  }

}
