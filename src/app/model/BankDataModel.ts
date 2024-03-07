export class BankDataModel{

    schemeTitle = "";
    schemeFund:number = -1;
    approvedFund:number = -1;
    applicationId:string="";
    schemeNonce:string= "";
    userEmail:string= "";


    constructor(
        schemeTitle: string = "",
        schemeFund: number = -1,
        approvedFund: number = -1,
        applicationId: string = "",
        schemeNonce: string = "",
        userEmail: string = ""
    ) {
        this.schemeTitle = schemeTitle;
        this.schemeFund = schemeFund;
        this.approvedFund = approvedFund;
        this.applicationId = applicationId;
        this.schemeNonce = schemeNonce;
        this.userEmail = userEmail;
    }
}