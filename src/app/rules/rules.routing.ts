import { Routes } from '@angular/router';

import { CharacterCreateComponent } from './character-create/character-create.component';
import { GameComponent } from './game/game.component';
import { MagicRulesComponent } from './magic-rules/magic-rules.component';
import { DmToolsComponent } from './dm-tools/dm-tools.component';




export const RuleRoutes: Routes = [
    {
        path: '',
        children: [{
            path: 'character-creation',
            component: CharacterCreateComponent
        }]
    },
    {
        path: '',
        children: [{
            path: 'game',
            component: GameComponent
        }]
    },
    {
        path: '',
        children: [{
            path: 'magic-rules',
            component: MagicRulesComponent
        }]
    },
    {
        path: '',
        children: [{
            path: 'dmtools',
            component: DmToolsComponent
        }]
    }


];
