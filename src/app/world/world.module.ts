import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';

import { WorldRoutes } from './world.routing';
import { OverviewComponent } from './overview/overview.component';
import { ReligionsComponent } from './religions/religions.component';
import { CitiesComponent } from './cities/cities.component';
import { BeatiaryComponent, SheetDialogComponent } from './beatiary/beatiary.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(WorldRoutes),
    FormsModule,
    MaterialModule
  ],
  declarations: [OverviewComponent, ReligionsComponent, CitiesComponent, BeatiaryComponent, SheetDialogComponent],
  entryComponents: [SheetDialogComponent]

})
export class WorldModule { }
