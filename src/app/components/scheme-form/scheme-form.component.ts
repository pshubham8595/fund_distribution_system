import { Component, numberAttribute } from '@angular/core';
import { FirebaseConfigService } from './../../services/firebase-config.service';

@Component({
  selector: 'app-scheme-form',
  templateUrl: './scheme-form.component.html',
  styleUrls: ['./scheme-form.component.css']
})
export class SchemeFormComponent {


  schemeTitle:string ="";
  schemeFund:number =0;
  schemeDescription:string ="";
  applicantType:string ="";

  adharCard:boolean =false;
  pancard:boolean =false;
  landDocument:boolean =false;
  shopact:boolean =false;
  gstReturns:boolean =false;
  itr:boolean =false;
  studentId:boolean =false;

  constructor(private firebaseConfig:FirebaseConfigService){

  }

async onSubmit(){
  // console.log("tit:"+this.schemeTitle)
  // console.log("amt:"+this.schemeFund)
  // console.log("desc:"+this.schemeDescription)
  // console.log("apTyp:"+this.applicantType)
  // console.log("adhc:"+this.adharCard)
  // console.log("panc:"+this.pancard)
  // console.log("land:"+this.landDocument)
  // console.log("shopa:"+this.shopact)
  // console.log("gstR:"+this.gstReturns)
  // console.log("itr:"+this.itr)
  // console.log("studI:"+this.studentId)



  await this.firebaseConfig.getDataFromFirestore().then(async ({ prevHash, nonce }) => {

    console.log('prevHash:', prevHash);
    console.log('nonce:', nonce);
    let timeStamp = this.firebaseConfig.getCurrentDate();
    let currentHash = this.firebaseConfig.computeHash(nonce,prevHash,timeStamp,this.schemeDescription,this.schemeTitle,this.applicantType)
    
    let dataMap = {
      "nonce":nonce,
      "prevHash":prevHash,
      "schemeTitle":this.schemeTitle,
      "schemeFund":this.schemeFund,
      "schemeDescription":this.schemeDescription,
      "applicantType":this.applicantType,
      "timeStamp":timeStamp,
      "hash":currentHash,
      "requiredDocuments":{
          "adharCard":this.adharCard,
          "pancard":this.pancard,
          "landDocument":this.landDocument,
          "shopact":this.shopact,
          "gstReturns":this.gstReturns,
          "studentId":this.studentId,
          "itr":this.itr,
        }
      
      
    };
    console.log("Update Map :"+JSON.stringify(dataMap));
    await this.firebaseConfig.addDataToMasterChain(dataMap);
  }).catch(error => {
    console.error('Error fetching data:', error);
  });

}

}
