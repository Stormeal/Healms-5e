import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { APP_BASE_HREF } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from "@angular/material";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { ToastrModule } from "ngx-toastr";

import { AppComponent } from "./app.component";

import { AngularFireModule } from "@angular/fire/";
import { AngularFirestoreModule, AngularFirestore } from "@angular/fire/firestore";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireAuthModule } from "@angular/fire/auth";

import { SidebarModule } from "./sidebar/sidebar.module";
import { FooterModule } from "./shared/footer/footer.module";
import { NavbarModule } from "./shared/navbar/navbar.module";
import { FixedpluginModule } from "./shared/fixedplugin/fixedplugin.module";
import { AdminLayoutComponent } from "./layouts/admin/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth/auth-layout.component";

import { environment } from "src/environments/environment";
import { AppRoutes } from "./app.routing";

@NgModule({
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
})
export class MaterialModule {}

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true,
    }),
    ToastrModule.forRoot(), // ToastrModule added
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    MatNativeDateModule,
    SidebarModule,
    NavbarModule,
    FooterModule,
    FixedpluginModule,
    AngularFireModule.initializeApp(environment.firebase, "Healms"), // Imports firebase/app thats needed for everything.
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
  ],
  declarations: [AppComponent, AdminLayoutComponent, AuthLayoutComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
