import { Component, OnInit } from "@angular/core";
import * as data from "../../../assets/srd/monsters.json";
import * as faker from "faker";

import { AngularFirestore } from "@angular/fire/firestore";
import { AuthService } from "src/app/core/auth.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AngularEditorConfig } from "@kolkov/angular-editor";

declare var require: any;

@Component({
  selector: "app-overview",
  templateUrl: "./overview.component.html",
})
export class OverviewComponent implements OnInit {
  data = require("../../../assets/srd/monsters.json");
  monsters = <any>data;

  advGenericForm: FormGroup;
  advRelationsForm: FormGroup;
  user;
  campaign: any;
  campaignId: any;
  adventures: any;

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "15rem",
    minHeight: "5rem",
    placeholder: "Enter text here...",
    translate: "no",
    toolbarPosition: "top",
    defaultFontName: "Times New Roman",
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: "redText",
        class: "redText",
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ],
  };

  types = [
    { value: "Thwarting", viewValue: "Thwarting" },
    { value: "Discovering", viewValue: "Discovering" },
    { value: "Delivering", viewValue: "Delivering" },
    { value: "Collecting", viewValue: "Collecting" },
  ];

  focuses = [
    { value: "Master Plot", viewValue: "Master Plot" },
    { value: "Character Plot", viewValue: "Character Plot" },
    { value: "Other", viewValue: "Other" },
  ];

  adversaries = [
    { value: "Villain", viewValue: "Villain" },
    { value: "Nemesis", viewValue: "Nemesis" },
    { value: "Henchmen", viewValue: "Henchmen" },
  ];

  constructor(private fb: FormBuilder, private auth: AuthService, private afs: AngularFirestore) {}

  ngOnInit() {
    this.loader();
    this.advGenericForm = this.fb.group({
      genTitle: "",
      genObjective: "",
      genTheme: "",
      genExpectations: "",
      genOpening: "",
      genType: "",
      genFocus: "",
      genAdversary: "",
      act1Goal: "",
      act1Enemy: "",
      act1Situation: "",
      act2Journey: "",
      act2FirstAttempt: "",
      act3FalseEnding: "",
      act3FinalShowdown: "",
    });

    this.advRelationsForm = this.fb.group({});
  }

  loader() {
    this.auth.getUser().subscribe(user => {
      this.user = user;
      this.campaignId = this.user.campaigns.campaignId;

      this.afs
        .doc(`campaigns/${this.campaignId}`)
        .valueChanges()
        .subscribe(campaign => {
          this.campaign = campaign;

          this.afs
            .collection(`campaigns/${this.campaignId}/adventures`)
            .valueChanges()
            .subscribe(creatures => {
              this.adventures = creatures;
              console.log("adventures: ", this.adventures);
            });
        });
    });
  }

  newAdventure() {
    this.auth.getUser().subscribe(user => {
      this.user = user;
      this.campaignId = this.user.campaigns.campaignId;
      this.afs
        .doc(`campaigns/${this.campaignId}`)
        .valueChanges()
        .subscribe(campaign => {
          this.campaign = campaign;
          const campId = this.campaign.uid;
          const adventureId = {
            uid: faker.random.alphaNumeric(8),
          };

          const adventure = {
            uid: adventureId,
            gentitle: this.advGenericForm.value["genTitle"],
            genObjective: this.advGenericForm.value["genObjective"],
            genTheme: this.advGenericForm.value["genTheme"],
            genExpectations: this.advGenericForm.value["genExpectations"],
            genOpening: this.advGenericForm.value["genOpening"],
            genType: this.advGenericForm.value["genType"],
            genFocus: this.advGenericForm.value["genFocus"],
            genAdversary: this.advGenericForm.value["genAdversary"],
            act1Goal: this.advGenericForm.value["act1Goal"],
            act1Enemy: this.advGenericForm.value["act1Enemy"],
            act1Situation: this.advGenericForm.value["act1Situation"],
            act2Journey: this.advGenericForm.value["act2Journey"],
            act2FirstAttempt: this.advGenericForm.value["act2FirstAttempt"],
            act3FalseEnding: this.advGenericForm.value["act3FalseEnding"],
            act3FinalShowdown: this.advGenericForm.value["act3FinalShowdown"],
          };
          this.afs
            .collection(`campaigns/${campId}/adventures`)
            .doc(adventureId.uid)
            .set(adventure);
          return this.advGenericForm.reset();
        });
    });
  }
}
