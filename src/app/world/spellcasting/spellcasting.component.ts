import { Component, OnInit } from '@angular/core';
import * as data from '../../../assets/srd/spellcasting.json';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';

declare var require: any;

@Component({
  selector: 'app-spellcasting',
  templateUrl: './spellcasting.component.html',
  styleUrls: ['./spellcasting.component.scss']
})
export class SpellcastingComponent implements OnInit {
  data = require('../../../assets/srd/spellcasting.json');
  spellList = require('../../../assets/srd/spellList.json');

  constructor() { }

  ngOnInit() {
    console.log(this.spellList.Bard.Cantrips);

  }

}
