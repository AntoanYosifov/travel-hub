import {Routes} from '@angular/router';

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
        loadComponent: () => import('./features/auth/register/register').then(c => c.Register)
    },
    {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login').then(c => c.Login)
    },
    {
        path: 'profile',
        loadComponent: () => import('./features/profile/profile').then(c => c.Profile)
    },
    {
        path: 'collections',
        children: [
            {
                path: 'want-to-visit',
                loadComponent: () => import('./features/collections/want-to-visit/want-to-visit').then(c => c.WantToVisit)
            },
            {
                path: 'added-by-you',
                loadComponent: () => import('./features/collections/added-by-you/added-by-you').then(c => c.AddedByYou)
            }
        ]
    }

];
