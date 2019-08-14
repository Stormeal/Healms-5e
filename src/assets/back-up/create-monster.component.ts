// import { COMMA, ENTER } from "@angular/cdk/keycodes";
// import { Component, OnInit, ElementRef, ViewChild, Input } from "@angular/core";
// import {
//   FormGroup,
//   FormArray,
//   FormControl,
//   FormBuilder,
//   Validators,
// } from "@angular/forms";
// import {
//   MatAutocompleteSelectedEvent,
//   MatAutocomplete,
// } from "@angular/material/autocomplete";
// import { MatChipInputEvent } from "@angular/material/chips";
// import { Observable } from "rxjs";
// import { map, startWith, finalize } from "rxjs/operators";
// import * as faker from "faker";

// import { AuthService } from "src/app/core/auth.service";
// import { ClassService } from "src/app/core/class.service";
// import { Router } from "@angular/router";
// import { NotificationsComponent } from "../../../components/notifications/notifications.component";

// import { Classes } from "src/assets/ts/Tables/classes";
// import { BARD } from "src/assets/ts/Tables/bardLevelTable";
// import { CLERIC } from "src/assets/ts/Tables/clericLevelTable";
// import { DRUID } from "src/assets/ts/Tables/druidLevelTabel";
// import { PALADIN } from "src/assets/ts/Tables/paladinLevelTable";
// import { RANGER } from "src/assets/ts/Tables/rangerLevelTable";
// import { SORCERER } from "src/assets/ts/Tables/sorcererLevelTable";
// import { WARLOCK } from "src/assets/ts/Tables/warlockLevelTable";
// import { WIZARD } from "src/assets/ts/Tables/wizardLevelTable";

// import { CreatureRaces } from "src/assets/ts/creatureRaces";
// import { CreatureSizes } from "src/assets/ts/creatureSizes";
// import { Alignments } from "src/assets/ts/alignments";
// import { ChallengeRatings } from "src/assets/ts/challengeRatings";
// import { dmgDices, Dices } from "src/assets/ts/dices";
// import { STR, DEX, CON, INT, WIS, CHA } from "src/assets/ts/skillPoints";
// import {
//   SpellCastingAbility,
//   SpellLevel,
//   SpellSlots,
// } from "src/assets/ts/spellcasting";
// import {
//   Cantrips,
//   First,
//   Second,
//   Third,
//   Fourth,
//   Fifth,
//   Sixth,
//   Seventh,
//   Eigth,
//   Nineth,
// } from "src/assets/ts/spells";
// import { Upload } from "src/app/core/upload";
// import { AngularFirestore } from "@angular/fire/firestore";
// import { faKeyboard } from "@fortawesome/free-solid-svg-icons";
// import {
//   AngularFireUploadTask,
//   AngularFireStorage,
// } from "@angular/fire/storage";

// declare var require: any;
// declare const $: any;

// @Component({
//   selector: "app-create-monster",
//   templateUrl: "./create-monster.component.html",
// })
// export class CreateMonsterComponent implements OnInit {
//   @Input() file: File;
//   public creatureRacesSelect = CreatureRaces[0].viewValue;
//   public creatureSizeSelect = CreatureSizes[2].viewValue;
//   public alignmentsSelect = Alignments[4].viewValue;
//   public challengeRatingSelect = ChallengeRatings[3].viewValue;
//   public dicesSelect = Dices[2].viewValue;
//   public dmgDicesSelect = dmgDices[2].viewValue;
//   public spellcastingAbilitySelect = SpellCastingAbility[0].viewValue;
//   public spellslotsSelect = SpellSlots[0].viewValue;
//   public spellLevelSelect = SpellLevel[0].viewValue;

//   public strSelect = STR[2].viewValue;
//   public dexSelect = DEX[2].viewValue;
//   public conSelect = CON[2].viewValue;
//   public intSelect = INT[2].viewValue;
//   public wisSelect = WIS[2].viewValue;
//   public chaSelect = CHA[2].viewValue;

//   public allCantrips = Cantrips;
//   public cantrips = ["Dancing Light"];
//   public allFirst = First;
//   public firsts = ["Alarm"];
//   public allSecond = Second;
//   public seconds = [Second[0]];
//   public allThird = Third;
//   public thirds = [Third[0]];
//   public allFourth = Fourth;
//   public fourths = [Fourth[0]];
//   public allFifth = Fifth;
//   public fifths = [Fifth[0]];
//   public allSixth = Sixth;
//   public sixths = [Sixth[0]];
//   public allSeventh = Seventh;
//   public sevenths = [Seventh[0]];
//   public allEight = Eigth;
//   public eigths = [Eigth[0]];
//   public allNineth = Nineth;
//   public nineths = [Nineth[0]];

