import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';

import { AdventureRoutes } from './adventure.routing';
import { OverviewComponent } from './overview/overview.component';
import { EncountersComponent } from './encounters/encounters.component';




@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdventureRoutes),
    FormsModule,
    MaterialModule
  ],
  declarations: [OverviewComponent, EncountersComponent],

})
export class AdventureModule { }
