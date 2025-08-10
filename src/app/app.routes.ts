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
                    () => import('./features/destinations/destination-board/destination-board').then(c => c.DestinationBoard)
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
    }

];