//   creatureForm: FormGroup;
//   traitList: FormArray;
//   actionList: FormArray;
//   reactionList: FormArray;
//   legendaryList: FormArray;

//   task: AngularFireUploadTask;
//   user;
//   campaign: any;
//   campaignId: any;
//   selectedFiles: FileList;
//   currentUpload: Upload;

//   strength: string;

//   bard = BARD;
//   cleric = CLERIC;
//   druid = DRUID;
//   paladin = PALADIN;
//   ranger = RANGER;
//   sorcerer = SORCERER;
//   warlock = WARLOCK;
//   wizard = WIZARD;

//   selectedWizard: Classes;
//   isTrue = false; // Set this to false when live. True is for testing purposes.
//   reactionTrue = false; // Set this to false when live. True is for testing purposes.
//   legendaryTrue = false; // Set this to false when live. Thre is for testing purposes.

//   creatureRaces = CreatureRaces;
//   creatureSizes = CreatureSizes;
//   alignments = Alignments;
//   challengeRatings = ChallengeRatings;
//   dices = Dices;
//   dmgDices = dmgDices;
//   spellCastingAbility = SpellCastingAbility;
//   spellSlots = SpellSlots;
//   spellLevels = SpellLevel;

//   str = STR;
//   dex = DEX;
//   con = CON;
//   int = INT;
//   wis = WIS;
//   cha = CHA;

//   visible = true;
//   selectable = true;
//   removable = true;
//   addOnBlur = true;
//   separatorKeysCodes: number[] = [ENTER, COMMA];

//   cantripCtrl = new FormControl();
//   filteredCantrips: Observable<string[]>;
//   firstCtrl = new FormControl();
//   filteredFirsts: Observable<string[]>; // 1st
//   secondCtrl = new FormControl();
//   filteredSeconds: Observable<string[]>; // 2nd
//   thirdCtrl = new FormControl();
//   filteredThirds: Observable<string[]>; // 3rd
//   fourthCtrl = new FormControl();
//   filteredFourths: Observable<string[]>; // 4th
//   fifthCtrl = new FormControl();
//   filteredFifths: Observable<string[]>; // 5th
//   sixthCtrl = new FormControl();
//   filteredSixths: Observable<string[]>; // 6th
//   seventhCtrl = new FormControl();
//   filteredSevenths: Observable<string[]>; // 7th
//   eigthCtrl = new FormControl();
//   filteredEigths: Observable<string[]>; // 6th
//   ninethCtrl = new FormControl();
//   filteredNineths: Observable<string[]>; // 7th

//   @ViewChild("cantripInput", { static: false }) cantripInput: ElementRef<
//     HTMLInputElement
//   >;
//   @ViewChild("firstInput", { static: false }) firstInput: ElementRef<
//     HTMLInputElement
//   >;
//   @ViewChild("secondInput", { static: false }) secondInput: ElementRef<
//     HTMLInputElement
//   >;
//   @ViewChild("thirdInput", { static: false }) thirdInput: ElementRef<
//     HTMLInputElement
//   >;
//   @ViewChild("fourthInput", { static: false }) fourthInput: ElementRef<
//     HTMLInputElement
//   >;
//   @ViewChild("fifthInput", { static: false }) fifthInput: ElementRef<
//     HTMLInputElement
//   >;
//   @ViewChild("sixthInput", { static: false }) sixthInput: ElementRef<
//     HTMLInputElement
//   >;
//   @ViewChild("seventhInput", { static: false }) seventhInput: ElementRef<
//     HTMLInputElement
//   >;
//   @ViewChild("eigthInput", { static: false }) eigthInput: ElementRef<
//     HTMLInputElement
//   >;
//   @ViewChild("ninethInput", { static: false }) ninethInput: ElementRef<
//     HTMLInputElement
//   >;

