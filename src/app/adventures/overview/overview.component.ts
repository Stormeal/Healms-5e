import { Component, OnInit } from '@angular/core';
import * as data from '../../../assets/srd/srd_5e_monsters.json';

declare var require: any;

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
})
export class OverviewComponent implements OnInit {
  data = require('../../../assets/srd/srd_5e_monsters.json');
  monsters = (<any>data);

  constructor() { }

  ngOnInit() {
  }

  loader() {

  }

}
