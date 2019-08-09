import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AngularFireStorage, AngularFireUploadTask } from "@angular/fire/storage";
import { AuthService } from "../core/auth.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { Upload } from "../core/upload";
import * as faker from "faker";
import { finalize } from "rxjs/operators";

@Component({
  selector: "app-players",
  templateUrl: "./players.component.html",
  styleUrls: ["./players.component.scss"],
})
export class PlayersComponent implements OnInit {
  characterForm: FormGroup;
  characters: any;
  user;
  campaign: any;
  campaignId: any;
  selectedFiles: FileList;
  currentUpload: Upload;
  task: AngularFireUploadTask;

  races = [
    { value: "Hill Dwarf", viewValue: "Hill Dwarf" },
    { value: "Mountain Dwarf", viewValue: "Mountain Dwarf" },
    { value: "Dragonbord", viewValue: "Dragonborn" },
    { value: "High Elf", viewValue: "High Elf" },
    { value: "Wood Elf", viewValue: "Wood Elf" },
    { value: "Rock Gnome", viewValue: "Rock Gnome" },
    { value: "Lightfoot Halfling", viewValue: "Lightfoot Halfling" },
    { value: "Stout Halfling", viewValue: "Stout Halfling" },
    { value: "Half-Elf", viewValue: "Half-Elf" },
    { value: "Half-Orc", viewValue: "Half-Orc" },
    { value: "Human", viewValue: "Human" },
    { value: "Tiefling", viewValue: "Tiefling" },
  ];
  classes = [
    { value: "Artificer", viewValue: "Artificer" },
    { value: "Barbarian", viewValue: "Barbarian" },
    { value: "Bard", viewValue: "Bard" },
    { value: "Blood Hunter", viewValue: "Blood Hunter" },
    { value: "Druid", viewValue: "Druid" },
    { value: "Cleric", viewValue: "Cleric" },
    { value: "Fighter", viewValue: "Fighter" },
    { value: "Monk", viewValue: "Monk" },
    { value: "Paladin", viewValue: "Paladin" },
    { value: "Ranger", viewValue: "Ranger" },
    { value: "Rouge", viewValue: "Rouge" },
    { value: "Runemaster", viewValue: "Runemaster" },
    { value: "Sorcerer", viewValue: "Sorcerer" },
    { value: "Warlock", viewValue: "Warlock" },
    { value: "Wizard", viewValue: "Wizard" },
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

  constructor(
    private afs: AngularFirestore,
    private fb: FormBuilder,
    private auth: AuthService,
    private storage: AngularFireStorage,
  ) {}

  ngOnInit() {
    this.characterForm = this.fb.group({
      characterName: ["", Validators.required],
      characterRace: ["", Validators.required],
      characterClass: ["", Validators.required],
      characterPassiveWisdom: ["", Validators.required],
      characterAC: ["", Validators.required],
      characterBackstory: ["", Validators.required],
      characterLevel: ["", Validators.required],
    });
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  newCharacter() {
    this.auth.getUser().subscribe(user => {
      this.user = user;
      this.campaignId = this.user.campaigns.campaignId;
      this.afs
        .doc(`campaigns/${this.campaignId}`)
        .valueChanges()
        .subscribe(campaign => {
          this.campaign = campaign;
          const campId = this.campaign.uid;

          const character = {
            uid: faker.random.alphaNumeric(4),
            characterName: this.characterForm.value["characterName"],
            characterRace: this.characterForm.value["characterRace"],
            characterClass: this.characterForm.value["characterClass"],
            characterLevel: this.characterForm.value["characterLevel"],
            characterPassiveWisdom: this.characterForm.value["characterPassiveWisdom"],
            characterAC: this.characterForm.value["characterAC"],
            characterBackstory: this.characterForm.value["characterBackstory"],
            photoURL: null,
          };

          if (this.selectedFiles) {
            const file = this.selectedFiles.item(0);
            this.currentUpload = new Upload(file);

            // The storage path
            const path = `campaigns/${campId}/characters/${file.name} + ${Date.now()}`;

            // Reference to storage bucket
            const ref = this.storage.ref(path);

            // The main task
            this.task = this.storage.upload(path, file);
            this.task
              .snapshotChanges()
              .pipe(
                finalize(() => {
                  ref.getDownloadURL().subscribe(url => {
                    console.log("URL: ", url); // <-- do what ever you want with the url..
                    const characterPhoto = {
                      uid: character.uid,
                      characterName: this.characterForm.value["characterName"],
                      characterRace: this.characterForm.value["characterRace"],
                      characterClass: this.characterForm.value["characterClass"],
                      characterLevel: this.characterForm.value["characterLevel"],
                      characterPassiveWisdom: this.characterForm.value["characterPassiveWisdom"],
                      characterAC: this.characterForm.value["characterAC"],
                      characterBackstory: this.characterForm.value["characterBackstory"],
                      photoURL: url,
                    };
                    this.afs
                      .collection(`campaigns/${campId}/characters`)
                      .doc(character.uid)
                      .set(characterPhoto);
                    return this.characterForm.reset();
                  });
                }),
              )
              .subscribe();
          } else {
            return this.afs
              .collection(`campaigns/${campId}/characters`)
              .doc(character.uid)
              .set(character);
          }
        });
    });
  }
}
