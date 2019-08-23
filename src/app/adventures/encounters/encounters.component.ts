import { Component, OnInit, AfterViewInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from "src/app/core/auth.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";

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
  encounterForm: FormGroup;
  monsters = require("../../../assets/srd/creatures.json");
  user: any;
  campaign: any;
  campaignId: any;
  creatures: any;
  characters: any;

  constructor(private fb: FormBuilder, private auth: AuthService, private afs: AngularFirestore) { }

  ngOnInit() {
    this.minimizeSidebar();
    this.encounterForm = this.fb.group({
      encounterTitle: "",
      characterSelect: "",
    });
    this.loader();
    this.getPlayers();

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
    table.on("click", ".edit", function (e) {
      let $tr = $(this).closest("tr");
      if ($($tr).hasClass("child")) {
        $tr = $tr.prev(".parent");
      }

      const data = table.row($tr).data();
      alert("You press on Row: " + data[0] + " " + data[1] + " " + data[2] + "'s row.");
      e.preventDefault();
    });

    // Delete a record
    table.on("click", ".remove", function (e) {
      const $tr = $(this).closest("tr");
      table
        .row($tr)
        .remove()
        .draw();
      e.preventDefault();
    });

    // Like record
    table.on("click", ".like", function (e) {
      alert("You clicked on Like button");
      e.preventDefault();
    });

    $(".card .material-datatables label").addClass("form-group");
  }

  loader() {
    this.encounterForm.patchValue({
      encounterTitle: "Untitled Encounter",
    });

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

  onSelect(data: any) {
    console.log('Selected Item id: ', data);
    console.log(data.uid);


  }

  minimizeSidebar() {
    const body = document.getElementsByTagName('body')[0];

    if (misc.sidebar_mini_active === true) {
      body.classList.remove('sidebar-mini');
      misc.sidebar_mini_active = false;

    } else {
      setTimeout(function () {
        body.classList.add('sidebar-mini');

        misc.sidebar_mini_active = true;
      }, 300);
    }

    // we simulate the window Resize so the charts will get updated in realtime.
    const simulateWindowResize = setInterval(function () {
      window.dispatchEvent(new Event('resize'));
    }, 180);

    // we stop the simulation of Window Resize after the animations are completed
    setTimeout(function () {
      clearInterval(simulateWindowResize);
    }, 1000);
  }



}
