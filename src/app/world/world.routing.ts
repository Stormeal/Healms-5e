import { Routes } from '@angular/router';

import { OverviewComponent } from './overview/overview.component';
import { ReligionsComponent } from './religions/religions.component';
import { CitiesComponent } from './cities/cities.component';

export const WorldRoutes: Routes = [
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
            path: 'religions',
            component: ReligionsComponent
        }]
    },
    {
        path: '',
        children: [{
            path: 'cities',
            component: CitiesComponent
        }]
    }

];
