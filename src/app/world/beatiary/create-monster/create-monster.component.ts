import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormArray,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";

import { AuthService } from "src/app/core/auth.service";
import { ClassService } from "src/app/core/class.service";
import { Router } from "@angular/router";
import { NotificationsComponent } from "../../../components/notifications/notifications.component";
import { Classes } from "src/assets/ts/classes";
import { WIZARD } from "src/assets/ts/wizardLevelTable";

declare var require: any;

@Component({
  selector: "app-create-monster",
  templateUrl: "./create-monster.component.html"
})
export class CreateMonsterComponent implements OnInit {
  public creatureRaces = [
    { value: "Aberration", viewValue: "Aberration" },
    { value: "Beast", viewValue: "Beast" },
    { value: "Celestial", viewValue: "Celestial" },
    { value: "Construct", viewValue: "Construct" },
    { value: "Dragon", viewValue: "Dragon" },
    { value: "Elemental", viewValue: "Elemental" },
    { value: "Fey", viewValue: "Fey" },
    { value: "Fiend", viewValue: "Fiend" },
    { value: "Giant", viewValue: "Giant" },
    { value: "Humanoid", viewValue: "Humanoid" },
    { value: "Monstrosity", viewValue: "Monstrosity" },
    { value: "Ooze", viewValue: "Ooze" },
    { value: "Plant", viewValue: "Plant" },
    { value: "Undead", viewValue: "Undead" }
  ];
  public creatureRacesSelect = this.creatureRaces[0].viewValue;

  public creatureSize = [
    { value: "Tiny", viewValue: "Tiny" },
    { value: "Small", viewValue: "Small" },
    { value: "Medium", viewValue: "Medium" },
    { value: "Large", viewValue: "Large" },
    { value: "Huge", viewValue: "Huge" },
    { value: "Gargantuan", viewValue: "Gargantuan" }
  ];
  public creatureSizeSelect = this.creatureSize[2].viewValue;

  public alignments = [
    { value: "Lawful Good", viewValue: "Lawful Good" },
    { value: "Lawful Neutral", viewValue: "Lawful Neutral" },
    { value: "Lawful Evil", viewValue: "Lawful Evil" },
    { value: "Neutral Good", viewValue: "Neutral Good" },
    { value: "(True) Neutral", viewValue: "(True) Neutral" },
    { value: "Neutral Evil", viewValue: "Neutral Evil" },
    { value: "Chaotic Good", viewValue: "Chaotic Good" },
    { value: "Chaotic Neutral", viewValue: "Chaotic Neutral" },
    { value: "Chaotic Evil", viewValue: "Chaotic Evil" }
  ];
  public alignmentsSelect = this.alignments[4].viewValue;

  public challengeRating = [
    { value: "0", viewValue: "0 (0-10 XP)" },
    { value: "1/8", viewValue: "1/8 (25 XP)" },
    { value: "1/4", viewValue: "1/4 (50 XP)" },
    { value: "1/2", viewValue: "1/2 (100 XP)" },
    { value: "1", viewValue: "1 (200 XP)" },
    { value: "2", viewValue: "2 (450 XP)" },
    { value: "3", viewValue: "3 (700 XP)" },
    { value: "4", viewValue: "4 (1100 XP)" },
    { value: "5", viewValue: "5 (1800 XP)" },
    { value: "6", viewValue: "6 (2300 XP)" },
    { value: "7", viewValue: "7 (2900 XP)" },
    { value: "8", viewValue: "8 (3900 XP)" },
    { value: "9", viewValue: "9 (5000 XP)" },
    { value: "10", viewValue: "10 (5900 XP)" },
    { value: "11", viewValue: "11 (7200 XP)" },
    { value: "12", viewValue: "12 (8400 XP)" },
    { value: "13", viewValue: "13 (10000 XP)" },
    { value: "14", viewValue: "14 (11500 XP)" },
    { value: "15", viewValue: "15 (13000 XP)" },
    { value: "16", viewValue: "16 (15000 XP)" },
    { value: "17", viewValue: "17 (18000 XP)" },
    { value: "18", viewValue: "18 (20000 XP)" },
    { value: "19", viewValue: "19 (22000 XP)" },
    { value: "20", viewValue: "20 (25000 XP)" },
    { value: "21", viewValue: "21 (33000 XP)" },
    { value: "22", viewValue: "22 (41000 XP)" },
    { value: "23", viewValue: "23 (50000 XP)" },
    { value: "24", viewValue: "24 (62000 XP)" },
    { value: "25", viewValue: "25 (155000 XP)" }
  ];
  public challengeRatingSelect = this.challengeRating[3].viewValue;

