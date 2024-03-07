import { ChangeDetectorRef, Component } from '@angular/core';
import { GovernmentType } from 'src/app/enums/GovernmentType';
import { OperationLog } from 'src/app/enums/OperationEnum';
import { RejectRemark } from 'src/app/enums/RejectioRemark';
import { RejectionDesk } from 'src/app/enums/RejectionDesk';
import { BankDataModel } from 'src/app/model/BankDataModel';
import { FirebaseConfigService } from 'src/app/services/firebase-config.service';

@Component({
  selector: 'app-bank-home-page',
  templateUrl: './bank-home-page.component.html',
  styleUrls: ['./bank-home-page.component.css']
})
export class BankHomePageComponent {


  approvalList:BankDataModel[] = [];
  isLoading:boolean = true;

  constructor(public firebaseConfigService:FirebaseConfigService,private cdr: ChangeDetectorRef){
    this.getAllBankApprovalList();
  }
  
  async getAllBankApprovalList(): Promise<void> {
    console.log("Fetching");
    this.isLoading = true; // Set isLoading to true to indicate loading
    this.approvalList = await this.firebaseConfigService.getAllBankApprovalRequests();

    try {
      // Fetch admin approval requests only if the list is not already populated
      if (!this.approvalList || this.approvalList.length === 0) {
        

      }
    } catch (error) {
      console.error("Error fetching admin approval requests:", error);
    } finally {
      this.isLoading = false; // Set isLoading to false whether request succeeds or fails
    }
  }
  
  async approveApplication(userEmai:string,applicationId:string,){
    let applicationUpdateDataMap = {
      "approvedByBank":true,
      "currentAtDesk":GovernmentType.ARCHIVE,
      "finalSettlementDone":true,

    };
  
    let operationUpdateMap = {
      "from":GovernmentType.BANK,
      "to":GovernmentType.ARCHIVE,
      "operation":OperationLog.APPROVED_BY_BANK,
    };
  
     await this.firebaseConfigService.approveApplication(userEmai,applicationId,applicationUpdateDataMap,operationUpdateMap).then(async val=>{
      this.approvalList = [];
      await this.getAllBankApprovalList();
      window.alert("Application Approved!");
    
     }); 
  }
  
  async rejectApplication(userEmai:string,applicationId:string){
    let applicationUpdateDataMap = {
      "approvedByBank":false,
      "currentAtDesk":RejectionDesk.REJECTION_DESK,
      "rejectedBy":GovernmentType.BANK,
      "rejectionRemark":RejectRemark.REJECTION_BY_BANK,
      "rejectionStatus":true
    };
  
    let operationUpdateMap = {
      "from":GovernmentType.BANK,
      "to":RejectionDesk.REJECTION_DESK,
      "operation":RejectRemark.REJECTION_BY_BANK,
    };
    
    await this.firebaseConfigService.rejectApplication(userEmai,applicationId,applicationUpdateDataMap,operationUpdateMap).then(async val=>{
      this.approvalList = [];
      await this.getAllBankApprovalList();
      window.alert("Application Rejected!");
    });
  
}
}
