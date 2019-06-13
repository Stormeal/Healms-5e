import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';

import { WorldRoutes } from './world.routing';
import { OverviewComponent } from './overview/overview.component';
import { ReligionsComponent } from './religions/religions.component';
import { CitiesComponent } from './cities/cities.component';
import { BeatiaryComponent, SheetDialogComponent, NewMonsterDialog } from './beatiary/beatiary.component';
import { SpellcastingComponent } from './spellcasting/spellcasting.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateMonsterComponent } from './beatiary/create-monster/create-monster.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(WorldRoutes),
    FormsModule,
    MaterialModule,
    NgbModule,
    ReactiveFormsModule
  ],
  declarations: [OverviewComponent, ReligionsComponent, CitiesComponent, BeatiaryComponent, SheetDialogComponent, NewMonsterDialog, SpellcastingComponent, CreateMonsterComponent],
  entryComponents: [SheetDialogComponent, NewMonsterDialog]

})
export class WorldModule { }
