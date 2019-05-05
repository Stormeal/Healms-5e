import { Component, OnInit } from '@angular/core';

declare var require: any;

@Component({
  selector: 'app-dm-screen',
  templateUrl: './dm-screen.component.html',
  styleUrls: ['./dm-screen.component.scss']
})
export class DmScreenComponent implements OnInit {
  data = require('./conditions.json');

  constructor() { }

  ngOnInit() {
  }

}
