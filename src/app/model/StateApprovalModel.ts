export class StateApprovalModel{
    
    applicationId:string="";
    schemeNonce:string= "";
    userEmail:string= "";
    schemeTitle:string= "";
    

    constructor(applicationId: string, schemeNonce: string, userEmail: string, schemeTitle: string) {
        this.applicationId = applicationId;
        this.schemeNonce = schemeNonce;
        this.userEmail = userEmail;
        this.schemeTitle = schemeTitle;
    }
}