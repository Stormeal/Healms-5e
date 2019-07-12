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
import { BARD } from "src/assets/ts/Tables/bardLevelTable";
import { CLERIC } from "src/assets/ts/Tables/clericLevelTable";
import { DRUID } from "src/assets/ts/Tables/druidLevelTabel";
import { PALADIN } from "src/assets/ts/Tables/paladinLevelTable";
import { RANGER } from "src/assets/ts/Tables/rangerLevelTable";
import { SORCERER } from "src/assets/ts/Tables/sorcererLevelTable";
import { WARLOCK } from "src/assets/ts/Tables/warlockLevelTable";
import { WIZARD } from "src/assets/ts/Tables/wizardLevelTable";

import { CreatureRaces } from "src/assets/ts/creatureRaces";
import { CreatureSizes } from "src/assets/ts/creatureSizes";
import { Alignments } from "src/assets/ts/alignments";
import { ChallengeRatings } from "src/assets/ts/challengeRatings";
import { dmgDices, Dices } from "src/assets/ts/dices";
import { STR } from "src/assets/ts/skillPoints";
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

  public strSelect = STR[2].viewValue;
  public strSufSelect = STR[2].suffix;

  public allCantrips = Cantrips;
  public cantrips = ["Dancing Light"];
  public allFirst = First;
  public firsts = ["Alarm"];
  public allSecond = Second;
  public seconds = [Second[0]];
  public allThird = Third;
  public thirds = [Third[0]];
  public allFourth = Fourth;
  public fourths = [Fourth[0]];
  public allFifth = Fifth;
  public fifths = [Fifth[0]];
  public allSixth = Sixth;
  public sixths = [Sixth[0]];
  public allSeventh = Seventh;
  public sevenths = [Seventh[0]];
  public allEigth = Eigth;
  public eigths = [Eigth[0]];
  public allNineth = Nineth;
  public nineths = [Nineth[0]];

  creatureForm: FormGroup;
  traitList: FormArray;
  actionList: FormArray;

  bard = BARD;
  cleric = CLERIC;
  druid = DRUID;
  paladin = PALADIN;
  ranger = RANGER;
  sorcerer = SORCERER;
  warlock = WARLOCK;
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

  str = STR;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  cantripCtrl = new FormControl();
  filteredCantrips: Observable<string[]>;
  firstCtrl = new FormControl();
  filteredFirsts: Observable<string[]>; // 1st
  secondCtrl = new FormControl();
  filteredSeconds: Observable<string[]>; // 2nd
  thirdCtrl = new FormControl();
  filteredThirds: Observable<string[]>; // 3rd
  fourthCtrl = new FormControl();
  filteredFourths: Observable<string[]>; // 4th
  fifthCtrl = new FormControl();
  filteredFifths: Observable<string[]>; // 5th
  sixthCtrl = new FormControl();
  filteredSixths: Observable<string[]>; // 6th
  seventhCtrl = new FormControl();
  filteredSevenths: Observable<string[]>; // 7th
  eigthCtrl = new FormControl();
  filteredEigths: Observable<string[]>; // 6th
  ninethCtrl = new FormControl();
  filteredNineths: Observable<string[]>; // 7th

  @ViewChild("cantripInput", { static: false }) cantripInput: ElementRef<
    HTMLInputElement
  >;
  @ViewChild("firstInput", { static: false }) firstInput: ElementRef<
    HTMLInputElement
  >;
  @ViewChild("secondInput", { static: false }) secondInput: ElementRef<
    HTMLInputElement
  >;
  @ViewChild("thirdInput", { static: false }) thirdInput: ElementRef<
    HTMLInputElement
  >;
  @ViewChild("fourthInput", { static: false }) fourthInput: ElementRef<
    HTMLInputElement
  >;
  @ViewChild("fifthInput", { static: false }) fifthInput: ElementRef<
    HTMLInputElement
  >;
  @ViewChild("sixthInput", { static: false }) sixthInput: ElementRef<
    HTMLInputElement
  >;
  @ViewChild("seventhInput", { static: false }) seventhInput: ElementRef<
    HTMLInputElement
  >;
  @ViewChild("eigthInput", { static: false }) eigthInput: ElementRef<
    HTMLInputElement
  >;
  @ViewChild("ninethInput", { static: false }) ninethInput: ElementRef<
    HTMLInputElement
  >;

  public wizardLevelSelect = this.wizard[0].viewValue;
  public spellClass = [
    { value: this.bard, viewValue: "Bard" },
    { value: this.cleric, viewValue: "Cleric" },
    { value: this.druid, viewValue: "Druid" },
    { value: this.paladin, viewValue: "Paladin" },
    { value: this.ranger, viewValue: "Ranger" },
    { value: this.sorcerer, viewValue: "Sorcerer" },
    { value: this.warlock, viewValue: "Warlock" },
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
    this.filteredCantrips = this.cantripCtrl.valueChanges.pipe(
      // tslint:disable-next-line: deprecation
      startWith(null),
      map((cantrip: string | null) =>
        cantrip ? this._filter(cantrip) : this.allCantrips.slice()
      )
    );
    this.filteredFirsts = this.firstCtrl.valueChanges.pipe(
      // tslint:disable-next-line: deprecation
      startWith(null),
      map((first: string | null) =>
        first ? this._firstFilter(first) : this.allFirst.slice()
      )
    );
    this.filteredSeconds = this.secondCtrl.valueChanges.pipe(
      // tslint:disable-next-line: deprecation
      startWith(null),
      map((second: string | null) =>
        second ? this._secondFilter(second) : this.allSecond.slice()
      )
    );
    this.filteredThirds = this.thirdCtrl.valueChanges.pipe(
      // tslint:disable-next-line: deprecation
      startWith(null),
      map((third: string | null) =>
        third ? this._thirdFilter(third) : this.allThird.slice()
      )
    );
    this.filteredFourths = this.fourthCtrl.valueChanges.pipe(
      // tslint:disable-next-line: deprecation
      startWith(null),
      map((fourth: string | null) =>
        fourth ? this._fourthFilter(fourth) : this.allFourth.slice()
      )
    );
    this.filteredFifths = this.fifthCtrl.valueChanges.pipe(
      // tslint:disable-next-line: deprecation
      startWith(null),
      map((fifth: string | null) =>
        fifth ? this._fifthFilter(fifth) : this.allFifth.slice()
      )
    );
    this.filteredSixths = this.sixthCtrl.valueChanges.pipe(
      // tslint:disable-next-line: deprecation
      startWith(null),
      map((sixth: string | null) =>
        sixth ? this._sixthFilter(sixth) : this.allSixth.slice()
      )
    );
    this.filteredSevenths = this.seventhCtrl.valueChanges.pipe(
      // tslint:disable-next-line: deprecation
      startWith(null),
      map((seventh: string | null) =>
        seventh ? this._seventhFilter(seventh) : this.allSeventh.slice()
      )
    );
    this.filteredEigths = this.sixthCtrl.valueChanges.pipe(
      // tslint:disable-next-line: deprecation
      startWith(null),
      map((eigth: string | null) =>
        eigth ? this._eigthFilter(eigth) : this.allEigth.slice()
      )
    );
    this.filteredNineths = this.seventhCtrl.valueChanges.pipe(
      // tslint:disable-next-line: deprecation
      startWith(null),
      map((nineth: string | null) =>
        nineth ? this._ninethFilter(nineth) : this.allNineth.slice()
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
  private _filter(cantrip: string) {
    return this.allCantrips.filter(
      spell => spell.toLowerCase().indexOf(cantrip.toLowerCase()) === 0
    );
  }
  private _firstFilter(name: string) {
    return this.allFirst.filter(
      spell => spell.toLowerCase().indexOf(name.toLowerCase()) === 0
    );
  }
  private _secondFilter(name: string) {
    return this.allSecond.filter(
      spell => spell.toLowerCase().indexOf(name.toLowerCase()) === 0
    );
  }
  private _thirdFilter(name: string) {
    return this.allThird.filter(
      spell => spell.toLowerCase().indexOf(name.toLowerCase()) === 0
    );
  }
  private _fourthFilter(name: string) {
    return this.allFourth.filter(
      spell => spell.toLowerCase().indexOf(name.toLowerCase()) === 0
    );
  }
  private _fifthFilter(name: string) {
    return this.allFifth.filter(
      spell => spell.toLowerCase().indexOf(name.toLowerCase()) === 0
    );
  }
  private _sixthFilter(name: string) {
    return this.allSixth.filter(
      spell => spell.toLowerCase().indexOf(name.toLowerCase()) === 0
    );
  }
  private _seventhFilter(name: string) {
    return this.allSeventh.filter(
      spell => spell.toLowerCase().indexOf(name.toLowerCase()) === 0
    );
  }
  private _eigthFilter(name: string) {
    return this.allEigth.filter(
      spell => spell.toLowerCase().indexOf(name.toLowerCase()) === 0
    );
  }
  private _ninethFilter(name: string) {
    return this.allNineth.filter(
      spell => spell.toLowerCase().indexOf(name.toLowerCase()) === 0
    );
  }

  addCantrip(event: MatChipInputEvent): void {
    // Add spells only when MatAutocomplete is not open
    // To make sure this does not conflic with OptionsSelected Event

    console.log("Cantrip ere");

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

    this.cantripCtrl.setValue(null);
  }

  addFirst(event: MatChipInputEvent): void {
    // Add spells only when MatAutocomplete is not open
    // To make sure this does not conflic with OptionsSelected Event

    console.log("First ere'");

    const input = event.input;
    const value = event.value;

    // Add our spells
    if ((value || "").trim()) {
      this.firsts.push(value.trim());
    }

    // Resets the input value
    if (input) {
      input.value = "";
    }

    this.firstCtrl.setValue(null);
  }

  addSecond(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || "").trim()) {
      this.seconds.push(value.trim());
    }

    if (input) {
      input.value = "";
    }
    this.secondCtrl.setValidators(null);
  }

  addThird(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || "").trim()) {
      this.thirds.push(value.trim());
    }

    if (input) {
      input.value = "";
    }
    this.thirdCtrl.setValidators(null);
  }

  addFourth(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || "").trim()) {
      this.fourths.push(value.trim());
    }

    if (input) {
      input.value = "";
    }
    this.fourthCtrl.setValidators(null);
  }

  addFifth(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || "").trim()) {
      this.fifths.push(value.trim());
    }

    if (input) {
      input.value = "";
    }
    this.fifthCtrl.setValidators(null);
  }

  addSixth(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || "").trim()) {
      this.sixths.push(value.trim());
    }

    if (input) {
      input.value = "";
    }
    this.sixthCtrl.setValidators(null);
  }

  addSeventh(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || "").trim()) {
      this.sevenths.push(value.trim());
    }

    if (input) {
      input.value = "";
    }
    this.seventhCtrl.setValidators(null);
  }
  addEigth(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || "").trim()) {
      this.eigths.push(value.trim());
    }

    if (input) {
      input.value = "";
    }
    this.eigthCtrl.setValidators(null);
  }

  addNineth(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || "").trim()) {
      this.nineths.push(value.trim());
    }

    if (input) {
      input.value = "";
    }
    this.ninethCtrl.setValidators(null);
  }

  removeCantrip(spell: string): void {
    const index = this.cantrips.indexOf(spell);

    if (index >= 0) {
      this.cantrips.splice(index, 1);
    }
  }

  removeFirst(spell: string): void {
    const index = this.firsts.indexOf(spell);

    if (index >= 0) {
      this.firsts.splice(index, 1);
    }
  }

  removeSecond(spell: string): void {
    const index = this.seconds.indexOf(spell);

    if (index >= 0) {
      this.seconds.splice(index, 1);
    }
  }

  removeThird(spell: string): void {
    const index = this.thirds.indexOf(spell);

    if (index >= 0) {
      this.thirds.splice(index, 1);
    }
  }

  removeFourth(spell: string): void {
    const index = this.fourths.indexOf(spell);

    if (index >= 0) {
      this.fourths.splice(index, 1);
    }
  }

  removeFifth(spell: string): void {
    const index = this.fifths.indexOf(spell);

    if (index >= 0) {
      this.fifths.splice(index, 1);
    }
  }

  removeSixth(spell: string): void {
    const index = this.sixths.indexOf(spell);

    if (index >= 0) {
      this.sixths.splice(index, 1);
    }
  }

  removeSeventh(spell: string): void {
    const index = this.sevenths.indexOf(spell);

    if (index >= 0) {
      this.sevenths.splice(index, 1);
    }
  }

  removeEigth(spell: string): void {
    const index = this.eigths.indexOf(spell);

    if (index >= 0) {
      this.eigths.splice(index, 1);
    }
  }

  removeNineth(spell: string): void {
    const index = this.nineths.indexOf(spell);

    if (index >= 0) {
      this.nineths.splice(index, 1);
    }
  }

  selectedCantrip(event: MatAutocompleteSelectedEvent): void {
    this.cantrips.push(event.option.viewValue);
    this.cantripInput.nativeElement.value = "";
    this.cantripCtrl.setValue(null);
  }
  selectedFirst(event: MatAutocompleteSelectedEvent): void {
    this.firsts.push(event.option.viewValue);
    this.firstInput.nativeElement.value = "";
    this.firstCtrl.setValue(null);
  }
  selectedSecond(event: MatAutocompleteSelectedEvent): void {
    this.seconds.push(event.option.viewValue);
    this.secondInput.nativeElement.value = "";
    this.secondCtrl.setValue(null);
  }
  selectedThird(event: MatAutocompleteSelectedEvent): void {
    this.thirds.push(event.option.viewValue);
    this.thirdInput.nativeElement.value = "";
    this.thirdCtrl.setValue(null);
  }
  selectedFourth(event: MatAutocompleteSelectedEvent): void {
    this.fourths.push(event.option.viewValue);
    this.fourthInput.nativeElement.value = "";
    this.fourthCtrl.setValue(null);
  }
  selectedFifth(event: MatAutocompleteSelectedEvent): void {
    this.fifths.push(event.option.viewValue);
    this.fifthInput.nativeElement.value = "";
    this.fifthCtrl.setValue(null);
  }
  selectedSixth(event: MatAutocompleteSelectedEvent): void {
    this.sixths.push(event.option.viewValue);
    this.sixthInput.nativeElement.value = "";
    this.sixthCtrl.setValue(null);
  }
  selectedSeventh(event: MatAutocompleteSelectedEvent): void {
    this.sevenths.push(event.option.viewValue);
    this.seventhInput.nativeElement.value = "";
    this.seventhCtrl.setValue(null);
  }
  selectedEigth(event: MatAutocompleteSelectedEvent): void {
    this.eigths.push(event.option.viewValue);
    this.eigthInput.nativeElement.value = "";
    this.eigthCtrl.setValue(null);
  }
  selectedNineth(event: MatAutocompleteSelectedEvent): void {
    this.nineths.push(event.option.viewValue);
    this.ninethInput.nativeElement.value = "";
    this.ninethCtrl.setValue(null);
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