//   public wizardLevelSelect = this.wizard[0].viewValue;
//   public spellClass = [
//     { value: this.bard, viewValue: "Bard" },
//     { value: this.cleric, viewValue: "Cleric" },
//     { value: this.druid, viewValue: "Druid" },
//     { value: this.paladin, viewValue: "Paladin" },
//     { value: this.ranger, viewValue: "Ranger" },
//     { value: this.sorcerer, viewValue: "Sorcerer" },
//     { value: this.warlock, viewValue: "Warlock" },
//     { value: this.wizard, viewValue: "Wizard" },
//   ];
//   public spellClassSelect = this.spellClass[7].value;

//   get traitFormGroup() {
//     return this.creatureForm.get("traits") as FormArray;
//   }

//   get actionFormGroup() {
//     return this.creatureForm.get("actions") as FormArray;
//   }

//   get reactionFormGroup() {
//     return this.creatureForm.get("reactions") as FormArray;
//   }

//   get legendaryFormGroup() {
//     return this.creatureForm.get("legendary") as FormArray;
//   }

//   constructor(
//     private auth: AuthService,
//     // private cs: ClassService,
//     private router: Router,
//     private fb: FormBuilder,
//     private afs: AngularFirestore,
//     private storage: AngularFireStorage,
//   ) {
//     this.filteredCantrips = this.cantripCtrl.valueChanges.pipe(
//       // tslint:disable-next-line: deprecation
//       startWith(null),
//       map((cantrip: string | null) =>
//         cantrip ? this._filter(cantrip) : this.allCantrips.slice(),
//       ),
//     );
//     this.filteredFirsts = this.firstCtrl.valueChanges.pipe(
//       // tslint:disable-next-line: deprecation
//       startWith(null),
//       map((first: string | null) =>
//         first ? this._firstFilter(first) : this.allFirst.slice(),
//       ),
//     );
//     this.filteredSeconds = this.secondCtrl.valueChanges.pipe(
//       // tslint:disable-next-line: deprecation
//       startWith(null),
//       map((second: string | null) =>
//         second ? this._secondFilter(second) : this.allSecond.slice(),
//       ),
//     );
//     this.filteredThirds = this.thirdCtrl.valueChanges.pipe(
//       // tslint:disable-next-line: deprecation
//       startWith(null),
//       map((third: string | null) =>
//         third ? this._thirdFilter(third) : this.allThird.slice(),
//       ),
//     );
//     this.filteredFourths = this.fourthCtrl.valueChanges.pipe(
//       // tslint:disable-next-line: deprecation
//       startWith(null),
//       map((fourth: string | null) =>
//         fourth ? this._fourthFilter(fourth) : this.allFourth.slice(),
//       ),
//     );
//     this.filteredFifths = this.fifthCtrl.valueChanges.pipe(
//       // tslint:disable-next-line: deprecation
//       startWith(null),
//       map((fifth: string | null) =>
//         fifth ? this._fifthFilter(fifth) : this.allFifth.slice(),
//       ),
//     );
//     this.filteredSixths = this.sixthCtrl.valueChanges.pipe(
//       // tslint:disable-next-line: deprecation
//       startWith(null),
//       map((sixth: string | null) =>
//         sixth ? this._sixthFilter(sixth) : this.allSixth.slice(),
//       ),
//     );
//     this.filteredSevenths = this.seventhCtrl.valueChanges.pipe(
//       // tslint:disable-next-line: deprecation
//       startWith(null),
//       map((seventh: string | null) =>
//         seventh ? this._seventhFilter(seventh) : this.allSeventh.slice(),
//       ),
//     );
//     this.filteredEigths = this.sixthCtrl.valueChanges.pipe(
//       // tslint:disable-next-line: deprecation
//       startWith(null),
//       map((eigth: string | null) =>
//         eigth ? this._eigthFilter(eigth) : this.allEight.slice(),
//       ),
//     );
//     this.filteredNineths = this.seventhCtrl.valueChanges.pipe(
//       // tslint:disable-next-line: deprecation
//       startWith(null),
//       map((nineth: string | null) =>
//         nineth ? this._ninethFilter(nineth) : this.allNineth.slice(),
//       ),
//     );
//   }

//   ngOnInit() {
//     this.creatureForm = this.fb.group({
//       creatureName: "",
//       creatureSize: "",
//       creatureRace: "",
//       creatureAlignment: "",
//       creatureDescription: "",

//       str: STR[2],
//       dex: "",
//       con: "",
//       int: "",
//       wis: "",
//       cha: "",

//       armorClass: "",
//       hitPoints: "",
//       hitDie: "",
//       hitModifier: "",
//       speed: "",

