import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Db } from '../../app/db/Db';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  gameName = '';
  items: Array<any>;
  currentBride = null;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController,private db : Db) {
    if (this.currentBride == null){
      this.gameNameDialog();
      this.items = [];
    }
    else{
      this.items = this.db.getBridgLeadList(this.currentBride.bridgeId);
    }
    
    
  }

  onNewLeadClick(){
    console.log("work");
    this.newLeadDialog();
  }

  onGameResultBtnClick(){

  }

  onLeadItemClick($event, item){
    console.log(item);
  }

  newLeadDialog(){
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
          placeholder : "Call"
        },
        {
          name: 'wePoint',
          placeholder: "Lead Point"
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            
          }
        },
        {
          text: 'Ok',
          handler: data => {
            this.items.push(data);
            this.db.setValueToLeadMap(this.currentBride.bridgeId, data);
            console.log(this.db.getBridgLeadList(this.currentBride.bridgeId));
            this.items.push(data);
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
