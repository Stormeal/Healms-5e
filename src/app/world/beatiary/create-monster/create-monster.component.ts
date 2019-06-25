import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import {
  FormGroup,
  FormArray,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete
} from "@angular/material/autocomplete";
import { MatChipInputEvent } from "@angular/material/chips";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

import { AuthService } from "src/app/core/auth.service";
import { ClassService } from "src/app/core/class.service";
import { Router } from "@angular/router";
import { NotificationsComponent } from "../../../components/notifications/notifications.component";

import { Classes } from "src/assets/ts/Tables/classes";
import { WIZARD } from "src/assets/ts/Tables/wizardLevelTable";
import { CreatureRaces } from "src/assets/ts/creatureRaces";
import { CreatureSizes } from "src/assets/ts/creatureSizes";
import { Alignments } from "src/assets/ts/alignments";
import { ChallengeRatings } from "src/assets/ts/challengeRatings";
import { dmgDices, Dices } from "src/assets/ts/dices";
import {
  SpellCastingAbility,
  SpellLevel,
  SpellSlots
} from "src/assets/ts/spellcasting";
import {
  Cantrips,
  First,
  Second,
  Third,
  Fourth,
  Fifth,
  Sixth,
  Seventh,
  Eigth,
  Nineth
} from "src/assets/ts/spells";

declare var require: any;

@Component({
  selector: "app-create-monster",
  templateUrl: "./create-monster.component.html"
})
export class CreateMonsterComponent implements OnInit {
  public creatureRacesSelect = CreatureRaces[0].viewValue;
  public creatureSizeSelect = CreatureSizes[2].viewValue;
  public alignmentsSelect = Alignments[4].viewValue;
  public challengeRatingSelect = ChallengeRatings[3].viewValue;
  public dicesSelect = Dices[2].viewValue;
  public dmgDicesSelect = dmgDices[2].viewValue;
  public spellcastingAbilitySelect = SpellCastingAbility[0].viewValue;
  public spellslotsSelect = SpellSlots[0].viewValue;
  public spellLevelSelect = SpellLevel[0].viewValue;

  public allCantrips = Cantrips;
  public cantrips = ["Dancing Light"];

