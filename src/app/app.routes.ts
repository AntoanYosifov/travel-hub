import {Routes} from '@angular/router';
import {authGuard, guestGuard} from "./core/guards/auth.guards";

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent:
            () => import('./features/home/home').then(c => c.Home)
    },
    {
        path: 'destinations',
        children: [
            {
                path: '',
                loadComponent:
                    () => import('./features/destinations/all-destinations/all-destinations').then(c => c.AllDestinations)
            },
            {
                path: 'new',
                canMatch: [authGuard],
                loadComponent:
                    () => import('./features/destinations/new-destination/new-destination').then(c => c.NewDestination)
            },
            {
                path: ':id',
                loadComponent:
                    () => import('./features/destinations/destination-details/destination-details').then(c => c.DestinationDetails)
            },
        ]
    },
    {
        path: 'register',
        canMatch: [guestGuard],
        loadComponent: () => import('./features/auth/register/register').then(c => c.Register)
    },
    {
        path: 'login',
        canMatch: [guestGuard],
        loadComponent: () => import('./features/auth/login/login').then(c => c.Login)
    },
    {
        path: 'profile',
        canMatch: [authGuard],
        loadComponent: () => import('./features/profile/profile').then(c => c.Profile)
    },
    {
        path: 'collections/want-to-visit',
        canMatch: [authGuard],
        loadComponent: () => import('./features/collections/want-to-visit/want-to-visit').then(c => c.WantToVisit)
    },
    {
        path: 'collections/added-by-you',
        canMatch: [authGuard],
        loadComponent: () => import('./features/collections/added-by-you/added-by-you').then(c => c.AddedByYou)
    },
    {
        path: 'collections/liked',
        canMatch: [authGuard],
        loadComponent: () => import('./features/collections/liked/liked').then(c => c.Liked)
    },
    {
        path: '**',
        loadComponent: () => import('./features/errors/not-found/not-found').then(c => c.NotFound)
    }

];