//       savingThrows: "",
//       skills: "",
//       dmgRes: "",
//       dmgImmunities: "",
//       languages: "",
//       senses: "",
//       challengeRating: "",

//       spellClass: "",
//       spellLevel: "",
//       spellcastingAbility: "",
//       spellAttMod: "",
//       spellSave: "",

//       cantrip: "",
//       first: "",
//       second: "",
//       third: "",
//       fourth: "",
//       fifth: "",
//       sixth: "",
//       seventh: "",
//       eight: "",
//       nineth: "",

//       traits: this.fb.array([this.createTrait()]),
//       actions: this.fb.array([this.createAction()]),
//       reactions: this.fb.array([this.createReaction()]),
//       legendary: this.fb.array([this.createLegendary()]),
//     });
//     this.traitList = this.creatureForm.get("traits") as FormArray;
//     this.actionList = this.creatureForm.get("actions") as FormArray;
//     this.reactionList = this.creatureForm.get("reactions") as FormArray;
//     this.legendaryList = this.creatureForm.get("legendary") as FormArray;

//     this.getWizard();
//     console.log("Cantrip ctrl: ", this.cantripCtrl);
//     console.log("Filtered cantrips: ", this.filteredCantrips);
//     console.log("Test: ", this.cantripInput);
//   }

//   detectFiles(event) {
//     this.selectedFiles = event.target.files;
//   }

//   /* Everything related to the spellchips */
//   private _filter(cantrip: string) {
//     return this.allCantrips.filter(
//       spell => spell.toLowerCase().indexOf(cantrip.toLowerCase()) === 0,
//     );
//   }
//   private _firstFilter(name: string) {
//     return this.allFirst.filter(
//       spell => spell.toLowerCase().indexOf(name.toLowerCase()) === 0,
//     );
//   }
//   private _secondFilter(name: string) {
//     return this.allSecond.filter(
//       spell => spell.toLowerCase().indexOf(name.toLowerCase()) === 0,
//     );
//   }
//   private _thirdFilter(name: string) {
//     return this.allThird.filter(
//       spell => spell.toLowerCase().indexOf(name.toLowerCase()) === 0,
//     );
//   }
//   private _fourthFilter(name: string) {
//     return this.allFourth.filter(
//       spell => spell.toLowerCase().indexOf(name.toLowerCase()) === 0,
//     );
//   }
//   private _fifthFilter(name: string) {
//     return this.allFifth.filter(
//       spell => spell.toLowerCase().indexOf(name.toLowerCase()) === 0,
//     );
//   }
//   private _sixthFilter(name: string) {
//     return this.allSixth.filter(
//       spell => spell.toLowerCase().indexOf(name.toLowerCase()) === 0,
//     );
//   }
//   private _seventhFilter(name: string) {
//     return this.allSeventh.filter(
//       spell => spell.toLowerCase().indexOf(name.toLowerCase()) === 0,
//     );
//   }
//   private _eigthFilter(name: string) {
//     return this.allEight.filter(
//       spell => spell.toLowerCase().indexOf(name.toLowerCase()) === 0,
//     );
//   }
//   private _ninethFilter(name: string) {
//     return this.allNineth.filter(
//       spell => spell.toLowerCase().indexOf(name.toLowerCase()) === 0,
//     );
//   }

//   addCantrip(event: MatChipInputEvent): void {
//     // Add spells only when MatAutocomplete is not open
//     // To make sure this does not conflic with OptionsSelected Event

//     console.log("Cantrip ere");

//     const input = event.input;
//     const value = event.value;

//     // Add our spells
//     if ((value || "").trim()) {
//       this.cantrips.push(value.trim());
//     }

//     // Resets the input value
//     if (input) {
//       input.value = "";
//     }

//     this.cantripCtrl.setValue(null);
//   }

//   addFirst(event: MatChipInputEvent): void {
//     // Add spells only when MatAutocomplete is not open
//     // To make sure this does not conflic with OptionsSelected Event

//     console.log("First ere'");

//     const input = event.input;
//     const value = event.value;

//     // Add our spells
//     if ((value || "").trim()) {
//       this.firsts.push(value.trim());
//     }

//     // Resets the input value
//     if (input) {
//       input.value = "";
//     }

//     this.firstCtrl.setValue(null);
//   }

