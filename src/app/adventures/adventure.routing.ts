import { Routes } from '@angular/router';

import { OverviewComponent } from './overview/overview.component';
import { EncountersComponent } from './encounters/encounters.component';



export const AdventureRoutes: Routes = [

    {
        path: '',
        children: [{
            path: 'overview',
            component: OverviewComponent
        }]
    },
    {
        path: '',
        children: [{
            path: 'encounters',
            component: EncountersComponent
        }]
    }

];
