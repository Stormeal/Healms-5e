import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
})
export class CitiesComponent implements OnInit {
  cityForm: FormGroup;

  constructor(private afs: AngularFirestore, private fb: FormBuilder) { }

  ngOnInit() {
    this.cityForm = this.fb.group({
      name: ['', Validators.required],
      country: ['', Validators.required],
      population: ['', Validators.required],
      lord: ['', Validators.required],
      description: ['', Validators.required],
    });
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
      'Name: ', this.cityForm.value['name'],
      'Country; ', this.cityForm.value['country']
    );

  }



}
