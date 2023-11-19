import { Injectable } from '@angular/core';
import {AngularFirestore, QuerySnapshot} from '@angular/fire/compat/firestore'
import { Router } from '@angular/router';
import * as sha256 from 'crypto-js/sha256';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseConfigService {

  constructor(
    public firestore:AngularFirestore) { }

  getCurrentDate(): string {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const second = date.getSeconds().toString().padStart(2, '0');
    return `${day}-${month}-${year} ${hour}:${minute}:${second}`;
  }

  computeHash(
    nonce:number,
    prevHash:string,
    timeStamp:string,
    schemeDescription:string,
    schemeTitle:string,
    applicantType:string,
    ){
    
    let inputString = 
    nonce + 
    prevHash + 
    timeStamp + 
    schemeDescription +
    schemeTitle +
    applicantType;

    return sha256(inputString).toString();
  } 

  getMasterBlockChainData():Observable<any> {
    return this.firestore.collection("MasterChain").snapshotChanges();
  }
  
  getMasterBlockChainList():Observable<any> {
    return this.firestore.collection("MasterChain").valueChanges();
  }

  async getDataFromFirestore(): Promise<{ prevHash: string; nonce: number }> {
    return new Promise((resolve, reject) => {
      let prevHash: string;
      let nonce: number;
  
      this.firestore.collection('MasterChain').valueChanges().subscribe(result => {
        if(result.length == 0){
          prevHash = "#0"
        }
        else{
          result.forEach(e => {
            var recvdData = JSON.parse(JSON.stringify(e, this.getCircularReplacer()));
            prevHash = recvdData['hash'];
          });
        }
        nonce = result.length + 1;
  
        resolve({ prevHash, nonce });
      }, error => {
        reject(error);
      });
    });
  }

  async addDataToMasterChain(dataMap:any){
    let nonceString = dataMap['nonce'].toString();
    console.log("Updating for nonce:"+nonceString)
    this.firestore.collection("MasterChain").doc(nonceString).set(dataMap);

    
  }

  getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key:string, value:any) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };

}
