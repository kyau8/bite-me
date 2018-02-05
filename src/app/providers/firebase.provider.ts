import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class FirebaseProvider {
    constructor(public afd: AngularFireDatabase) { }

    getShoppingItems() {
        return this.afd.list('/items/').snapshotChanges().map(actions => {
            return actions.map(action => ({ key: action.key, title: action.payload.val() }));
        });
    }

    addItem(name) {
        this.afd.list('/items/').push(name);
    }

    removeItem(id) {
        this.afd.list('/items/').remove(id);
    }
}