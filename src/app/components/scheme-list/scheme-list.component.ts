import { Component } from '@angular/core';
import { MasterChainModel } from 'src/app/model/MasterChainModel';
import { FirebaseConfigService } from 'src/app/services/firebase-config.service';

@Component({
  selector: 'app-scheme-list',
  templateUrl: './scheme-list.component.html',
  styleUrls: ['./scheme-list.component.css']
})
export class SchemeListComponent {

 constructor(public firebaseConfigService:FirebaseConfigService){
    this.getMasterChainList();
 }
 
  masterChainList:MasterChainModel[]=[];
 
  getMasterChainList(){
    this.firebaseConfigService.getMasterBlockChainList().subscribe(
      (actionArray: any[]) =>{
        this.masterChainList = actionArray.map((item: any) =>{
          var recvdData = JSON.parse(JSON.stringify(item,this.firebaseConfigService.getCircularReplacer() ));
          console.log("Item:"+JSON.stringify(item,this.firebaseConfigService.getCircularReplacer() ));
          return new MasterChainModel(
            recvdData['nonce'],
            recvdData['schemeTitle'],
            recvdData['schemeDescription'],
            recvdData['applicantType'],
            recvdData['prevHash'],
            recvdData['hash'],
            recvdData['timeStamp'],
            recvdData['schemeFund'],
          )
            }
          );
      }
    );
  }


}
