import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Db } from '../../app/db/Db';
import { LeadPage } from '../lead/lead';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class NewGamePage {

  gameName = '';
  items: Array<any>;
  currentBride : any;

  weLead = [];
  theyLead = [];

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, private db: Db, public navParams: NavParams) {
    var listBridge = this.navParams.get('listBridge');
    if (listBridge != null) {
      this.currentBride = listBridge;
    }
    if (this.currentBride == null){
      this.gameNameDialog();
      this.items = [];
    }
    else{
      this.items = this.db.getBridgLeadList(this.currentBride.bridgeId);
    }
    //this.splitLead();
  }

  ionViewDidEnter(){
    if (this.currentBride != null){
      this.items = this.db.getBridgLeadList(this.currentBride.bridgeId);
      this.splitLead();
    }
    
  }

  onNewLeadClick(){
    this.navCtrl.push(LeadPage,{
      currentBride: this.currentBride
    });
  }

  onGameResultBtnClick(){
    this.showResult();
  }

  onLeadItemClick($event, item){
    console.log(item);
  }

  splitLead(){
    this.weLead = [];
    this.theyLead = [];
    for(var i = 0; i < this.items.length; i++){
      var lead = this.items[i];
      if (lead.bidWinner == 'We'){
        this.weLead.push(lead);
      }
      else{
        this.theyLead.push(lead);
      }
    }
    console.log(this.weLead);
    console.log(this.theyLead);
  }

  showResult(){
    let leadNumber = this.items.length + 1;
    let alert = this.alertCtrl.create({
      title: 'Lead Number : ' + leadNumber,
      inputs: [
        {
          name: 'gameName',
          placeholder: 'Game Name'
        },
        {
          name : 'call',
          label : 'Call',
          type: 'radio',
          value : '8'
        },
        {
          name: 'call',
          label: 'Call',
          type: 'radio',
          value : '9'
        },
        {
          name: 'wePoint',
          placeholder: "Lead Point"
        }
      ],
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: data => {
          }
        }
      ]
    });
    alert.present();
  }

  gameNameDialog() {
    let alert = this.alertCtrl.create({
      title: 'Game Name',
      inputs: [
        {
          name: 'gameName',
          placeholder: 'Game Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            data.startTime = new Date();
            data.bridgeId = this.db.getNextBridgeId();
            this.gameName = data.gameName;
            this.db.bridgeList.push(data);
            this.currentBride = data;
            this.db.playingBrige = data;
            console.log(data);
          }
        }
      ]
    });
    alert.present();
  }

}
