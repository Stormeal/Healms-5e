import { Routes } from "@angular/router";

import { OverviewComponent } from "./overview/overview.component";
import { ReligionsComponent } from "./religions/religions.component";
import { CitiesComponent } from "./cities/cities.component";
import { BeatiaryComponent } from "./beatiary/beatiary.component";
import { SpellcastingComponent } from "./spellcasting/spellcasting.component";
import { CreateMonsterComponent } from "./beatiary/create-monster/create-monster.component";

export const WorldRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "overview",
        component: OverviewComponent
      }
    ]
  },
  {
    path: "",
    children: [
      {
        path: "religions",
        component: ReligionsComponent
      }
    ]
  },
  {
    path: "",
    children: [
      {
        path: "cities",
        component: CitiesComponent
      }
    ]
  },
  {
    path: "",
    children: [
      {
        path: "beastiary",
        component: BeatiaryComponent
      }
    ]
  },
  {
    path: "",
    children: [
      {
        path: "spellcasting",
        component: SpellcastingComponent
      }
    ]
  },
  {
    path: "",
    children: [
      {
        path: "beastiary/create",
        component: CreateMonsterComponent
      }
    ]
  }
];
