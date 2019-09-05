import { Component, OnInit, AfterViewInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from "src/app/core/auth.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Monster } from "src/app/core/interface/monster";
import { xpThreshold, multiplierTwo, multiplerFive, multiplerSeven } from "src/assets/ts/encounter";
import * as faker from "faker";

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
}

const misc: any = {
  navbar_menu_visible: 0,
  active_collapse: true,
  disabled_collapse_init: 0,
};

declare const $: any;
declare var require: any;

@Component({
  selector: "app-encounters",
  templateUrl: "./encounters.component.html",
})
export class EncountersComponent implements OnInit, AfterViewInit {
  public dataTable: DataTable;
  public xpThreshold = xpThreshold;
  public partyMultiplierTwo = multiplierTwo;
  public partyMultiplierFive = multiplerFive;
  public partyMultiplierSeven = multiplerSeven;

  encounterForm: FormGroup;
  monsters = require("../../../assets/srd/creatures.json");
  user: any;
  campaign: any;
  campaignId: any;
  creatures: any;
  characters: any;
  averageCharacter: number;
  sumCharacter: number;
  totalXp: number;
  totalAdjustedXp: number;
  difficulty: string;
  diffEasy: number;
  diffMedium: number;
  diffHard: number;
  diffDeadly: number;
  encounterFlavorText: string;
  percentage: string;
  percentageColor: string;

  selectedCharacters: any[];
  creatureList: any[];
  encounters: any;

  constructor(private fb: FormBuilder, private auth: AuthService, private afs: AngularFirestore) {}

  ngOnInit() {
    const noCharacter = 0;

    this.minimizeSidebar();
    this.encounterForm = this.fb.group({
      encounterTitle: "",
      characterSelect: "",
    });
    this.loader();
    this.getPlayers();
    this.getEncounters();

    this.dataTable = {
      headerRow: ["Name", "Size", "Race", "CR", "XP", "Actions"],
      footerRow: ["Name", "Size", "Race", "CR", "XP", "Actions"],
    };
  }

  ngAfterViewInit() {
    $("#datatables").DataTable({
      pagingType: "full_numbers",
      lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
      responsive: true,
      language: {
        search: "_INPUT_",
        searchPlaceholder: "Search records",
      },
    });

    const table = $("#datatables").DataTable();

    // Edit record
    table.on("click", ".edit", function(e) {
      let $tr = $(this).closest("tr");
      if ($($tr).hasClass("child")) {
        $tr = $tr.prev(".parent");
      }

      const data = table.row($tr).data();
      alert("You press on Row: " + data[0] + " " + data[1] + " " + data[2] + "'s row.");
      e.preventDefault();
    });

    // Delete a record
    table.on("click", ".remove", function(e) {
      const $tr = $(this).closest("tr");
      table
        .row($tr)
        .remove()
        .draw();
      e.preventDefault();
    });

    // Like record
    // table.on("click", ".like", function(e) {
    //   alert("You clicked on Like button");
    //   e.preventDefault();
    // });

    // $(".card .material-datatables label").addClass("form-group");
  }

  clickedOption() {
    const values = this.selectedCharacters.map(a => a.characterLevel);
    const sum = values.reduce((previous, current) => (current += previous));
    const avg = Math.floor(sum / this.selectedCharacters.length);
    const threshold = this.xpThreshold.find(x => x.level === avg);
    this.averageCharacter = avg;
    this.sumCharacter = this.selectedCharacters.length;
    this.diffEasy = threshold.easy;
    this.diffMedium = threshold.medium;
    this.diffHard = threshold.hard;
    this.diffDeadly = threshold.deadly;
  }

  loader() {
    this.creatureList = new Array();
    this.encounterForm.patchValue({
      encounterTitle: "Untitled Encounter",
    });

    console.log("Average Character Level: ", this.averageCharacter);

    this.auth.getUser().subscribe(user => {
      this.user = user;
      this.campaignId = this.user.campaigns.campaignId;

      this.afs
        .doc(`campaigns/${this.campaignId}`)
        .valueChanges()
        .subscribe(campaign => {
          this.campaign = campaign;

          this.afs
            .collection(`campaigns/${this.campaignId}/creatures`)
            .valueChanges()
            .subscribe(creatures => {
              this.creatures = creatures;
              console.log("Creatures: ", this.creatures);
            });
        });
    });
  }

  getPlayers() {
    this.auth.getUser().subscribe(user => {
      this.user = user;
      this.campaignId = this.user.campaigns.campaignId;

      this.afs
        .doc(`campaigns/${this.campaignId}`)
        .valueChanges()
        .subscribe(campaign => {
          this.campaign = campaign;

          this.afs
            .collection(`campaigns/${this.campaignId}/characters`)
            .valueChanges()
            .subscribe(characters => {
              this.characters = characters;
              console.log("Characters: ", this.characters);
            });
        });
    });
  }

