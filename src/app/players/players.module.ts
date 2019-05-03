import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { PlayersComponent } from './players.component';
import { PlayersRoutes } from './players.routing';
import { CharacterSheetComponent } from './character-sheet/character-sheet.component';


@NgModule({
  imports: [
    RouterModule.forChild(PlayersRoutes),
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  declarations: [PlayersComponent, CharacterSheetComponent],

})
export class PlayersModule { }
