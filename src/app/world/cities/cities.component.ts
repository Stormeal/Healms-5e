import { Component, Inject, OnInit, Input } from '@angular/core';
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
import { Upload } from 'src/app/core/upload';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html'
})
export class CitiesComponent implements OnInit {
  @Input() file: File;

  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;
  cityForm: FormGroup;
  cities: any;
  user;
  campaign: any;
  campaignId: any;
  selectedFiles: FileList;
  currentUpload: Upload;

  constructor(
    private afs: AngularFirestore,
    private fb: FormBuilder,
    private auth: AuthService,
    private storage: AngularFireStorage) { }

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

  detectFiles(event) {
    this.selectedFiles = event.target.files;

  }

  // Getters<3
  get name() { return this.cityForm.get('name'); }
  get country() { return this.cityForm.get('country'); }
  get population() { return this.cityForm.get('population'); }
  get lord() { return this.cityForm.get('lord'); }
  get description() { return this.cityForm.get('description'); }

  // Controller
  newCity() {
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
          cityDesc: this.cityForm.value['description'],
          photoURL: null
        };

        if (this.selectedFiles) {
          const file = this.selectedFiles.item(0)
          this.currentUpload = new Upload(file);

          // The storage path
          const path = `campaigns/${campId}/${city.cityName}`;

          // Reference to storage bucket
          const ref = this.storage.ref(path);

          // The main task
          this.task = this.storage.upload(path, file);
          console.log('You got this far!');

          this.task.snapshotChanges().pipe(
            finalize(() => {
              ref.getDownloadURL().subscribe(url => {
                console.log('URL: ', url); // <-- do what ever you want with the url..
                const cityPhoto = {
                  uid: cityId.uid,
                  cityName: this.cityForm.value['name'],
                  country: this.cityForm.value['country'],
                  cityPop: this.cityForm.value['population'],
                  cityLeader: this.cityForm.value['lord'],
                  cityDesc: this.cityForm.value['description'],
                  photoURL: url
                };
                this.afs.collection(`campaigns/${campId}/cities`).doc(cityId.uid).set(cityPhoto);
                return this.cityForm.reset();

              });
            })
          ).subscribe();
        } else {
          return this.afs.collection(`campaigns/${campId}/cities`).doc(cityId.uid).set(city);
        }
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
        this.afs.collection(`campaigns/${this.campaignId}/cities`)
          .valueChanges()
          .subscribe(cities => {
            this.cities = cities;
            console.log('Cities: ', this.cities);

          })
      });

    });

  }
}
