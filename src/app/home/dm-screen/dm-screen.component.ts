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
  public encounterExp: TableData;
  public basicArmor: TableData;
  public basicWeapons: TableData;
  public lifestyleExpense: TableData;
  public currency: TableData;
  public combatActions: TableData;
  public exhaustion: TableData;
  public difficulty: TableData;


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

    this.encounterExp = {
      headerRow: ['# of Enemies', 'Party Size & Modifiers'],
      dataRows: [
        ['', '1-2', '3-5', '6+'],
        ['Single Enemy', 'x 1.5', '-', 'x 0.5'],
        ['Pair', 'x 2', 'x 1.5', '-'],
        ['Group (3-6)', 'x 2.5', 'x 2', 'x 1.5'],
        ['Gang (7-10)', 'x 3', 'x 2.5', 'x 2'],
        ['Mob (11-14)', 'x 4', 'x 3', 'x 2.5'],
        ['Horde (15+)', 'x 5', 'x 4', 'x 3'],
      ],
    };

    this.basicArmor = {
      headerRow: ['Armor', 'Cost', 'AC', 'Weight'],
      dataRows: [
        ['Light Armor'],
        ['Padded²', '5gp', '11', '8 lb.'],
        ['Leather', '10gp', '11', '10 lb.'],
        ['Studded', '45gp', '12', '13 lb.'],
        [''],
        ['Medium Armor'],
        ['Hide', '10gp', '12', '12 lb.'],
        ['Chain shirt', '50gp', '13', '20 lb.'],
        ['Scale Mail²', '50gp', '14', '45 lb.'],
        ['Breast Plate', '400gp', '14', '20 lb.'],
        ['Half Plate²', '750gp', '15', '40 lb.'],
        [''],
        ['Heavy Armor'],
        ['Ring Mail²', '30gp', '14', '40 lb.'],
        ['Chain Mail²', '75gp', '16', '50 lb.'],
        ['Splint²', '200gp', '17', '60 lb.'],
        ['Plate²', '1,500gp', '18', '65 lb.'],
        [''],
        ['Shield'],
        ['Shield', '10gp', '+2', '6 lb.'],
      ],
    };

    this.basicWeapons = {
      headerRow: ['Name', 'Cost', 'DMG', 'Weight', 'Properties*'],
      dataRows: [
        ['Simple Melee Weapons'],
        ['Club', '1sp', '1d4 B', '2 lb.', 'Li'],
        ['Dagger', '2gp', '1d4 P', '1 lb.', 'F, Li Th Rg(20/60)'],
        ['Greatclub', '2gp', '1d8 B', '10 lb.', '2H'],
        ['Handaxe', '5gp', '1d6 S', '2 lb.', 'Li Th Rg(20/60)'],
        ['Javelin', '5sp', '1d6 P', '2 lb.', 'Th Rg(30/120)'],
        ['Light Hammer', '2gp', '1d4 B', '2 lb.', 'Li Th Rg(20/60)'],
        ['Mace', '5gp', '1d6 B', '4 lb.', '-'],
        ['Quarterstaff', '2sp', '1d6 B', '4 lb.', 'V(1d10)'],
        ['Sickle', '1gp', '1d4 S', '2 lb.', 'Li'],
        ['Spear', '1gp', '1d6 P', '3 lb.', 'Th Rg(20/60), V(1d8)'],
        ['Unarmed Strike', '-', '1 B', '-', '-'],
        [],
        ['Simple Ranged Weapons'],
        ['Crossbow, Light', '25gp', '1d8 P', '5 lb.', 'A Rg(80/320), Ld, 2H'],
        ['Dart', '5cp', '1d4 P', '1/4 lb.', 'F Th Rg(20/60)'],
        ['Shortbow', '25gp', '1d6 P', '2 lb.', 'A Rg(80/320), Ld, 2H'],
        ['Sling', '1sp', '1d4 B', '-', 'A Rg(320)'],
        [''],
        ['Martial Melee Weapons'],
        ['Battleaxe', '10gp', '1d8 S', '4 lb.', 'V(1d10)'],
        ['Flail', '10gp', '1d8 B', '2 lb.', '-'],
        ['Glaive', '20gp', '1d10 S', '6 lb.', 'H, Re, 2H'],
        ['Greataxe', '30gp', '1d12 S', '7 lb.', 'H, 2H'],
        ['Greatsword', '50gp', '2d6 S', '6 lb.', 'H, 2H'],
        ['Halberd', '20gp', '1d10 S', '6 lb.', 'H, Re, 2H'],
        ['Lance', '10gp', '1d12 P', '6 lb.', 'R, Sp'],
        ['Longsword', '15gp', '1d8 S', '3 lb.', 'V(1d10)'],
        ['Maul', '10gp', '2d6 B', '10 lb.', 'H, 2H'],
        ['Morningstar', '15gp', '1d8 P', '4 lb.', '-'],
        ['Pike', '5gp', '1d10 P', '18 lb.', 'H, Re. 2H'],
        ['Rapier', '25gp', '1d8 P', '2 lb.', 'F'],
        ['Scimitar', '25gp', '1d6 S', '3 lb.', 'F, Li'],
        ['Shortsword', '10gp', '1d6 P', '2 lb.', 'F, Li'],
        ['Trident', '5gp', '1d6 P', '4 lb.', 'Th Rg(20/60), V(1d8)'],
        ['War Pick', '5gp', '1d8 P', '2 lb.', '-'],
        ['Warhammer', '15gp', '1d8 B', '2 lb.', 'V(1d10)'],
        ['Whip', '2gp', '1d4 S', '3 lb.', 'F, Re'],
        [''],
        ['Martial Ranged Weapons'],
        ['Blowgun', '10gp', '1 P', '1 lb.', 'A Rg(25/100), Ld'],
        ['Crossbow, Hand', '75gp', '1d6 P', '3 lb.', 'A Rg(30/120), Li, Ld'],
        ['Crossbow, Heavy', '50gp', '1d10 P', '18 lb.', 'A Rg(100/400), H, Ld, 2H'],
        ['Longbow', '50gp', '1d8 P', '2 lb.', 'A Rg(150,600), H, 2H'],
        ['Net', '1gp', '-', '3 lb.', 'Sp, Th Rg(5/15)'],
      ],
    };

    this.lifestyleExpense = {
      headerRow: ['Lifestyle', 'Price / Day'],
      dataRows: [
        ['Wretched', '-'],
        ['Squalid', '1sp'],
        ['Poor', '2sp'],
        ['Modest', '1gp'],
        ['Comfortable', '2gp'],
        ['Wealthy', '4gp'],
        ['Aristocratic', '10gp Minimum'],
      ],
    };

    this.currency = {
      headerRow: ['Coin', 'CP', 'SP', 'EP', 'GP', 'PP'],
      dataRows: [
        ['Copper', '1', '1/10', '1/50', '1/100', '1/1000'],
        ['Silver', '10', '1', '1/5', '1/10', '1/100'],
        ['Electrum', '50', '5', '1', '1/2', '1/20'],
        ['Gold', '100', '10', '2', '1', '/10'],
        ['Platinum', '1000', '100', '50', '10', '1'],
      ],
    };

    this.combatActions = {
      headerRow: ['Action', 'Description'],
      dataRows: [
        ['Attack', 'Make one¹ melee or ranged attack, a grapple, or a shove.'],
        ['Cast a Spell', 'Casts a spell with a casting time of 1 action.'],
        ['Dash', 'Gain extra movement equal to your speed for this turn, applying any modifiers.'],
        ['Disengage', 'Your movement doesn\'t provoke opportunity attacks for the rest of the turn.'],
        ['Dodge', 'Until the start of your next turn, any attacks against you are made with disadvantage provided you can see the attacker, and you have advantage on DEX saves. You lose this benefit if you are INCAPACITATED or your speed drops to 0.'],
        ['Help', 'Creature you help gains advantage on next ability check to perform the task you are assisting with, or help with attack roll if enemy is within 5 feet of you.'],
        ['Hide', 'You make a stealth check. Details here.'],
        ['Ready', 'Prepare to do something when a specific trigger occurs. Details here.'],
        ['Search', 'Make either a perception or investigation check in an attempt to locate something.'],
        ['Use an Object', 'Interacting with a second object on your turn (the first is free), or a more complicated object.'],
        ['Climb onto a Bigger Creature²', 'Athletics or Acrobatics check opposed by creature\'s Acrobatics check. Details here.'],
        ['Disarm²', 'Use an attack to make attack roll opposed by target\'s Athletics or Acrobatics check. Target has advantage if holding the item with 2 or more hands.'],
        ['Mark²', 'When you make a melee attack and hit, you can mark them. Your opportunity attacks against the creature have advantage and don\'t expend your reaction, however you may only make 1 attack in this manner.'],
        ['Overrun²', 'As an action or bonus action make Athletics check opposed by hostile\'s Athletics. If you win, you can move through the hostile\'s space once this turn.'],
        ['Shove Aside²', 'Use shove to push target to the side rather than away. Details here.'],
        ['Tumble²', 'As an action or bonus action make Acrobatics check opposed by hostile\'s Acrobatics. If you win, you can move through the hostile\'s space once this turn.'],
      ]
    };

    this.exhaustion = {
      headerRow: ['Level', 'Effect'],
      dataRows: [
        ['1', 'Disadvantage on ability checks.'],
        ['2', 'Speed Halved'],
        ['3', 'Disadvantage on attack rolls and saving throws'],
        ['4', 'Hit point maximum halved'],
        ['5', 'Speed reduced to 0'],
        ['6', 'Death'],
      ]
    };

    this.difficulty = {
      headerRow: ['Task Difficulty', 'DC'],
      dataRows: [
        ['Trivial', '5'],
        ['Easy', '10'],
        ['Moderate', '15'],
        ['Hard', '20'],
        ['Very Hard', '25'],
        ['Nearly Impossible', '30'],
      ]
    };
  }

}