//   addSecond(event: MatChipInputEvent): void {
//     const input = event.input;
//     const value = event.value;

//     if ((value || "").trim()) {
//       this.seconds.push(value.trim());
//     }

//     if (input) {
//       input.value = "";
//     }
//     this.secondCtrl.setValidators(null);
//   }

//   addThird(event: MatChipInputEvent): void {
//     const input = event.input;
//     const value = event.value;

//     if ((value || "").trim()) {
//       this.thirds.push(value.trim());
//     }

//     if (input) {
//       input.value = "";
//     }
//     this.thirdCtrl.setValidators(null);
//   }

//   addFourth(event: MatChipInputEvent): void {
//     const input = event.input;
//     const value = event.value;

//     if ((value || "").trim()) {
//       this.fourths.push(value.trim());
//     }

//     if (input) {
//       input.value = "";
//     }
//     this.fourthCtrl.setValidators(null);
//   }

//   addFifth(event: MatChipInputEvent): void {
//     const input = event.input;
//     const value = event.value;

//     if ((value || "").trim()) {
//       this.fifths.push(value.trim());
//     }

//     if (input) {
//       input.value = "";
//     }
//     this.fifthCtrl.setValidators(null);
//   }

//   addSixth(event: MatChipInputEvent): void {
//     const input = event.input;
//     const value = event.value;

//     if ((value || "").trim()) {
//       this.sixths.push(value.trim());
//     }

//     if (input) {
//       input.value = "";
//     }
//     this.sixthCtrl.setValidators(null);
//   }

//   addSeventh(event: MatChipInputEvent): void {
//     const input = event.input;
//     const value = event.value;

//     if ((value || "").trim()) {
//       this.sevenths.push(value.trim());
//     }

//     if (input) {
//       input.value = "";
//     }
//     this.seventhCtrl.setValidators(null);
//   }
//   addEigth(event: MatChipInputEvent): void {
//     const input = event.input;
//     const value = event.value;

//     if ((value || "").trim()) {
//       this.eigths.push(value.trim());
//     }

//     if (input) {
//       input.value = "";
//     }
//     this.eigthCtrl.setValidators(null);
//   }

//   addNineth(event: MatChipInputEvent): void {
//     const input = event.input;
//     const value = event.value;

//     if ((value || "").trim()) {
//       this.nineths.push(value.trim());
//     }

//     if (input) {
//       input.value = "";
//     }
//     this.ninethCtrl.setValidators(null);
//   }

//   removeCantrip(spell: string): void {
//     const index = this.cantrips.indexOf(spell);

//     if (index >= 0) {
//       this.cantrips.splice(index, 1);
//     }
//   }

//   removeFirst(spell: string): void {
//     const index = this.firsts.indexOf(spell);

//     if (index >= 0) {
//       this.firsts.splice(index, 1);
//     }
//   }

//   removeSecond(spell: string): void {
//     const index = this.seconds.indexOf(spell);

//     if (index >= 0) {
//       this.seconds.splice(index, 1);
//     }
//   }

//   removeThird(spell: string): void {
//     const index = this.thirds.indexOf(spell);

//     if (index >= 0) {
//       this.thirds.splice(index, 1);
//     }
//   }

//   removeFourth(spell: string): void {
//     const index = this.fourths.indexOf(spell);

//     if (index >= 0) {
//       this.fourths.splice(index, 1);
//     }
//   }

//   removeFifth(spell: string): void {
//     const index = this.fifths.indexOf(spell);

//     if (index >= 0) {
//       this.fifths.splice(index, 1);
//     }
//   }

//   removeSixth(spell: string): void {
//     const index = this.sixths.indexOf(spell);

//     if (index >= 0) {
//       this.sixths.splice(index, 1);
//     }
//   }

//   removeSeventh(spell: string): void {
//     const index = this.sevenths.indexOf(spell);

//     if (index >= 0) {
//       this.sevenths.splice(index, 1);
//     }
//   }

//   removeEigth(spell: string): void {
//     const index = this.eigths.indexOf(spell);

//     if (index >= 0) {
//       this.eigths.splice(index, 1);
//     }
//   }

//   removeNineth(spell: string): void {
//     const index = this.nineths.indexOf(spell);

//     if (index >= 0) {
//       this.nineths.splice(index, 1);
//     }
//   }

