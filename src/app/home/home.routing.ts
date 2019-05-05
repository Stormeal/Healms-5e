import { Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { DmScreenComponent } from './dm-screen/dm-screen.component';

export const HomeRoutes: Routes = [

    {
        path: '',
        children: [{
            path: 'dashboard',
            component: HomeComponent
        }, ]
    },
    {
        path: '',
        children: [{
            path: 'screen',
            component: DmScreenComponent
        }, ]
    },
];