  getEncounters() {
    this.auth.getUser().subscribe(user => {
      this.user = user;
      this.campaignId = this.user.campaigns.campaignId;

      this.afs
        .doc(`campaigns/${this.campaignId}`)
        .valueChanges()
        .subscribe(campaign => {
          this.campaign = campaign;

          this.afs
            .collection(`campaigns/${this.campaignId}/encounters`)
            .valueChanges()
            .subscribe(encounters => {
              this.encounters = encounters;
              console.log("Encounters: ", this.encounters);
            });
        });
    });
  }

  onSelect(data: any) {
    console.log("Selected Item id: ", data);
    console.log(data.uid);
  }

  saveEncounter() {
    this.auth.getUser().subscribe(user => {
      this.user = user;
      this.campaignId = this.user.campaigns.campaignId;
      this.afs
        .doc(`campaigns/${this.campaignId}`)
        .valueChanges()
        .subscribe(campaign => {
          this.campaign = campaign;
          const campId = this.campaign.uid;
          const encounterId = {
            uid: faker.random.alphaNumeric(8),
          };

          const encounter = {
            uid: encounterId.uid,
            encounterTitle: this.encounterForm.value["encounterTitle"],
            characters: this.encounterForm.value["characterSelect"],
            enemies: this.creatureList,
          };
          this.afs
            .collection(`campaigns/${campId}/encounters`)
            .doc(encounterId.uid)
            .set(encounter);
          return this.encounterForm.reset();
        });
    });
  }

  addCreature(data: any) {
    this.creatureList.push(data);

    const values = this.creatureList.map(x => x.challengeRating.XP);
    const sum = values.reduce((previous, current) => (current += previous));
    if (this.selectedCharacters.length <= 2) {
      const monsterCount = this.creatureList.length;
      const multiplier = this.partyMultiplierTwo.find(x => x.monsters === monsterCount);
      const totalAdjustedXp = sum * multiplier.multiplier;

      this.totalXp = sum;
      this.totalAdjustedXp = totalAdjustedXp;
      this.calculateDifficulty();
    }
    if (this.selectedCharacters.length > 2 && this.selectedCharacters.length <= 5) {
      const monsterCount = this.creatureList.length;
      const multiplier = this.partyMultiplierFive.find(x => x.monsters === monsterCount);
      const totalAdjustedXp = sum * multiplier.multiplier;

      this.totalXp = sum;
      this.totalAdjustedXp = totalAdjustedXp;
      this.calculateDifficulty();
    }
    if (this.selectedCharacters.length >= 6) {
      const monsterCount = this.creatureList.length;
      const multiplier = this.partyMultiplierSeven.find(x => x.monsters === monsterCount);
      const totalAdjustedXp = sum * multiplier.multiplier;

      this.totalXp = sum;
      this.totalAdjustedXp = totalAdjustedXp;
      this.calculateDifficulty();
    }
  }

  calculateDifficulty() {
    const values = this.selectedCharacters.map(a => a.characterLevel);
    const sum = values.reduce((previous, current) => (current += previous));
    const avg = Math.floor(sum / this.selectedCharacters.length);
    const threshold = this.xpThreshold.find(x => x.level === avg);

    if (this.totalAdjustedXp >= threshold.easy || this.totalAdjustedXp <= threshold.easy) {
      this.difficulty = "EASY";
      this.encounterFlavorText = "Barely broke a sweat.";
      this.percentage = "25";
      this.percentageColor = "success";
    }
    if (this.totalAdjustedXp > threshold.medium && this.totalAdjustedXp < threshold.hard) {
      this.difficulty = "MEDIUM";
      this.encounterFlavorText = "Without too much of a hazzle";
      this.percentage = "50";
      this.percentageColor = "primary";
    }
    if (this.totalAdjustedXp > threshold.hard && this.totalAdjustedXp < threshold.deadly) {
      this.difficulty = "HARD";
      this.encounterFlavorText = "Good thing I practiced";
      this.percentage = "75";
      this.percentageColor = "warning";
    }
    if (this.totalAdjustedXp >= threshold.deadly) {
      this.difficulty = "DEADLY";
      this.encounterFlavorText = "This should be interesting";
      this.percentage = "100";
      this.percentageColor = "danger";
    }
  }

  minimizeSidebar() {
    const body = document.getElementsByTagName("body")[0];

    if (misc.sidebar_mini_active === true) {
      body.classList.remove("sidebar-mini");
      misc.sidebar_mini_active = false;
    } else {
      setTimeout(function() {
        body.classList.add("sidebar-mini");

        misc.sidebar_mini_active = true;
      }, 300);
    }

    // we simulate the window Resize so the charts will get updated in realtime.
    const simulateWindowResize = setInterval(function() {
      window.dispatchEvent(new Event("resize"));
    }, 180);

    // we stop the simulation of Window Resize after the animations are completed
    setTimeout(function() {
      clearInterval(simulateWindowResize);
    }, 1000);
  }
}
