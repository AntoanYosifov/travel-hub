// core/guards/auth.guards.ts
import { CanMatchFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map, take } from 'rxjs';

export const authGuard: CanMatchFn = () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    return toObservable(auth.authResolved).pipe(
        filter(Boolean),
        take(1),
        map(() => (auth.isLoggedIn() ? true : router.createUrlTree(['/login'])))
    );
};

export const guestGuard: CanMatchFn = () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    return toObservable(auth.authResolved).pipe(
        filter(Boolean),
        take(1),
        map(() => (!auth.isLoggedIn() ? true : router.createUrlTree(['/home'])))
    );
};
