import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AuthService } from 'src/app/core/auth.service';
import { faKeyboard } from '@fortawesome/free-solid-svg-icons';
import * as faker from 'faker';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html'
})
export class CitiesComponent implements OnInit {
  cityForm: FormGroup;
  user;
  campaign: any;
  campaignId: any;

  constructor(private afs: AngularFirestore, private fb: FormBuilder, private auth: AuthService) { }

  ngOnInit() {
    this.cityForm = this.fb.group({
      name: ['', Validators.required],
      country: ['', Validators.required],
      population: ['', Validators.required],
      lord: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.load();

  }

  // Getters<3
  get name() { return this.cityForm.get('name'); }
  get country() { return this.cityForm.get('country'); }
  get population() { return this.cityForm.get('population'); }
  get lord() { return this.cityForm.get('lord'); }
  get description() { return this.cityForm.get('description'); }

  // Controller
  newCity() {
    console.log(
      'Name: ',
      this.cityForm.value['name'],
      'Country; ',
      this.cityForm.value['country']
    );

    /* Campaign Getter */
    this.auth.getUser().subscribe(user => {
      this.user = user;
      this.campaignId = this.user.campaigns.campaignId;
      this.afs.doc(`campaigns/${this.campaignId}`).valueChanges().subscribe(campaign => {
        this.campaign = campaign;
        const campId = this.campaign.uid;

        const cityId = {
          uid: this.cityForm.value['name'] + '_' + faker.random.alphaNumeric(4)
        };

        const city = {
          uid: cityId.uid,
          cityName: this.cityForm.value['name'],
          country: this.cityForm.value['country'],
          cityPop: this.cityForm.value['population'],
          cityLeader: this.cityForm.value['lord'],
          cityDesc: this.cityForm.value['description']
        }

        return this.afs.collection(`campaigns/${campId}/cities`).doc(cityId.uid).set(city);
      });
    });

  }

  load() {
    this.auth.getUser();

    this.auth.getUser().subscribe(user => {
      this.user = user;
      this.campaignId = this.user.campaigns.campaignId;
      // console.log('CampaignId', this.campaignId);

      this.afs.doc(`campaigns/${this.campaignId}`).valueChanges().subscribe(campaign => {
        this.campaign = campaign;
        const campId = this.campaign.uid;

        console.log('Campaign: ', campId, this.campaign);
      });

    });

  }
}
