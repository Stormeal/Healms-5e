import { Component, OnInit } from "@angular/core";
import * as data from "../../../assets/srd/monsters.json";
import { AngularFirestore } from "@angular/fire/firestore";
import { AuthService } from "src/app/core/auth.service.js";
import { FormBuilder, FormGroup } from "@angular/forms";

declare var require: any;

@Component({
  selector: "app-overview",
  templateUrl: "./overview.component.html",
})
export class OverviewComponent implements OnInit {
  data = require("../../../assets/srd/monsters.json");
  monsters = <any>data;
  advGenericForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private afs: AngularFirestore) {}

  ngOnInit() {
    this.advGenericForm = this.fb.group({
      genTitle: "",
    });
  }

  loader() {}
}
