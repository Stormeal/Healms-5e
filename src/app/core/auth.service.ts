import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, startWith, tap, filter, shareReplay } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from './user';

import * as firebase from 'firebase/app';


@Injectable({ providedIn: 'root' })

export class AuthService {
    user$: Observable<User>;
    userId: string = null;

    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router) {

        //// Get auth data, then get firestore user document || null
        this.user$ = this.afAuth.authState.pipe(
            switchMap(user => {
                if (user) {
                    this.userId = user.uid;
                    return this.afs.doc<User>(`employees/${user.uid}`).valueChanges()
                        .pipe(shareReplay(1));
                } else {
                    return of(null);
                }
            })
        );
    }


    ///// Login/Signup //////

    googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();
        return this.oAuthLogin(provider);
    }

    private oAuthLogin(provider) {
        return this.afAuth.auth.signInWithPopup(provider)
            .then((credential) => {
                this.updateUserData(credential.user);
            });
    }

    signOut() {
        this.afAuth.auth.signOut();
    }

    private updateUserData(user) {
        // Sets user data to firestore on login
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
        const data: User = {
            uid: user.uid,
            email: user.email,
            roles: {
                subscriber: true
            }
        };
        return userRef.set(data, { merge: true });
    }


    ///// Role-based Authorization //////

    canRead(user: User): boolean {
        const allowed = ['admin', 'editor', 'subscriber'];
        return this.checkAuthorization(user, allowed);
    }

    canEdit(user: User): boolean {
        const allowed = ['admin', 'editor'];
        return this.checkAuthorization(user, allowed);
    }

    canDelete(user: User): boolean {
        const allowed = ['admin'];
        return this.checkAuthorization(user, allowed);
    }



  // determines if user has matching role
  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) {
      for (const role of allowedRoles) {
        if (user.roles[role]) {
          return true;
        }
      }
      return false;
    }


  }

}
