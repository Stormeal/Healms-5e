import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {
  races = [
    { value: 'Hill Dwarf', viewValue: 'Hill Dwarf' },
    { value: 'Mountain Dwarf', viewValue: 'Mountain Dwarf' },
    { value: 'Dragonbord', viewValue: 'Dragonborn' },
    { value: 'High Elf', viewValue: 'High Elf' },
    { value: 'Wood Elf', viewValue: 'Wood Elf' },
    { value: 'Rock Gnome', viewValue: 'Rock Gnome' },
    { value: 'Lightfoot Halfling', viewValue: 'Lightfoot Halfling' },
    { value: 'Stout Halfling', viewValue: 'Stout Halfling' },
    { value: 'Half-Elf', viewValue: 'Half-Elf' },
    { value: 'Half-Orc', viewValue: 'Half-Orc' },
    { value: 'Human', viewValue: 'Human' },
    { value: 'Tiefling', viewValue: 'Tiefling' }
  ];
  classes = [
    { value: 'barb', viewValue: 'Barbarian' },
    { value: 'bard', viewValue: 'Bard' },
    { value: 'cleric', viewValue: 'Cleric' },
    { value: 'fighter', viewValue: 'Fighter' },
    { value: 'monk', viewValue: 'Monk' },
    { value: 'paladin', viewValue: 'Paladin' },
    { value: 'ranger', viewValue: 'Ranger' },
    { value: 'runemaster', viewValue: 'Runemaster' },
    { value: 'sorcere', viewValue: 'Sorcerer' },
    { value: 'warlock', viewValue: 'Warlock' },
    { value: 'wizard', viewValue: 'Wizard' },
  ];
  level = [
    { value: 1, viewValue: 1 },
    { value: 2, viewValue: 2 },
    { value: 3, viewValue: 3 },
    { value: 4, viewValue: 4 },
    { value: 5, viewValue: 5 },
    { value: 6, viewValue: 6 },
    { value: 7, viewValue: 7 },
    { value: 8, viewValue: 8 },
    { value: 9, viewValue: 9 },
    { value: 10, viewValue: 10 },
    { value: 11, viewValue: 11 },
    { value: 12, viewValue: 12 },
    { value: 13, viewValue: 13 },
    { value: 14, viewValue: 14 },
    { value: 15, viewValue: 15 },
    { value: 16, viewValue: 16 },
    { value: 17, viewValue: 17 },
    { value: 18, viewValue: 18 },
    { value: 19, viewValue: 19 },
    { value: 20, viewValue: 20 },
  ];
  ac = [
    { value: 10, viewValue: 10 },
    { value: 11, viewValue: 11 },
    { value: 12, viewValue: 12 },
    { value: 13, viewValue: 13 },
    { value: 14, viewValue: 14 },
    { value: 15, viewValue: 15 },
    { value: 16, viewValue: 16 },
    { value: 17, viewValue: 17 },
    { value: 18, viewValue: 18 },
    { value: 19, viewValue: 19 },
    { value: 20, viewValue: 20 },
    { value: 21, viewValue: 21 },
    { value: 22, viewValue: 22 },
    { value: 23, viewValue: 23 },
    { value: 24, viewValue: 24 },
    { value: 26, viewValue: 25 },
  ];
  wis = [
    { value: 10, viewValue: 10 },
    { value: 11, viewValue: 11 },
    { value: 12, viewValue: 12 },
    { value: 13, viewValue: 13 },
    { value: 14, viewValue: 14 },
    { value: 15, viewValue: 15 },
    { value: 16, viewValue: 16 },
    { value: 17, viewValue: 17 },
    { value: 18, viewValue: 18 },
    { value: 19, viewValue: 19 },
    { value: 20, viewValue: 20 },
    { value: 21, viewValue: 21 },
    { value: 22, viewValue: 22 },
    { value: 23, viewValue: 23 },
    { value: 24, viewValue: 24 },
    { value: 25, viewValue: 25 },
  ];
  init = [
    { value: 1, viewValue: 1 },
    { value: 2, viewValue: 2 },
    { value: 3, viewValue: 3 },
    { value: 4, viewValue: 4 },
    { value: 5, viewValue: 5 },
    { value: 6, viewValue: 6 },
    { value: 7, viewValue: 7 },
    { value: 8, viewValue: 8 },
    { value: 9, viewValue: 9 },
    { value: 10, viewValue: 10 },
    { value: 11, viewValue: 11 },
    { value: 12, viewValue: 12 },
    { value: 13, viewValue: 13 },
    { value: 14, viewValue: 14 },
    { value: 15, viewValue: 15 },
    { value: 16, viewValue: 16 },
    { value: 17, viewValue: 17 },
    { value: 18, viewValue: 18 },
    { value: 19, viewValue: 19 },
    { value: 20, viewValue: 20 },
    { value: 21, viewValue: 21 },
    { value: 22, viewValue: 22 },
    { value: 23, viewValue: 23 },
    { value: 24, viewValue: 24 },
    { value: 25, viewValue: 25 },
  ];

  constructor() { }

  ngOnInit() {
  }

}
