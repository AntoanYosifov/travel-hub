import {Component, computed, effect, inject, OnInit, Signal} from '@angular/core';
import {AuthService} from "../../core/services/auth.service";
import {Router} from "@angular/router";
import {UserModel} from "../../models/user.model";

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  standalone: true,
  styleUrl: './profile.css'
})
export class Profile{

    readonly authResolved: Signal<boolean>;
    readonly isLoggedIn: Signal<boolean>;
    readonly profile: Signal<UserModel | null>;

    constructor(private authService: AuthService, private router: Router) {
            this.authResolved = this.authService.authResolved;
            this.isLoggedIn = this.authService.isLoggedIn;
            this.profile = this.authService.profileSignal;

        effect(() => {
            if (this.authResolved() && !this.isLoggedIn()) {
                this.router.navigate(['/login'])
            }
        })
    }


}
