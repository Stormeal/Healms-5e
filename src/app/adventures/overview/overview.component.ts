import { Component, OnInit } from "@angular/core";
import * as data from "../../../assets/srd/monsters.json";
import { AngularFirestore } from "@angular/fire/firestore";
import { AuthService } from "src/app/core/auth.service.js";
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
    });
  }

  loader() {}
}
