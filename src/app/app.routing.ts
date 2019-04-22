import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { AuthGuard } from './core/auth.guard';

export const AppRoutes: Routes = [
    {
        path: '',
        component: AuthLayoutComponent,
        children: [{
            path: '',
            redirectTo: '/authentication/login',
            pathMatch: 'full',
        }, {
            path: '',
            loadChildren: './authentication/authentication.module#AuthenticationModule'
        }]
    },
    {
        path: '',
        component: AdminLayoutComponent,
        canActivate: [AuthGuard], // <--- Uncomment this to lock shit behind login wall

        children: [
            {
                path: 'dashboard',
                loadChildren: './dashboard/dashboard.module#DashboardModule'
            }, {
                path: 'adventures',
                loadChildren: './adventures/adventure.module#AdventureModule'
            }, {
                path: 'world',
                loadChildren: './world/world.module#WorldModule'
            }, {
                path: 'rules',
                loadChildren: './rules/rules.module#RulesModule'
            }, {
                path: 'components',
                loadChildren: './components/components.module#ComponentsModule'
            }, {
                path: 'forms',
                loadChildren: './forms/forms.module#Forms'
            }, {
                path: 'tables',
                loadChildren: './tables/tables.module#TablesModule'
            }, {
                path: 'maps',
                loadChildren: './maps/maps.module#MapsModule'
            }, {
                path: 'widgets',
                loadChildren: './widgets/widgets.module#WidgetsModule'
            }, {
                path: 'charts',
                loadChildren: './charts/charts.module#ChartsModule'
            }, {
                path: 'calendar',
                loadChildren: './calendar/calendar.module#CalendarModule'
            }, {
                path: '',
                loadChildren: './userpage/user.module#UserModule'
            }, {
                path: '',
                loadChildren: './timeline/timeline.module#TimelineModule'
            }
        ]
    }, {
        path: '',
        component: AuthLayoutComponent,
        canActivate: [AuthGuard], // <--- Uncomment this to lock shit behind login wall
        children: [{
            path: 'pages',
            loadChildren: './pages/pages.module#PagesModule'
        }]
    },
    {
        path: '',
        component: AuthLayoutComponent,
        children: [{
            path: 'authentication',
            loadChildren: './authentication/authentication.module#AuthenticationModule'
        }]
    }
];
