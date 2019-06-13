import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-create-monster",
  templateUrl: "./create-monster.component.html"
})
export class CreateMonsterComponent implements OnInit {
  public creatureRaces = [
    { value: "Aberration", viewValue: "Aberration" },
    { value: "Beast", viewValue: "Beast" },
    { value: "Celestial", viewValue: "Celestial" },
    { value: "Construct", viewValue: "Construct" },
    { value: "Dragon", viewValue: "Dragon" },
    { value: "Elemental", viewValue: "Elemental" },
    { value: "Fey", viewValue: "Fey" },
    { value: "Fiend", viewValue: "Fiend" },
    { value: "Giant", viewValue: "Giant" },
    { value: "Humanoid", viewValue: "Humanoid" },
    { value: "Monstrosity", viewValue: "Monstrosity" },
    { value: "Ooze", viewValue: "Ooze" },
    { value: "Plant", viewValue: "Plant" },
    { value: "Undead", viewValue: "Undead" }
  ];
  public creatureRacesSelect = this.creatureRaces[0].viewValue;

  public creatureSize = [
    { value: "Tiny", viewValue: "Tiny" },
    { value: "Small", viewValue: "Small" },
    { value: "Medium", viewValue: "Medium" },
    { value: "Large", viewValue: "Large" },
    { value: "Huge", viewValue: "Huge" },
    { value: "Gargantuan", viewValue: "Gargantuan" }
  ];
  public creatureSizeSelect = this.creatureSize[2].viewValue;

  public alignments = [
    { value: "Lawful Good", viewValue: "Lawful Good" },
    { value: "Lawful Neutral", viewValue: "Lawful Neutral" },
    { value: "Lawful Evil", viewValue: "Lawful Evil" },
    { value: "Neutral Good", viewValue: "Neutral Good" },
    { value: "(True) Neutral", viewValue: "(True) Neutral" },
    { value: "Neutral Evil", viewValue: "Neutral Evil" },
    { value: "Chaotic Good", viewValue: "Chaotic Good" },
    { value: "Chaotic Neutral", viewValue: "Chaotic Neutral" },
    { value: "Chaotic Evil", viewValue: "Chaotic Evil" }
  ];
  public alignmentsSelect = this.alignments[4].viewValue;

  public challengeRating = [
    { value: "0", viewValue: "0 (0-10 XP)" },
    { value: "1/8", viewValue: "1/8 (25 XP)" },
    { value: "1/4", viewValue: "1/4 (50 XP)" },
    { value: "1/2", viewValue: "1/2 (100 XP)" },
    { value: "1", viewValue: "1 (200 XP)" },
    { value: "2", viewValue: "2 (450 XP)" },
    { value: "3", viewValue: "3 (700 XP)" },
    { value: "4", viewValue: "4 (1100 XP)" },
    { value: "5", viewValue: "5 (1800 XP)" },
    { value: "6", viewValue: "6 (2300 XP)" },
    { value: "7", viewValue: "7 (2900 XP)" },
    { value: "8", viewValue: "8 (3900 XP)" },
    { value: "9", viewValue: "9 (5000 XP)" },
    { value: "10", viewValue: "10 (5900 XP)" },
    { value: "11", viewValue: "11 (7200 XP)" },
    { value: "12", viewValue: "12 (8400 XP)" },
    { value: "13", viewValue: "13 (10000 XP)" },
    { value: "14", viewValue: "14 (11500 XP)" },
    { value: "15", viewValue: "15 (13000 XP)" },
    { value: "16", viewValue: "16 (15000 XP)" },
    { value: "17", viewValue: "17 (18000 XP)" },
    { value: "18", viewValue: "18 (20000 XP)" },
    { value: "19", viewValue: "19 (22000 XP)" },
    { value: "20", viewValue: "20 (25000 XP)" },
    { value: "21", viewValue: "21 (33000 XP)" },
    { value: "22", viewValue: "22 (41000 XP)" },
    { value: "23", viewValue: "23 (50000 XP)" },
    { value: "24", viewValue: "24 (62000 XP)" },
    { value: "25", viewValue: "25 (155000 XP)" }
  ];
  public challengeRatingSelect = this.challengeRating[3].viewValue;

  public dices = [
    { value: "d4", viewValue: "d4" },
    { value: "d6", viewValue: "d6" },
    { value: "d8", viewValue: "d8" },
    { value: "d10", viewValue: "d10" },
    { value: "d12", viewValue: "d12" },
    { value: "d20", viewValue: "d20" }
  ];
  public dicesSelect = this.dices[2].viewValue;

  public dmgDices = [
    { value: "d4", viewValue: "d4" },
    { value: "d6", viewValue: "d6" },
    { value: "d8", viewValue: "d8" },
    { value: "d10", viewValue: "d10" },
    { value: "d12", viewValue: "d12" },
    { value: "d20", viewValue: "d20" }
  ];
  public dmgDicesSelect = this.dmgDices[2].viewValue;

  constructor() {}

  ngOnInit() {}
}
