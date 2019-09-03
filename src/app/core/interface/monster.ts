export interface Monster {
  creatureName: string;
  creatureSize: string;
  creatureRace: string;
  creatureAlignment: string;
  creatureDescription: string;

  armorClass: number;
  hitpoints: string;
  hitDie: string;
  hitModifier: number;
  speed: number;

  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;

  savingThrows: string;
  skills: string;
  dmgRes: string;
  dmgImmunities: string;
  languages: string;
  senses: string;
  challangeRating: string;

  spellClass: string;
  spellLevel: string;
  spellcastingAbility: string;
  spellAttMod: string;
  spellSave: string;

  cantrip: [];
  first: [];
  second: [];
  third: [];
  fourth: [];
  fifth: [];
  sixth: [];
  seventh: [];
  eight: [];
  nineth: [];
}
