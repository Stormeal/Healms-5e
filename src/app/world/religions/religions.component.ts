import { Component, OnInit } from "@angular/core";
import { FormArray, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "src/app/core/auth.service";
import { AngularFirestore } from "@angular/fire/firestore";

import * as faker from "faker";

@Component({
  selector: "app-religions",
  templateUrl: "./religions.component.html",
})
export class ReligionsComponent implements OnInit {
  religionForm: FormGroup;
  deitiesList: FormArray;
  user: any;
  campaignId: any;
  campaign: any;
  religions: any;

  get deityFormGroup() {
    return this.religionForm.get("deities") as FormArray;
  }

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private afs: AngularFirestore,
  ) {}

  ngOnInit() {
    this.loader();
    this.religionForm = this.fb.group({
      religionName: "",
      mythology: "",
      origins: "",
      ethics: "",
      divinePowers: "",
      influence: "",
      cosmology: "",
      tenetsOfFaith: "",
      deities: this.fb.array([this.createDeity()]),
    });

    this.deitiesList = this.religionForm.get("deities") as FormArray;
  }

  createDeity(): FormGroup {
    return this.fb.group({
      deityName: ["", Validators.compose([Validators.required])],
      deityAlignment: ["", Validators.compose([Validators.required])],
      deityDomain: ["", Validators.compose([Validators.required])],
      deitySymbol: ["", Validators.compose([Validators.required])],
    });
  }

  addDeity() {
    this.deitiesList.push(this.createDeity());
  }

  removeDeity(index) {
    this.deitiesList.removeAt(index);
  }

  newReligion() {
    this.auth.getUser().subscribe(user => {
      this.user = user;
      this.campaignId = this.user.campaigns.campaignId;
      this.afs
        .doc(`campaigns/${this.campaignId}`)
        .valueChanges()
        .subscribe(campaign => {
          this.campaign = campaign;
          const campId = this.campaign.uid;
          const religionId = {
            uid: faker.random.alphaNumeric(4),
          };
          const religion = {
            uid: religionId,
            religionName: this.religionForm.value["religionName"],
            mythology: this.religionForm.value["mythology"],
            origins: this.religionForm.value["origins"],
            ethics: this.religionForm.value["ethics"],
            divinePowers: this.religionForm.value["divinePowers"],
            influence: this.religionForm.value["influence"],
            cosmology: this.religionForm.value["cosmology"],
            tenetsOfFaith: this.religionForm.value["tenetsOfFaith"],
            deities: this.religionForm.value["deities"],
          };
          this.afs
            .collection(`campaigns/${campId}/religions`)
            .doc(religionId.uid)
            .set(religion);
          return this.religionForm.reset();
        });
    });
  }

  loader() {
    this.auth.getUser();

    this.auth.getUser().subscribe(user => {
      this.user = user;
      this.campaignId = this.user.campaigns.campaignId;

      this.afs
        .doc(`campaigns/${this.campaignId}`)
        .valueChanges()
        .subscribe(campaign => {
          this.campaign = campaign;
          const campId = this.campaign.uid;

          this.afs
            .collection(`campaigns/${this.campaignId}/religions`)
            .valueChanges()
            .subscribe(religions => {
              this.religions = religions;
              console.log("Religions: ", this.religions);
            });
        });
    });
  }
}
