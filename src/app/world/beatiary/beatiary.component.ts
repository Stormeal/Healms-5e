import { Component, OnInit, Inject } from '@angular/core';
import * as data from '../../../assets/srd/monsters.json';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';

declare var require: any;

@Component({
  selector: 'app-beatiary',
  templateUrl: './beatiary.component.html',
  styleUrls: ['./beatiary.component.scss']
})
export class BeatiaryComponent implements OnInit {
  data = require('../../../assets/srd/monsters.json');
  monsters = (<any>data);


  constructor(public dialog: MatDialog, ) { }

  ngOnInit() {
  }

  onSelect(monster: any) {
    console.log('Selected item: ', monster);
    console.log(monster.name);

  }

  openDialog(monster: any, dialogConfig: MatDialogConfig): void {
    const dialogRef = this.dialog.open(SheetDialogComponent, {
      width: '1450px',
      data: monster
    });
    dialogRef.componentInstance.dialogConfig = dialogConfig;
  }

}

@Component({
  selector: 'app-sheet',
  templateUrl: 'sheet-dialog.html',
})
export class SheetDialogComponent {
  dialogConfig: MatDialogConfig;
  constructor(
    public dialogRef: MatDialogRef<SheetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public monster: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
