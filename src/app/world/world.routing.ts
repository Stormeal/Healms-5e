import { Routes } from '@angular/router';

import { OverviewComponent } from './overview/overview.component';

export const WorldRoutes: Routes = [
    {
        path: '',
        children: [{
            path: 'overview',
            component: OverviewComponent
        }]
    },

];
