import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../app.module";

import { AngularEditorModule } from "@kolkov/angular-editor";

import { AdventureRoutes } from "./adventure.routing";
import { OverviewComponent } from "./overview/overview.component";
import { EncountersComponent } from "./encounters/encounters.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdventureRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AngularEditorModule,
  ],
  declarations: [OverviewComponent, EncountersComponent],
})
export class AdventureModule {}
