import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';

import { RuleRoutes } from './rules.routing';
import { CharacterCreateComponent } from './character-create/character-create.component';
import { GameComponent } from './game/game.component';
import { MagicRulesComponent } from './magic-rules/magic-rules.component';
import { DmToolsComponent } from './dm-tools/dm-tools.component';






@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(RuleRoutes),
    FormsModule,
    MaterialModule
  ],
  declarations: [CharacterCreateComponent, GameComponent, MagicRulesComponent, DmToolsComponent],

})
export class RulesModule { }
