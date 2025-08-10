import {Component, Signal} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../../core/services/auth.service";
import {UserModel} from "../../../models/user.model";

@Component({
  selector: 'app-header',
    imports: [
        RouterLink
    ],
  templateUrl: './header.html',
  standalone: true,
  styleUrl: './header.css'
})
export class Header {
    readonly authResolved: Signal<boolean>;
    readonly isLoggedIn: Signal<boolean>;
    readonly profile:Signal<UserModel | null>;

    constructor(private authService: AuthService, private router: Router) {
      this.authResolved = authService.authResolved;
      this.isLoggedIn = authService.isLoggedIn;
      this.profile = authService.profileSignal;
    }

    logout() {
      this.authService.logout$().subscribe({
        next: () => {
            this.router.navigate(['/home'])
        },
        error: err => {
          console.error('Logout failed!',err)
        }
      });
    }
}
