import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../app.module";
import { Ng2SmartTableModule } from "ng2-smart-table";

import { HomeComponent } from "./home.component";
import { HomeRoutes } from "./home.routing";
import { DmScreenComponent } from "./dm-screen/dm-screen.component";

@NgModule({
  imports: [
    RouterModule.forChild(HomeRoutes),
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    Ng2SmartTableModule
  ],
  declarations: [HomeComponent, DmScreenComponent]
})
export class HomeModule {}
