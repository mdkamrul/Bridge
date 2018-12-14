import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
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
  currentBride: any;

  bridgeId = null;
  bidWinner = null;
  call =  null;
  isDouble =  null;
  oppositTrick = null;
  bridgePoint = null
  callTrickNumber = null;
  honers = null;
  lsPoint = null;
  gsPoint = null;

  lead : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private storage: Storage, private db: Db, private alertCtrl: AlertController) {

    this.currentBride = this.navParams.get('currentBride');
    console.log(this.currentBride);
    this.lead = {};
  }

  onLeadOkClick($event){
    
    if(!this.bidWinner){
      this.showLeadAlert('Error', 'Please Select Bid Winner');
      return;
    }
    if(!this.call){
      this.showLeadAlert('Error', 'Please Select Call');
      return;
    }
    if (!this.oppositTrick){
      this.showLeadAlert('Error', 'Please Input Call Trick Count');
      return;
    }
    if (!this.callTrickNumber) {
      this.showLeadAlert('Error', 'Please Input Call Trick Count');
      return;
    }
    if (!this.honers) {
      this.honers = 0;
    }
    if(this.lsPoint && this.gsPoint){
      this.showLeadAlert('Error', 'LS and GS must not present in same lead.');
      return;
    }

    this.lead =  {
      bridgeId: '',
      bidWinner: this.bidWinner,
      call: parseInt(this.call),
      isDouble: this.isDouble,
      oppositTrick: parseInt(this.oppositTrick),
      isGame : false,
      gamePoint : null,
      honers: parseInt(this.honers),
      isRuff : false,
      lsPoint : null,
      gsPoint : null,
      bridgePoint : null,
      callTrickNumber: parseInt(this.callTrickNumber),
      shortPoint : null,
      play : null
    };
    this.calculateLead();
    this.lead.bridgeId = this.currentBride.bridgeId;

    this.db.mapLeadToBridge(this.lead);
    console.log(this.lead);
    this.navCtrl.pop();
  }

  showLeadAlert(title, message){
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  calculateLead(){
    var bridgeCallNumber = this.lead.callTrickNumber + this.lead.oppositTrick;
    var difTrick = 7 - bridgeCallNumber;
    if (difTrick >= 0){
      difTrick = 7 - this.lead.oppositTrick;
      var bridgePoint = difTrick * this.lead.call;
      if(this.lead.isDouble){
        bridgePoint = bridgePoint * 2;
      }
      if (bridgePoint >= 30){
        this.lead.isGame = true;
        this.lead.gamePoint = bridgePoint;
      }
      else {
        this.lead.play = bridgePoint;
      }
    }
    else{
      var shortMultiply = 50;
      if (this.lead.isDouble) {
        shortMultiply = 100;
      }
      this.lead.shortPoint = (difTrick * -1) * shortMultiply;
    }
  }

}