//   selectedCantrip(event: MatAutocompleteSelectedEvent): void {
//     this.cantrips.push(event.option.viewValue);
//     this.cantripInput.nativeElement.value = "";
//     this.cantripCtrl.setValue(null);
//   }
//   selectedFirst(event: MatAutocompleteSelectedEvent): void {
//     this.firsts.push(event.option.viewValue);
//     this.firstInput.nativeElement.value = "";
//     this.firstCtrl.setValue(null);
//   }
//   selectedSecond(event: MatAutocompleteSelectedEvent): void {
//     this.seconds.push(event.option.viewValue);
//     this.secondInput.nativeElement.value = "";
//     this.secondCtrl.setValue(null);
//   }
//   selectedThird(event: MatAutocompleteSelectedEvent): void {
//     this.thirds.push(event.option.viewValue);
//     this.thirdInput.nativeElement.value = "";
//     this.thirdCtrl.setValue(null);
//   }
//   selectedFourth(event: MatAutocompleteSelectedEvent): void {
//     this.fourths.push(event.option.viewValue);
//     this.fourthInput.nativeElement.value = "";
//     this.fourthCtrl.setValue(null);
//   }
//   selectedFifth(event: MatAutocompleteSelectedEvent): void {
//     this.fifths.push(event.option.viewValue);
//     this.fifthInput.nativeElement.value = "";
//     this.fifthCtrl.setValue(null);
//   }
//   selectedSixth(event: MatAutocompleteSelectedEvent): void {
//     this.sixths.push(event.option.viewValue);
//     this.sixthInput.nativeElement.value = "";
//     this.sixthCtrl.setValue(null);
//   }
//   selectedSeventh(event: MatAutocompleteSelectedEvent): void {
//     this.sevenths.push(event.option.viewValue);
//     this.seventhInput.nativeElement.value = "";
//     this.seventhCtrl.setValue(null);
//   }
//   selectedEigth(event: MatAutocompleteSelectedEvent): void {
//     this.eigths.push(event.option.viewValue);
//     this.eigthInput.nativeElement.value = "";
//     this.eigthCtrl.setValue(null);
//   }
//   selectedNineth(event: MatAutocompleteSelectedEvent): void {
//     this.nineths.push(event.option.viewValue);
//     this.ninethInput.nativeElement.value = "";
//     this.ninethCtrl.setValue(null);
//   }

//   /* End of Spell chips */

//   getWizard(): void {
//     console.log(this.allCantrips);
//   }

//   onSelect(wiz: Classes): void {
//     this.selectedWizard = wiz;
//   }

//   createTrait(): FormGroup {
//     return this.fb.group({
//       traitName: ["", Validators.compose([Validators.required])],
//       traitDescription: ["", Validators.compose([Validators.required])],
//     });
//   }

//   addTrait() {
//     this.traitList.push(this.createTrait());
//   }

//   removeTrait(index) {
//     this.traitList.removeAt(index);
//   }

//   createAction(): FormGroup {
//     return this.fb.group({
//       actionName: ["", Validators.compose([Validators.required])],
//       actionDescription: ["", Validators.compose([Validators.required])],
//       actionHitMod: ["", Validators.compose([Validators.required])],
//       actionReach: ["", Validators.compose([Validators.required])],
//       actionDmg: ["", Validators.compose([Validators.required])],
//       actionDice: ["", Validators.compose([Validators.required])],
//       actionDmgMod: ["", Validators.compose([Validators.required])],
//     });
//   }

//   addAction() {
//     this.actionList.push(this.createAction());
//   }

//   removeAction(index) {
//     this.actionList.removeAt(index);
//   }

//   createReaction(): FormGroup {
//     return this.fb.group({
//       reactionName: ["", Validators.compose([Validators.required])],
//       reactionDescription: ["", Validators.compose([Validators.required])],
//     });
//   }

//   addReaction() {
//     this.reactionReturnTrue();
//     this.reactionList.push(this.createReaction());
//   }

//   removeReaction(index) {
//     this.reactionList.removeAt(index);
//   }

//   createLegendary(): FormGroup {
//     return this.fb.group({
//       legendaryName: ["", Validators.compose([Validators.required])],
//       legendaryDescription: ["", Validators.compose([Validators.required])],
//       legendaryHitMod: ["", Validators.compose([Validators.required])],
//       legendaryReach: ["", Validators.compose([Validators.required])],
//       legendaryDmg: ["", Validators.compose([Validators.required])],
//       legendaryDice: ["", Validators.compose([Validators.required])],
//       legendaryDmgMod: ["", Validators.compose([Validators.required])],
//     });
//   }

