import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ReactiveFormsModule
} from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import * as tableData from './smart-data-table';

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user;
  detailForm: FormGroup;
  source: LocalDataSource;

  constructor(private auth: AuthService, private fb: FormBuilder, private afs: AngularFirestore) { 
    this.source = new LocalDataSource(tableData.data); // create the source
  }
  settings = tableData.settings;


  ngOnInit() {
    this.loader();

    this.detailForm = this.fb.group({
      _displayName: ['Test', [Validators.required]],
      dm: ['']
    });
  }

  loader() {
    this.auth.getUser().subscribe(user => {
      this.user = user;
    });
  }

  /// Getters 
  get displayName() { return this.detailForm.get('_displayName'); }
  get dm() { return this.detailForm.get('dm'); }

  /// Handler
  setDetails(user) {
    console.log('User: ', user.uid);
    console.log('Value: ', this.displayName.value);
    if (this.dm.value === true) {
      this.afs.collection('users').doc(this.user.uid).update(
        {
          displayName: this.displayName.value,
          roles: {
            player: false,
            dungeonMaster: true
          },
          photoUrl: 'https://bit.ly/2GIBKO8'
        }
      )
    } else { this.auth.updateUser(user, { displayName: this.displayName.value }); }
  }
}
