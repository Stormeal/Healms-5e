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

declare interface Task {
  title: string;
  checked: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user;
  detailForm: FormGroup;
  source: LocalDataSource;
  fullSource: LocalDataSource;

  public tasks1: Task[];
  public tasks2: Task[];
  public tasks3: Task[];

  constructor(private auth: AuthService, private fb: FormBuilder, private afs: AngularFirestore) {
    this.source = new LocalDataSource(tableData.data); // create the source
    this.fullSource = new LocalDataSource(tableData.enemies);
  }
  settings = tableData.settings;


  ngOnInit() {
    this.loader();
    this.tasks();

    this.detailForm = this.fb.group({
      displayName: ['', [Validators.required]],
    });
  }

  loader() {
    this.auth.getUser().subscribe(user => {
      this.user = user;
    });
  }

  /// Getters 
  get displayName() { return this.detailForm.get('displayName'); }
  get dm() { return this.detailForm.get('dm'); }

  /// Handler
  setDetails(user) {
    console.log('User: ', user.uid);
    console.log('Value: ', this.displayName.value);

    this.auth.updateUser(user, {
      displayName: this.displayName.value
    });
  }

  tasks() {
    this.tasks1 = [
      { title: 'Sign contract for \'What are conference organizers afraid of?\'', checked: false },
      { title: 'Lines From Great Russian Literature? Or E-mails From My Boss?', checked: true },
      {
        title: 'Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit',
        checked: true
      },
      { title: 'Create 4 Invisible User Experiences you Never Knew About', checked: false }
    ];
    this.tasks2 = [
      {
        title: `Flooded: One year later, assessing what was lost and
            what was found when a ravaging rain swept through metro Detroit`,
        checked: true
      },

      { title: 'Sign contract for \'What are conference organizers afraid of?\'', checked: false },
    ];
    this.tasks3 = [

      { title: 'Lines From Great Russian Literature? Or E-mails From My Boss?', checked: false },
      {
        title: 'Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit',
        checked: true
      },
      { title: 'Sign contract for \'What are conference organizers afraid of?\'', checked: false }
    ];
  }
}