  public wizardLevelTable = [
    {
      value: 1,
      viewValue: "1st",
      cantrips: 3,
      first: 2,
      second: null,
      third: null,
      fourth: null,
      fifth: null,
      sixth: null,
      seventh: null,
      eigth: null,
      nineth: null
    },
    {
      value: 2,
      viewValue: "2nd",
      cantrips: 3,
      first: 3,
      second: null,
      third: null,
      fourth: null,
      fifth: null,
      sixth: null,
      seventh: null,
      eigth: null,
      nineth: null
    },
    {
      value: 3,
      viewValue: "3rd",
      cantrips: 3,
      first: 4,
      second: 2,
      third: null,
      fourth: null,
      fifth: null,
      sixth: null,
      seventh: null,
      eigth: null,
      nineth: null
    },
    {
      value: 4,
      viewValue: "4th",
      cantrips: 4,
      first: 4,
      second: 3,
      third: null,
      fourth: null,
      fifth: null,
      sixth: null,
      seventh: null,
      eigth: null,
      nineth: null
    },
    {
      value: 5,
      viewValue: "5th",
      cantrips: 4,
      first: 4,
      second: 3,
      third: 2,
      fourth: null,
      fifth: null,
      sixth: null,
      seventh: null,
      eigth: null,
      nineth: null
    },
    {
      value: 6,
      viewValue: "6th",
      cantrips: 4,
      first: 4,
      second: 3,
      third: 3,
      fourth: null,
      fifth: null,
      sixth: null,
      seventh: null,
      eigth: null,
      nineth: null
    },
    {
      value: 7,
      viewValue: "7th",
      cantrips: 4,
      first: 4,
      second: 3,
      third: 3,
      fourth: 1,
      fifth: null,
      sixth: null,
      seventh: null,
      eigth: null,
      nineth: null
    },
    {
      value: 8,
      viewValue: "8th",
      cantrips: 4,
      first: 4,
      second: 3,
      third: 3,
      fourth: 2,
      fifth: null,
      sixth: null,
      seventh: null,
      eigth: null,
      nineth: null
    },
    {
      value: 9,
      viewValue: "9th",
      cantrips: 4,
      first: 4,
      second: 3,
      third: 3,
      fourth: 3,
      fifth: 1,
      sixth: null,
      seventh: null,
      eigth: null,
      nineth: null
    },
    {
      value: 10,
      viewValue: "10th",
      cantrips: 5,
      first: 4,
      second: 3,
      third: 3,
      fourth: 3,
      fifth: 2,
      sixth: null,
      seventh: null,
      eigth: null,
      nineth: null
    },
    {
      value: 11,
      viewValue: "11th",
      cantrips: 5,
      first: 4,
      second: 3,
      third: 3,
      fourth: 3,
      fifth: 2,
      sixth: 1,
      seventh: null,
      eigth: null,
      nineth: null
    },
    {
      value: 12,
      viewValue: "12th",
      cantrips: 5,
      first: 4,
      second: 3,
      third: 3,
      fourth: 3,
      fifth: 2,
      sixth: 1,
      seventh: null,
      eigth: null,
      nineth: null
    },
    {
      value: 13,
      viewValue: "13th",
      cantrips: 5,
      first: 4,
      second: 3,
      third: 3,
      fourth: 3,
      fifth: 2,
      sixth: 1,
      seventh: 1,
      eigth: null,
      nineth: null
    },
    {
      value: 14,
      viewValue: "14th",
      cantrips: 5,
      first: 4,
      second: 3,
      third: 3,
      fourth: 3,
      fifth: 2,
      sixth: 1,
      seventh: 1,
      eigth: null,
      nineth: null
    },
    {
      value: 15,
      viewValue: "15th",
      cantrips: 5,
      first: 4,
      second: 3,
      third: 3,
      fourth: 3,
      fifth: 2,
      sixth: 1,
      seventh: 1,
      eigth: 1,
      nineth: null
    },
    {
      value: 16,
      viewValue: "16th",
      cantrips: 5,
      first: 4,
      second: 3,
      third: 3,
      fourth: 3,
      fifth: 2,
      sixth: 1,
      seventh: 1,
      eigth: 1,
      nineth: null
    },
    {
      value: 17,
      viewValue: "17th",
      cantrips: 5,
      first: 4,
      second: 3,
      third: 3,
      fourth: 3,
      fifth: 2,
      sixth: 1,
      seventh: 1,
      eigth: 1,
      nineth: 1
    },
    {
      value: 18,
      viewValue: "18th",
      cantrips: 5,
      first: 4,
      second: 3,
      third: 3,
      fourth: 3,
      fifth: 3,
      sixth: 1,
      seventh: 1,
      eigth: 1,
      nineth: 1
    },
    {
      value: 19,
      viewValue: "19th",
      cantrips: 5,
      first: 4,
      second: 3,
      third: 3,
      fourth: 3,
      fifth: 3,
      sixth: 2,
      seventh: 1,
      eigth: 1,
      nineth: 1
    },
    {
      value: 20,
      viewValue: "20th",
      cantrips: 5,
      first: 4,
      second: 3,
      third: 3,
      fourth: 3,
      fifth: 3,
      sixth: 2,
      seventh: 2,
      eigth: 1,
      nineth: 1
    }
  ];
  // public wizardLevelSelect = this.wizardLevelTable[0].viewValue;

  spellList = require("src/assets/srd/spells2.json");
  public spellListSelect = this.spellList[0].name;

  // cantrips = require("src/assets/srd/cantrips/cantrips.json");

  creatureForm: FormGroup;
  traitList: FormArray;
  actionList: FormArray;
  wizard = WIZARD;
  selectedWizard: Classes;
  isTrue = true; // Set this to false when live. True is for testing purposes.

  creatureRaces = CreatureRaces;
  creatureSizes = CreatureSizes;
  alignments = Alignments;
  challengeRatings = ChallengeRatings;
  dices = Dices;
  dmgDices = dmgDices;
  spellCastingAbility = SpellCastingAbility;
  spellSlots = SpellSlots;
  spellLevels = SpellLevel;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  spellCtrl = new FormControl();
  filteredSpells: Observable<string[]>;
  // spells: string[] = [this.cantrips.find(spell => spell[0])];
  // allSpells: string[] = [this.allCantrips];

