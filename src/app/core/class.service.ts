import { Injectable } from "@angular/core";

import { Classes } from "../../assets/ts/classes";
import { WIZARD } from "../../assets/ts/wizardLevelTable";

@Injectable()
export class ClassService {
  getWizard(): Promise<Classes[]> {
    return Promise.resolve(WIZARD);
  }
}
