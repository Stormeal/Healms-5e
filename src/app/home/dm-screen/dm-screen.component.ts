import { Component, OnInit } from '@angular/core';
import * as data from '../../../assets/srd/conditions.json';
import { TableData } from '../../md/md-table/md-table.component';

declare var require: any;

@Component({
  selector: 'app-dm-screen',
  templateUrl: './dm-screen.component.html',
  styleUrls: ['./dm-screen.component.scss']
})
export class DmScreenComponent implements OnInit {
  data = require('../../../assets/srd/conditions.json');
  public dmgSev: TableData;
  public adventuring: TableData;
  public encounterDist: TableData;
  public audible: TableData;
  public visibility: TableData;


  constructor() { }

  ngOnInit() {
    this.dmgSev = {
      headerRow: ['Character Level', 'Setback', 'Dangerous', 'Deadly'],
      dataRows: [
        ['1st - 4th', '1d10', '2d10', '4d10'],
        ['5th - 10th', '2d10', '4d10', '10d10'],
        ['11th - 16th', '4d10', '10d10', '18d10'],
        ['17th - 20th', '10d10', '18d10', '24d10'],
      ]
    };

    this.adventuring = {
      headerRow: ['Experience Points', 'Level', 'Proficiency Bonus'],
      dataRows: [
        ['300', '2', '+2'],
        ['900', '3', '+2'],
        ['2,700', '4', '+2'],
        ['6,500', '5', '+3'],
        ['14,000', '6', '+3'],
        ['23,000', '7', '+3'],
        ['34,000', '8', '+3'],
        ['48,000', '9', '+4'],
        ['64,000', '10', '+4'],
        ['85,000', '11', '+4'],
        ['100,000', '12', '+4'],
        ['120,000', '13', '+5'],
        ['140,000', '14', '+5'],
        ['165,000', '15', '+5'],
        ['195,000', '16', '+5'],
        ['225,000', '17', '+6'],
        ['265,000', '18', '+6'],
        ['305,000', '19', '+6'],
        ['355,000', '20', '+6'],
      ]
    };

    this.encounterDist = {
      headerRow: ['Terrain', 'Encounter Distances'],
      dataRows: [
        ['Arctic, desert, farmland, or grassland	', '6d6 x 10 feet'],
        ['Forest, swamp, or woodland', '2d8 x 10 feet'],
        ['Hills or Wastelands', '2d10 x 10 feet'],
        ['Jungle', '2d6 x 10 feet'],
        ['Mountains', '2d10 x 10 feet'],

      ]
    };

    this.audible = {
      headerRow: ['Noice', 'Distance'],
      dataRows: [
        ['Quiet', '2d6 x 5 feet'],
        ['Normal', '2d8 x 10 feet'],
        ['Loud', '2d10 x 50 feet'],
      ]
    };

    this.visibility = {
      headerRow: ['Type', 'Distance'],
      dataRows: [
        ['Clear Day', '2 miles'],
        ['Rain', '1 mile'],
        ['Fog', '100 to 300 feet'],
      ]
    };
  }

}
