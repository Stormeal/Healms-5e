import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, startWith, tap, filter, shareReplay } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from './user';
import { NotifyService } from './notify.service';

import * as firebase from 'firebase/app';
import { ToastrService } from 'ngx-toastr';
import * as faker from 'faker';


@Injectable({ providedIn: 'root' })


export class AuthService {
    user$: Observable<User>;
    userId: string = null;
    user: Observable<any>;
    campaign: Observable<any>;
    campaignId: string = null;

    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router,
        private notify: NotifyService,
        private toastr: ToastrService) {

        //// Get auth data, then get firestore user document || null
        this.user$ = this.afAuth.authState.pipe(
            switchMap(user => {
                if (user) {
                    this.userId = user.uid;
                    return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
                        .pipe(shareReplay(1));
                } else {
                    return Observable.of(null);
                }
            })
        );
    }


    ///// Login/Signup //////
    emailLogin(email, pass) {
        console.log('Email Login Reached');

        return this.afAuth.auth
            .signInWithEmailAndPassword(email, pass)
            .then((credential) => {
                console.log('User Object: ', credential.user);
                this.notify.update('Welcome back!', 'success');
                this.router.navigate(['/dashboard']);
            });
    }

    emailLogin2(email, pass) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, pass)
            .then((credential) => {
                this.setUserDoc(credential.user);
                console.log(credential.user);
                this.userId = credential.user.uid;
                this.router.navigate(['/jobs']);
            });
    }

    emailSignUp(email: string, password: string) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .then(credential => {
                this.updateUserData(credential.user); // Creates initial user document
                return console.log('Sign Up Initialized');
            }).catch(error => this.handleError(error));
        // return this.afAuth.auth
        //     .createUserWithEmailAndPassword(email, password)
        //     .then(credential => {
        //         this.notify.update('Welcome new user!', 'success');
        //         this.router.navigate(['/employees']);
        //         return this.updateUserData(credential.user); // If using firestore
        //     }).catch(error => this.handleError(error));
    }

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
        this.afAuth.auth.signOut().then(() => {
            this.router.navigate(['/'])
                .catch(function () {
                    console.log('Got an error: ' + Error);
                });
            console.log('Logged out');

        });
    }

    private updateUserData(user) {
        // Sets user data to firestore on login
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
        // const campaignRef: AngularFirestoreDocument<any> = this.afs.doc(`campaigns/${user.campaigns.uid}`);

        const data: User = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || null,
            photoURL: user.photoURL || 'https://bit.ly/2vsQQ5o',
            roles: {
                dungeonMaster: false,
                player: true
            },
            campaigns: {
                campaignId: faker.random.alphaNumeric(16)
            }
        };

        // const campaign = {
        //     owner: user.uid,
        //     uid: user.campaigns.uid
        // }
        return userRef.set(data, { merge: true });
        // return campaignRef.set(campaign, { merge: true })
    }

    // Update properties on the user document
    updateUser(user: User, data: any) {
        return this.afs.doc(`users/${user.uid}`).update(data);
    }

    private setUserDoc(user) {

        const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

        const data: User = {
            uid: user.uid,
            email: user.email || null,
            photoURL: 'https://bit.ly/2GJ7wdV',
        };


        userRef.set(data, { merge: true });
        return console.log('Set User Completed');

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

    // Queries
    getUser() {
        this.user = this.afs.doc(`users/${this.userId}`)
            .valueChanges().pipe(shareReplay(1));




        console.log('User: ', this.userId, this.user);

        return this.user;
    }

    currentCampaign() {
        this.campaign = this.afs.collection('campaigns', ref => ref.where('owner', '==', this.userId)).doc(`${this.campaignId}`)
        .valueChanges().pipe(shareReplay(1));

        console.log('Campaigns: ', this.campaignId, this.campaign);

        return this.campaign;
    }

    // Error Handling
    private handleError(error: Error) {
        this.toastr.error('Username or password was incorrect', 'Login Failed');
        // console.error(error);
    }

    showSuccess() {
        this.toastr.success('Welcome to Healms', 'Login Successfull', {
            closeButton: true
        });
    }
}
