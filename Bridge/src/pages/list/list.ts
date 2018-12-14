import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Db } from '../../app/db/Db';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private db : Db) {
    // If we navigated to this page, we will have an item available as a nav param
    /* this.selectedItem = navParams.get('item');
    console.log("work");
    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    this.items.push(this.storage.get("1")); */

    this.items = this.db.bridgeList;
    console.log(this.db.bridgeList);
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }
}
