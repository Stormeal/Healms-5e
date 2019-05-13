const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Prevent Firebase from initialzing twice
try { admin.initializeApp(functions.config().firebase) } catch (e) { }

const db = admin.firestore();


exports.aggregate = functions.region('europe-west1').firestore
    .document('users/{userId}')
    .onCreate(async (snapshot, context) => {
        const user = snapshot.data();

        const aggRef = db.doc(`campaigns/${user.campaigns.campaignId}`);
        const colRef = db.collection(`campaigns/${user.campaigns.campaignId}`)
        const aggDoc = await aggRef.get();
        const aggData = aggDoc.data();

        const campaign = {
            owner: user.uid,
            uid: user.campaigns.campaignId
        }


        // Aggregate New Data
        return aggRef.set(campaign);
       
    });