  public dices = [
    { value: "d4", viewValue: "d4" },
    { value: "d6", viewValue: "d6" },
    { value: "d8", viewValue: "d8" },
    { value: "d10", viewValue: "d10" },
    { value: "d12", viewValue: "d12" },
    { value: "d20", viewValue: "d20" }
  ];
  public dicesSelect = this.dices[2].viewValue;

  public dmgDices = [
    { value: "d4", viewValue: "d4" },
    { value: "d6", viewValue: "d6" },
    { value: "d8", viewValue: "d8" },
    { value: "d10", viewValue: "d10" },
    { value: "d12", viewValue: "d12" },
    { value: "d20", viewValue: "d20" }
  ];
  public dmgDicesSelect = this.dmgDices[2].viewValue;

  public spellcastingAbility = [
    { value: "Charisma", viewValue: "Charisma" },
    { value: "Intelligence", viewValue: "Intelligence" },
    { value: "Wisdom", viewValue: "Wisdom" }
  ];
  public spellcastingAbilitySelect = this.spellcastingAbility[0].viewValue;

  public spellslots = [
    { value: 0, viewValue: "0" },
    { value: 1, viewValue: "1" },
    { value: 2, viewValue: "2" },
    { value: 3, viewValue: "3" },
    { value: 4, viewValue: "4" },
    { value: "At will", viewValue: "At will" }
  ];
  public spellslotsSelect = this.spellslots[0].viewValue;

  public spellLevel = [
    { value: 1, viewValue: "1st" },
    { value: 2, viewValue: "2nd" },
    { value: 3, viewValue: "3rd" },
    { value: 4, viewValue: "4th" },
    { value: 5, viewValue: "5th" },
    { value: 6, viewValue: "6th" },
    { value: 7, viewValue: "7th" },
    { value: 8, viewValue: "8th" },
    { value: 9, viewValue: "9th" },
    { value: 10, viewValue: "10th" },
    { value: 11, viewValue: "11th" },
    { value: 12, viewValue: "12th" },
    { value: 13, viewValue: "13th" },
    { value: 14, viewValue: "14th" },
    { value: 15, viewValue: "15th" },
    { value: 16, viewValue: "16th" },
    { value: 17, viewValue: "17th" },
    { value: 18, viewValue: "18th" },
    { value: 19, viewValue: "19th" },
    { value: 20, viewValue: "20th" }
  ];
  public spellLevelSelect = this.spellLevel[0].viewValue;

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

  creatureForm: FormGroup;
  traitList: FormArray;
  actionList: FormArray;
  wizard = WIZARD;
  selectedWizard: Classes;
  isTrue = true; // Set this to false when live. True is for testing purposes.

  spellList = require("src/assets/srd/spells2.json");

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
  ) {}

  ngOnInit() {
    this.creatureForm = this.fb.group({
      creatureName: "",
      spellClass: "",
      spellLevel: "",
      spellcastingAbility: "",
      traits: this.fb.array([this.createTrait()]),
      actions: this.fb.array([this.createAction()])
    });
    this.traitList = this.creatureForm.get("traits") as FormArray;
    this.actionList = this.creatureForm.get("actions") as FormArray;

    this.getWizard();
  }

  getWizard(): void {
    // console.log(this.spellClass[7].value);
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
