import { Component, OnInit, AfterViewInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from "src/app/core/auth.service";
import { AngularFirestore } from "@angular/fire/firestore";

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
}

declare const $: any;
declare var require: any;

@Component({
  selector: "app-encounters",
  templateUrl: "./encounters.component.html",
})
export class EncountersComponent implements OnInit, AfterViewInit {
  encounterForm: FormGroup;
  public dataTable: DataTable;
  monsters = require("../../../assets/srd/creatures.json");

  constructor(private fb: FormBuilder, private auth: AuthService, private afs: AngularFirestore) {}

  ngOnInit() {
    this.encounterForm = this.fb.group({
      encounterTitle: "",
    });
    this.loader();

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
    table.on("click", ".like", function(e) {
      alert("You clicked on Like button");
      e.preventDefault();
    });

    $(".card .material-datatables label").addClass("form-group");
  }

  loader() {
    this.encounterForm.patchValue({
      encounterTitle: "Untitled Encounter",
    });
  }
}
