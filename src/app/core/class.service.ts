import { Injectable } from "@angular/core";

import { Classes } from "../../assets/ts/Tables/classes";
import { WIZARD } from "../../assets/ts/Tables/wizardLevelTable";

@Injectable()
export class ClassService {
  getWizard(): Promise<Classes[]> {
    return Promise.resolve(WIZARD);
  }
}