//   addLegendary() {
//     this.legendaryList.push(this.createLegendary());
//   }

//   removeLegendary(index) {
//     this.legendaryList.removeAt(index);
//   }

//   test(e): boolean {
//     if (e.target.checked) {
//       return this.returnsTrue();
//     } else {
//       return (this.isTrue = false);
//     }
//   }

//   legendary(e): boolean {
//     if (e.target.checked) {
//       return this.legendaryReturnsTrue();
//     } else {
//       return (this.legendaryTrue = false);
//     }
//   }

//   returnsTrue(): boolean {
//     console.log("Returns true");
//     return (this.isTrue = true);
//   }

//   reactionReturnTrue(): boolean {
//     console.log("Returns true");
//     return (this.reactionTrue = true);
//   }

//   legendaryReturnsTrue(): boolean {
//     console.log("Legardy Affirmative");
//     return (this.legendaryTrue = true);
//   }

//   newMonster() {
//     /* CAMPAIGN GETTER */
//     this.auth.getUser().subscribe(user => {
//       this.user = user;
//       this.campaignId = this.user.campaigns.campaignId;
//       this.afs
//         .doc(`campaigns/${this.campaignId}`)
//         .valueChanges()
//         .subscribe(campaign => {
//           this.campaign = campaign;
//           const campId = this.campaign.uid;

//           const creatureId = {
//             uid:
//               this.creatureForm.value["creatureName"] +
//               "_" +
//               faker.random.alphaNumeric(4),
//           };

//           const creature = {
//             uid: creatureId.uid,
//             creatureName: this.creatureForm.value["creatureName"],
//             creatureSize: this.creatureForm.value["creatureSize"],
//             creatureRace: this.creatureForm.value["creatureRace"],
//             creatureAlignment: this.creatureForm.value["creatureAlignment"],
//             creatureDescription: this.creatureForm.value["creatureDescription"],

//             strength: this.creatureForm.value["str"],
//             dexterity: this.creatureForm.value["dex"],
//             constitution: this.creatureForm.value["con"],
//             intelligence: this.creatureForm.value["int"],
//             wisdom: this.creatureForm.value["wis"],
//             charisma: this.creatureForm.value["cha"],

//             armorClass: this.creatureForm.value["armorClass"],
//             hitPoints: this.creatureForm.value["hitPoints"],
//             hitDie: this.creatureForm.value["hitDie"],
//             hitModifier: this.creatureForm.value["hitModifier"],
//             speed: this.creatureForm.value["speed"],

//             savingThrows: this.creatureForm.value["savingThrows"],
//             skills: this.creatureForm.value["skills"],
//             dmgRes: this.creatureForm.value["dmgRes"],
//             dmgImmunities: this.creatureForm.value["dmgImmunities"],
//             languages: this.creatureForm.value["languages"],
//             senses: this.creatureForm.value["senses"],
//             challengeRating: this.creatureForm.value["challengeRating"],

//             spellSave: this.creatureForm.value["spellSave"],
//             spellcastingAbility: this.creatureForm.value["spellcastingAbility"],
//             spellClass: this.creatureForm.value["spellClass"],
//             spellLevel: this.creatureForm.value["spellLevel"],
//             spellCantrip: this.creatureForm.value["cantrip"],
//             spellFirst: this.creatureForm.value["first"],
//             spellSecond: this.creatureForm.value["second"],
//             spellThird: this.creatureForm.value["third"],
//             spellFourth: this.creatureForm.value["fourth"],
//             spellFifth: this.creatureForm.value["fifth"],
//             spellSixth: this.creatureForm.value["sixth"],
//             spellSeventh: this.creatureForm.value["seventh"],
//             spellEight: this.creatureForm.value["eight"],
//             spellNineth: this.creatureForm.value["nineth"],

//             traits: this.creatureForm.value["traits"],
//             actions: this.creatureForm.value["actions"],
//             reactions: this.creatureForm.value["reactions"],
//             legendaryAction: this.creatureForm.value["legendary"],

//             legendaryTrue: this.legendaryTrue,
//             reactionTrue: this.reactionTrue,
//             spellCaster: this.isTrue,

//             photoURL: null,
//           };

//           if (this.selectedFiles) {
//             const file = this.selectedFiles.item(0);
//             this.currentUpload = new Upload(file);

