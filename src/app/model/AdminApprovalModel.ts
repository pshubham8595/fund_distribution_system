export class AdminApprovalModel{
    
    applicationId:string="";
    schemeNonce:string= "";
    userEmail:string= "";
    userType:string= "";
    applicantType:string= "";
    schemeTitle:string= "";
    approvedByAdmin:boolean=false;

    constructor(
        schemeNonce: string,
        userEmail: string,
        userType: string,
        applicantType: string,
        schemeTitle: string,
        approvedByAdmin: boolean,
        applicationId:string
    ) {
        this.schemeNonce = schemeNonce;
        this.userEmail = userEmail;
        this.userType = userType;
        this.applicantType = applicantType;
        this.schemeTitle = schemeTitle;
        this.approvedByAdmin = approvedByAdmin;
        this.applicationId = applicationId;
    }
}