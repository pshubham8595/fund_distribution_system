
export class MasterChainModel {
  
  nonce:number = 0;
  schemeTitle = "";
  schemeDescription = "";
  applicantType = "";
  prevHash= "";
  hash = "";
  timeStamp = "";
  schemeFund:number = 0;

  constructor(
    nonce: number,
    schemeTitle: string,
    schemeDescription: string,
    applicantType: string,
    prevHash: string,
    hash: string,
    timeStamp: string,
    schemeFund:number
  ) {
    this.nonce = nonce;
    this.schemeTitle = schemeTitle;
    this.schemeDescription = schemeDescription;
    this.applicantType = applicantType;
    this.prevHash = prevHash;
    this.hash = hash;
    this.timeStamp = timeStamp;
    this.schemeFund = schemeFund;
  }
  

}