//             // The storage path
//             const path = `campaigns/${campId}/creatures/${file.name} + ${Date.now()}`;

//             // Reference to storage bucket
//             const ref = this.storage.ref(path);

//             // The main task
//             this.task = this.storage.upload(path, file);
//             console.log("You got this far!");

//             this.task
//               .snapshotChanges()
//               .pipe(
//                 finalize(() => {
//                   ref.getDownloadURL().subscribe(url => {
//                     console.log("URL: ", url); // <-- do what ever you want with the url..
//                     const creaturePhoto = {
//                       uid: creatureId.uid,
//                       creatureName: this.creatureForm.value["creatureName"],
//                       creatureSize: this.creatureForm.value["creatureSize"],
//                       creatureRace: this.creatureForm.value["creatureRace"],
//                       creatureAlignment: this.creatureForm.value[
//                         "creatureAlignment"
//                       ],
//                       creatureDescription: this.creatureForm.value["creatureDescription"],

//                       strength: this.creatureForm.value["str"],
//                       dexterity: this.creatureForm.value["dex"],
//                       constitution: this.creatureForm.value["con"],
//                       intelligence: this.creatureForm.value["int"],
//                       wisdom: this.creatureForm.value["wis"],
//                       charisma: this.creatureForm.value["cha"],

//                       armorClass: this.creatureForm.value["armorClass"],
//                       hitPoints: this.creatureForm.value["hitPoints"],
//                       hitDie: this.creatureForm.value["hitDie"],
//                       hitModifier: this.creatureForm.value["hitModifier"],
//                       speed: this.creatureForm.value["speed"],

//                       savingThrows: this.creatureForm.value["savingThrows"],
//                       skills: this.creatureForm.value["skills"],
//                       dmgRes: this.creatureForm.value["dmgRes"],
//                       dmgImmunities: this.creatureForm.value["dmgImmunities"],
//                       languages: this.creatureForm.value["languages"],
//                       senses: this.creatureForm.value["senses"],
//                       challengeRating: this.creatureForm.value[
//                         "challengeRating"
//                       ],

//                       spellSave: this.creatureForm.value["spellSave"],
//                       spellcastingAbility: this.creatureForm.value[
//                         "spellcastingAbility"
//                       ],
//                       spellClass: this.creatureForm.value["spellClass"],
//                       spellLevel: this.creatureForm.value["spellLevel"],
//                       spellCantrip: this.creatureForm.value["cantrip"],
//                       spellFirst: this.creatureForm.value["first"],
//                       spellSecond: this.creatureForm.value["second"],
//                       spellThird: this.creatureForm.value["third"],
//                       spellFourth: this.creatureForm.value["fourth"],
//                       spellFifth: this.creatureForm.value["fifth"],
//                       spellSixth: this.creatureForm.value["sixth"],
//                       spellSeventh: this.creatureForm.value["seventh"],
//                       spellEight: this.creatureForm.value["eight"],
//                       spellNineth: this.creatureForm.value["nineth"],

//                       traits: this.creatureForm.value["traits"],
//                       actions: this.creatureForm.value["actions"],
//                       reactions: this.creatureForm.value["reactions"],
//                       legendaryAction: this.creatureForm.value["legendary"],

//                       legendaryTrue: this.legendaryTrue,
//                       reactionTrue: this.reactionTrue,
//                       spellCaster: this.isTrue,

//                       photoURL: url,
//                     };
//                     this.afs
//                       .collection(`campaigns/${campId}/creatures`)
//                       .doc(creature.uid)
//                       .set(creaturePhoto);
//                     return this.creatureForm.reset();
//                   });
//                 }),
//               )
//               .subscribe();
//           } else {
//             this.afs
//               .collection(`campaigns/${campId}/creatures`)
//               .doc(creatureId.uid)
//               .set(creature);
//             return this.creatureForm.reset();

//           }

//         });
//     });

//     // Prepare the preview for profile picture
//     $("#creature-picture").change(function () {
//       const input = $(this);

//       if (input[0].files && input[0].files[0]) {
//         const reader = new FileReader();

//         reader.onload = function (e: any) {
//           $("#creaturePicturePreview")
//             .attr("src", e.target.result)
//             .fadeIn("slow");
//         };
//         reader.readAsDataURL(input[0].files[0]);
//       }
//     });
//   }
// }
