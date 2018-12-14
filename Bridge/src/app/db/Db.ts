import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Injectable } from '@angular/core';
import { Platform } from "ionic-angular";
import { Table } from './Table';

const DB_NAME: string = 'bridge_dbo';


@Injectable()
export class Db{
    query: SQLiteObject;

     bridgeList = [];
     leadMap = [];

     playingBrige = null;

      private nextBridgeId = 0;

      getNextBridgeId(){
         if(this.bridgeList.length  == 0){
             this.nextBridgeId  = 1;
         }
         return this.nextBridgeId;
     }

     addBridge(bridge){
        this.bridgeList.push(bridge);
        this.nextBridgeId +=1;
    }

     getBridgLeadList(bridgeId){
         var leadList = [];
         for(var i = 0; i < this.leadMap.length; i ++){
             var lead = this.leadMap[i];
             if (lead.bridgeId = bridgeId){
                 leadList.push(lead);
             }
         }
         return leadList;
    }

     mapLeadToBridge(lead){
         this.leadMap.push(lead);
    }



    constructor(private sqlite: SQLite, public platform: Platform) { 
        /* this.sqlite.create({
            name: DB_NAME,
            location: 'default'
        })
        .then(db => {
            this.query =  db;
        })
        .catch(err => {
            console.log(err);
        }); */
    }
    qry(){
        return this.query;
    }
    initTable(){
        this.query.transaction((tx : any)=>{
            tx.executeSql(Table.T_BRIDGE);
        });
    }
}