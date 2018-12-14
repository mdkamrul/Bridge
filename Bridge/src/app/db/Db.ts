import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Injectable } from '@angular/core';
import { Platform } from "ionic-angular";
import { Table } from './Table';

const DB_NAME: string = 'bridge_dbo';


@Injectable()
export class Db{
    query: SQLiteObject;

     bridgeList = [];
     leadMap = new Map();

    public addBridge(bridge){
        this.bridgeList.push(bridge);
    }

    public getBridgLead(key){
        return this.leadMap.get(key);
    }

    public setValueToLeadMap(key, value){
        this.leadMap.set(key, value);
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