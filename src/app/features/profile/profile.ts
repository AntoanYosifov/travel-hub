import {Component, computed, inject} from '@angular/core';
import {AuthService} from "../../core/services/auth.service";

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  standalone: true,
  styleUrl: './profile.css'
})
export class Profile {
    private auth = inject(AuthService);

    readonly authResolved = this.auth.authResolved;
    readonly isLoggedIn = this.auth.isLoggedIn;
    readonly profile = this.auth.profileSignal;

}
