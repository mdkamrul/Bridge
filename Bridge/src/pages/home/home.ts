import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Db } from '../../app/db/Db';
import { SQLiteObject } from '@ionic-native/sqlite';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  gameName = '';
  items: Array<any>;

  query: SQLiteObject;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController,private db : Db) {
    this.gameNameDialog();
    this.items = [];
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
            this.query.transaction((tx : any)=>{
            });
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
            this.gameName = data.gameName;
            this.db.bridgeList.push(data);
          }
        }
      ]
    });
    alert.present();
  }

}
