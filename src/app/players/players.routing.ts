import { Routes } from '@angular/router';

import { PlayersComponent } from './players.component';

export const PlayersRoutes: Routes = [

    {
        path: '',
        children: [{
            path: '',
            component: PlayersComponent
        }]
    },
];