  @ViewChild("spellInput", { static: false }) spellInput: ElementRef<
    HTMLInputElement
  >;
  @ViewChild("auto", { static: false }) MatAutocomplete: MatAutocomplete;

  public wizardLevelSelect = this.wizard[0].viewValue;
  public spellClass = [
    { value: "Bard", viewValue: "Bard" },
    { value: "Cleric", viewValue: "Cleric" },
    { value: "Druid", viewValue: "Druid" },
    { value: "Paladin", viewValue: "Paladin" },
    { value: "Ranger", viewValue: "Ranger" },
    { value: "Sorcerer", viewValue: "Sorcerer" },
    { value: "Warlock", viewValue: "Warlock" },
    { value: this.wizard, viewValue: "Wizard" }
  ];
  public spellClassSelect = this.spellClass[7].value;

  get traitFormGroup() {
    return this.creatureForm.get("traits") as FormArray;
  }

  get actionFormGroup() {
    return this.creatureForm.get("actions") as FormArray;
  }

  constructor(
    private auth: AuthService,
    // private cs: ClassService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.filteredSpells = this.spellCtrl.valueChanges.pipe(
      // tslint:disable-next-line: deprecation
      startWith(null),
      map((spell: string | null) =>
        spell ? this._filter(spell) : this.allCantrips.slice()
      )
    );
  }

  ngOnInit() {
    this.creatureForm = this.fb.group({
      creatureName: "",
      spellClass: "",
      spellLevel: "",
      spellcastingAbility: "",
      cantrip: "",
      traits: this.fb.array([this.createTrait()]),
      actions: this.fb.array([this.createAction()])
    });
    this.traitList = this.creatureForm.get("traits") as FormArray;
    this.actionList = this.creatureForm.get("actions") as FormArray;

    this.getWizard();
  }

  /* Everything related to the spellchips */
  private _filter(name: string) {
    return this.allCantrips.filter(
      spell => spell.toLowerCase().indexOf(name.toLowerCase()) === 0
    );
  }

  add(event: MatChipInputEvent): void {
    // Add spells only when MatAutocomplete is not open
    // To make sure this does not conflic with OptionsSelected Event

    if (!this.MatAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our spells
      if ((value || "").trim()) {
        this.cantrips.push(value.trim());
      }

      // Resets the input value
      if (input) {
        input.value = "";
      }

      this.spellCtrl.setValue(null);
    }
  }

  remove(spell: string): void {
    const index = this.cantrips.indexOf(spell);

    if (index >= 0) {
      this.cantrips.splice(index, 1);
    }
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    this.cantrips.push(event.option.viewValue);
    this.spellInput.nativeElement.value = "";
    this.spellCtrl.setValue(null);
  }

  /* End of Spell chips */

  getWizard(): void {
    console.log(this.allCantrips);
  }

  onSelect(wiz: Classes): void {
    this.selectedWizard = wiz;
  }

  createTrait(): FormGroup {
    return this.fb.group({
      traitName: ["", Validators.compose([Validators.required])],
      spellcastingAbility: ["", Validators.compose([Validators.required])],
      traitDescription: ["", Validators.compose([Validators.required])]
    });
  }

  addTrait() {
    this.traitList.push(this.createTrait());
  }

  removeTrait(index) {
    this.traitList.removeAt(index);
  }

  createAction(): FormGroup {
    return this.fb.group({
      actionName: ["", Validators.compose([Validators.required])],
      actionDescription: ["", Validators.compose([Validators.required])],
      actionHitMod: ["", Validators.compose([Validators.required])],
      actionDmg: ["", Validators.compose([Validators.required])],
      actionDice: ["", Validators.compose([Validators.required])],
      actionDmgMod: ["", Validators.compose([Validators.required])]
    });
  }

  addAction() {
    this.actionList.push(this.createAction());
  }

  removeAction(index) {
    this.actionList.removeAt(index);
  }

  test(e): boolean {
    if (e.target.checked) {
      return this.returnsTrue();
    } else {
      return (this.isTrue = false);
    }
  }

  returnsTrue(): boolean {
    console.log("Returns true");
    return (this.isTrue = true);
  }
}
