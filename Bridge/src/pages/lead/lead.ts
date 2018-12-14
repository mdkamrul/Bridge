import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Db } from '../../app/db/Db';
import { Events } from 'ionic-angular';

@Component({
  selector: 'page-lead',
  templateUrl: 'lead.html'
})
export class LeadPage {
  selectedItem: any;
  icons: string[];
  items: Array<any>;
  currentBride: any;

    bridgeId = '';
    bidWinner: ''
    call: ''
    isDouble: ''
    trickNumber: ''

    lead : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private storage: Storage, private db: Db, private events: Events) {

    this.currentBride = this.navParams.get('currentBride');
    console.log(this.currentBride);
    this.lead = {};
  }

  onLeadOkClick($event){

    this.lead =  {
      bridgeId: '',
      bidWinner: this.bidWinner,
      call: this.call,
      isDouble: this.isDouble,
      trickNumber: this.trickNumber
    };
    this.lead.bridgeId = this.currentBride.bridgeId;

    this.db.mapLeadToBridge(this.lead);
    this.navCtrl.pop();
  }

  ionViewWillLeave() {
    this.events.publish('lead', this.lead);
  }
}
