import {Component, Signal} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {AuthService} from "../../../core/services/auth.service";
import {UserModel} from "../../../models/user.model";
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
  ],
  animations: [
    trigger('logoHover', [
      state('rest',  style({ transform: 'translateZ(0) scale(1)',    textShadow: 'none' })),
      state('hover', style({ transform: 'translateZ(0) scale(1.04)', textShadow: '0 0 12px rgba(88,166,255,.45)' })),
      transition('rest <=> hover', animate('160ms ease-out')),
    ]),
    trigger('logoEnter', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-6px)' }),
        animate('280ms 80ms ease-out', style({ opacity: 1, transform: 'none' })),
      ])
    ])
  ],
  templateUrl: './header.html',
  standalone: true,
  styleUrl: './header.css'
})
export class Header {
    readonly authResolved: Signal<boolean>;
    readonly isLoggedIn: Signal<boolean>;
    readonly profile:Signal<UserModel | null>;

    isLogoHover = false;

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
