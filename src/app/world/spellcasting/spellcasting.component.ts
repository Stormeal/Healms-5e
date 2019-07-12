import { Component, OnInit, Inject, ViewEncapsulation } from "@angular/core";
import * as data from "../../../assets/srd/spellcasting.json";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogConfig
} from "@angular/material";
import { Observable } from "rxjs";

declare var require: any;

@Component({
  selector: "app-spellcasting",
  templateUrl: "./spellcasting.component.html",
  encapsulation: ViewEncapsulation.None,
  styleUrls: ["./spellcasting.component.scss"]
})
export class SpellcastingComponent implements OnInit {
  spellCasting = require("../../../assets/srd/spellcasting.json");
  spellList = require("../../../assets/srd/spellList.json");
  spells = require("../../../assets/srd/spells.json");
  spells2 = require("../../../assets/srd/spells2.json");

  bardCantrips: Observable<any>;
  bardCantripsDescription;
  bard1st: Observable<any>;
  bard2nd: Observable<any>;
  bard3rd: Observable<any>;
  bard4th: Observable<any>;
  bard5th: Observable<any>;
  bard6th: Observable<any>;
  bard7th: Observable<any>;
  bard8th: Observable<any>;
  bard9th: Observable<any>;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.loader();
    this.getBardSpells();
  }

  loader() {
    const required = this.spellList.Bard.Cantrips[0];

    console.log("Required: ", this.spellList.Bard.Cantrips[0]);

    console.log("Spell", this.spells2.spell);

    const result = this.spells2.spell.find(spell => spell.name[0] === required);

    console.log("Result", result);
  }

  mouseEnter(spell: any) {
    console.log("Spello", spell);

    const required = spell;

    const result = this.spells2.find(_spell => _spell.name[0] === required);
    console.log("Spell Description", result);

    return (this.bardCantripsDescription = result);
  }

  getBardSpells() {
    const cantrips = this.spellList.Bard.Cantrips;
    const spellDescription = this.spells2.spell;

    // this.bardCantripsDescription = spellDescription.find(spell => spell.name[0] === this.bardCantrips);

    this.bardCantrips = this.spellList.Bard.Cantrips;

    // this.bardCantripsDescription = this.spells2.spell.find(spell => spell.name[0] === cantrips);

    console.log("Test 1", this.bardCantripsDescription);
  }

  openDialog(spell: any, dialogConfig: MatDialogConfig) {
    // tslint:disable-next-line: no-use-before-declare
    const dialogRef = this.dialog.open(SpellDialogComponent, {
      data: spell
    });
    dialogRef.componentInstance.dialogConfig = dialogConfig;
  }
}

@Component({
  selector: "app-spell",
  templateUrl: "spell-dialog.html"
})
export class SpellDialogComponent {
  dialogConfig: MatDialogConfig;

  constructor(
    public dialogRef: MatDialogRef<SpellDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public spell: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
