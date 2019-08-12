import { Component, OnInit, Inject } from "@angular/core";
import * as data from "../../../assets/srd/monsters.json";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from "@angular/material";
import { AuthService } from "src/app/core/auth.service";
import { AngularFirestore } from "@angular/fire/firestore";

declare var require: any;

@Component({
  selector: "app-beatiary",
  templateUrl: "./beatiary.component.html",
  styleUrls: ["./beatiary.component.scss"],
})
export class BeatiaryComponent implements OnInit {
  data = require("../../../assets/srd/monsters.json");
  creatures: any;
  user: any;
  campaignId: any;
  campaign: any;
  monsters = <any>data;

  constructor(public dialog: MatDialog, private auth: AuthService, private afs: AngularFirestore) {}

  ngOnInit() {
    this.loader();
  }

  onSelect(monster: any) {
    console.log("Selected item: ", monster);
    console.log(monster.name);
  }

  openDialog(monster: any, dialogConfig: MatDialogConfig): void {
    const dialogRef = this.dialog.open(SheetDialogComponent, {
      width: "1450px",
      data: monster,
    });
    dialogRef.componentInstance.dialogConfig = dialogConfig;
  }

  loader() {
    console.log("You got this far");

    this.auth.getUser().subscribe(user => {
      this.user = user;
      this.campaignId = this.user.campaigns.campaignId;

      this.afs
        .doc(`campaigns/${this.campaignId}`)
        .valueChanges()
        .subscribe(campaign => {
          this.campaign = campaign;

          this.afs
            .collection(`campaigns/${this.campaignId}/creatures`)
            .valueChanges()
            .subscribe(creatures => {
              this.creatures = creatures;
              console.log("Creatures: ", this.creatures);
            });
        });
    });
  }
}

@Component({
  selector: "app-sheet",
  templateUrl: "sheet-dialog.html",
})
export class SheetDialogComponent {
  dialogConfig: MatDialogConfig;
  constructor(
    public dialogRef: MatDialogRef<SheetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public monster: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
