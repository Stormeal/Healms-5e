import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';

import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { AuthService } from '../core/auth.service';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

declare const $: any;


// Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

// Menu Items
export const ROUTES: RouteInfo[] = [{
    path: '/home',
    title: 'Home',
    type: 'sub',
    icontype: 'dashboard',
    collapse: 'home',
    children: [
        { path: 'dashboard', title: 'Dashboard', ab: 'DB' },
        { path: 'screen', title: 'DM Screen', ab: 'DM' }
    ]
}, {
    path: '/adventures',
    title: 'Adventures',
    type: 'sub',
    icontype: 'nature',
    collapse: 'adventures',
    children: [
        { path: 'overview', title: 'Adventure Overview', ab: 'AO' },
        { path: 'encounters', title: 'Encounters', ab: 'E' },
    ]
},
{
    path: '/world',
    title: 'World',
    type: 'sub',
    icontype: 'public',
    collapse: 'world',
    children: [
        { path: 'overview', title: 'Overview', ab: 'O' },
        { path: 'religions', title: 'Religions', ab: 'R' },
        { path: 'cities', title: 'Cities', ab: 'C' },
        { path: 'beastiary', title: 'Beastiary', ab: 'B' },
        { path: 'spellcasting', title: 'Spellcasting', ab: 'S' }
    ]
}, {
    path: '/players',
    title: 'Players',
    type: 'link',
    icontype: 'person'
},
{
    path: '/rules',
    title: 'rules',
    type: 'sub',
    icontype: 'list',
    collapse: 'rules',
    children: [
        { path: 'character-creation', title: 'Character Creation', ab: 'CC' },
        { path: 'game', title: 'Playing the Game', ab: 'PG' },
        { path: 'magic-rules', title: 'The Rules of Magic', ab: 'RM' },
        { path: 'dmtools', title: 'Dungeon Master\'s Tools ', ab: 'DT' },

    ]
}, {
    path: '/dashboard',
    title: 'Dashboard',
    type: 'link',
    icontype: 'dashboard'
},
{
    path: '/components',
    title: 'Components',
    type: 'sub',
    icontype: 'apps',
    collapse: 'components',
    children: [
        { path: 'buttons', title: 'Buttons', ab: 'B' },
        { path: 'grid', title: 'Grid System', ab: 'GS' },
        { path: 'panels', title: 'Panels', ab: 'P' },
        { path: 'sweet-alert', title: 'Sweet Alert', ab: 'SA' },
        { path: 'notifications', title: 'Notifications', ab: 'N' },
        { path: 'icons', title: 'Icons', ab: 'I' },
        { path: 'typography', title: 'Typography', ab: 'T' }
    ]
},
{
    path: '/forms',
    title: 'Forms',
    type: 'sub',
    icontype: 'content_paste',
    collapse: 'forms',
    children: [
        { path: 'regular', title: 'Regular Forms', ab: 'RF' },
        { path: 'extended', title: 'Extended Forms', ab: 'EF' },
        { path: 'validation', title: 'Validation Forms', ab: 'VF' },
        { path: 'wizard', title: 'Wizard', ab: 'W' }
    ]
}, {
    path: '/tables',
    title: 'Tables',
    type: 'sub',
    icontype: 'grid_on',
    collapse: 'tables',
    children: [
        { path: 'regular', title: 'Regular Tables', ab: 'RT' },
        { path: 'extended', title: 'Extended Tables', ab: 'ET' },
        { path: 'datatables.net', title: 'Datatables.net', ab: 'DT' }
    ]
}, {
    path: '/widgets',
    title: 'Widgets',
    type: 'link',
    icontype: 'widgets'

}, {
    path: '/charts',
    title: 'Charts',
    type: 'link',
    icontype: 'timeline'

}, {
    path: '/calendar',
    title: 'Calendar',
    type: 'link',
    icontype: 'date_range'
}, {
    path: '/pages',
    title: 'Pages',
    type: 'sub',
    icontype: 'image',
    collapse: 'pages',
    children: [
        { path: 'pricing', title: 'Pricing', ab: 'P' },
        { path: 'lock', title: 'Lock Screen Page', ab: 'LSP' },
        { path: 'user', title: 'User Page', ab: 'UP' }
    ]
}
];
@Component({
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    faCoffee = faCoffee;
    user;
    campaign: any;
    campaignId: any;

    constructor(private auth: AuthService, private afs: AngularFirestore) {
        library.add(faCoffee);
    }

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    }

    ngOnInit() {
        this.load();
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    updatePS(): void {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
            const ps = new PerfectScrollbar(elemSidebar, { wheelSpeed: 2, suppressScrollX: true });
        }
    }
    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }

    load() {
        this.auth.getUser().subscribe(user => {
            this.user = user;
            this.campaignId = this.user.campaigns.campaignId;
            // console.log('CampaignId', this.campaignId);

            this.afs.doc(`campaigns/${this.campaignId}`).valueChanges().subscribe(campaign => {
                this.campaign = campaign;
                const campId = this.campaign.uid;

                console.log('Campaign: ', campId, this.campaign);
            });

        });

    }

    logout() {
        this.auth.signOut();
    }
}
