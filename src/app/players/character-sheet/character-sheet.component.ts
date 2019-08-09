import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/core/auth.service";
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: "app-character-sheet",
  templateUrl: "./character-sheet.component.html",
  styleUrls: ["./character-sheet.component.scss"],
})
export class CharacterSheetComponent implements OnInit {
  characters: any;
  user;
  campaign: any;
  campaignId: any;

  constructor(private auth: AuthService, private afs: AngularFirestore) {}

  ngOnInit() {
    this.loader();
  }

  loader() {
    this.auth.getUser();

    this.auth.getUser().subscribe(user => {
      this.user = user;
      this.campaignId = this.user.campaigns.campaignId;
      // console.log('CampaignId', this.campaignId);

      this.afs
        .doc(`campaigns/${this.campaignId}`)
        .valueChanges()
        .subscribe(campaign => {
          this.campaign = campaign;
          const campId = this.campaign.uid;

          console.log("Campaign: ", campId, this.campaign);
          this.afs
            .collection(`campaigns/${this.campaignId}/characters`)
            .valueChanges()
            .subscribe(characters => {
              this.characters = characters;
              console.log("characters: ", this.characters);
            });
        });
    });
  }
}
