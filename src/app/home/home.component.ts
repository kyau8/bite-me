import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';


import { FirebaseProvider } from '../providers/firebase.provider';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements OnInit {
  newItem : {
    title:''
  };
  itemsList;
  displayName;

  constructor(public navCtrl: NavController, public firebaseProvider: FirebaseProvider, private afAuth: AngularFireAuth, private fb: Facebook, private platform: Platform) {
  }
  
  ngOnInit() {
    this.firebaseProvider.getShoppingItems().subscribe(items => {
      this.itemsList = items;
      // this.itemsList = items.map(item => item.key);
      this.itemsList.forEach(item => { console.log(item)});
    });
  }

  addItem() {
    this.firebaseProvider.addItem(this.newItem);
  }

  removeItem(id) {
    this.firebaseProvider.removeItem(id);
  }

  signInWithFacebook() {
    if (this.platform.is('cordova')) {
      return this.fb.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        return firebase.auth().signInWithCredential(facebookCredential);
      })
    }
    else {
      return this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res => this.displayName = res.additionalUserInfo.profile.first_name);
    }
  }

  signOut() {
    this.afAuth.auth.signOut();
    this.displayName="";
  }
}
