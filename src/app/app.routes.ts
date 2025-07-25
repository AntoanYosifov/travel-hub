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
                path: ':id',
                loadComponent:
                    () => import('./features/destinations/destination-details/destination-details').then(c => c.DestinationDetails)
            }

        ]
    }

];
