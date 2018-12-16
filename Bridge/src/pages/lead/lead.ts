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
  weHoners = null;
  theyHoners = null;
  lsPoint = null;
  gsPoint = null;
  leadNumber = 1;

  bridgeLeadList = [];

  lead : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
     private db: Db, private alertCtrl: AlertController) {

    this.currentBride = this.navParams.get('currentBride');
    console.log(this.currentBride);
    this.lead = {};
    this.bridgeLeadList = this.db.getBridgLeadList(this.currentBride.bridgeId);
    this.leadNumber = this.bridgeLeadList.length + 1;
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
    if (this.weHoners && this.theyHoners) {
      this.showLeadAlert('Error', 'Both Honers must not present in same lead.');
      return;
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
      oppositTrick: this.appParseInt(this.oppositTrick),
      isGame : false,
      weGamePoint : null,
      theyGamePoint : null,
      weHoners: this.appParseInt(this.weHoners),
      theyHoners: this.appParseInt(this.theyHoners),
      weRuff : false,
      theyRuff : false,
      weLsPoint : null,
      theyLsPoint : null,
      weGsPoint : null,
      theyGsPoint : null,
      weBridgePoint : null,/* if no one call */
      theyBridgePoint : null,
      callTrickNumber: this.appParseInt(this.callTrickNumber),
      weShortPoint : null,
      theyShortPoint : null,
      wePlay : null,
      theyPlay : null,
      leadNumber : this.leadNumber,
      weDisplay : null,
      theyDisplay : null
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
    var bidWenner = this.lead.bidWinner;
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
        this.setGamePoint(bidWenner, bridgePoint);
      }
      else {
        this.setPlay(bidWenner, bridgePoint);
      }
    }
    else{
      var shortMultiply = 50;
      if (this.lead.isDouble) {
        shortMultiply = 100;
      }
      var short = (difTrick * -1) * shortMultiply;
      this.setShort(bidWenner, short);
    }
    this.lead.weDisplay = 'Test Display We';
    this.lead.theyDisplay = 'Test Display They';
    console.log(this.lead);
  }
  setPlay(bidWinner, play){
    if(this.bidWinner == 'We'){
      this.lead.wePlay = play;
    }
    else{
      this.lead.theyPlay = play;
    }
  }
  setShort(bidWinner, short){
    if (this.bidWinner == 'We') {
      this.lead.theyShortPoint = short;
    }
    else {
      this.lead.weShortPoint = short;
    }
  }

  setLs(bidWinner, point) {
    if (this.bidWinner == 'We') {
      this.lead.weLsPoint = point;
    }
    else {
      this.lead.theyLsPoint = point;
    }
  }

  setGs(bidWinner, point) {
    if (this.bidWinner == 'We') {
      this.lead.weGsPoint = point;
    }
    else {
      this.lead.theyGsPoint = point;
    }
  }
  setGamePoint(bidWinner, point) {
    if (this.bidWinner == 'We') {
      this.lead.weGamePoint = point;
    }
    else {
      this.lead.theyGamePoint = point;
    }
  }

  appParseInt(point){
    if(null == point){
      return null;
    }
    return parseInt(point);
  }

}
