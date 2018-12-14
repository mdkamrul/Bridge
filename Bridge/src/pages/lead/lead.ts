import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Db } from '../../app/db/Db';

@Component({
  selector: 'page-lead',
  templateUrl: 'lead.html'
})
export class LeadPage {
  selectedItem: any;
  icons: string[];
  items: Array<any>;
  currentBride: null;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private db : Db) {
    console.log("i am lead");
    this.currentBride = this.navParams.get('currentBride');
    console.log(this.currentBride);
  }
}
