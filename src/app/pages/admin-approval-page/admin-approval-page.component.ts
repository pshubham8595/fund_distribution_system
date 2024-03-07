import { ChangeDetectorRef, Component } from '@angular/core';
import { GovernmentType } from 'src/app/enums/GovernmentType';
import { OperationLog } from 'src/app/enums/OperationEnum';
import { RejectRemark } from 'src/app/enums/RejectioRemark';
import { RejectionDesk } from 'src/app/enums/RejectionDesk';
import { AdminApprovalModel } from 'src/app/model/AdminApprovalModel';
import { FirebaseConfigService } from 'src/app/services/firebase-config.service';

@Component({
  selector: 'app-admin-approval-page',
  templateUrl: './admin-approval-page.component.html',
  styleUrls: ['./admin-approval-page.component.css']
})
export class AdminApprovalPageComponent {

  adminApprovalList:AdminApprovalModel[] = [];
  isLoading:boolean = true;
  constructor(public firebaseConfigService:FirebaseConfigService,private cdr: ChangeDetectorRef){
    
  }

  ngOnInit(){
    this.getAllAdminApprovalList();
  }
  

  async getAllAdminApprovalList(): Promise<void> {
    this.isLoading = true; // Set isLoading to true to indicate loading
  
    try {
      // Fetch admin approval requests only if the list is not already populated
      if (!this.adminApprovalList || this.adminApprovalList.length === 0) {
        this.adminApprovalList = await this.firebaseConfigService.getAllAdminapprovalRequests();

      }
    } catch (error) {
      console.error("Error fetching admin approval requests:", error);
    } finally {
      this.isLoading = false; // Set isLoading to false whether request succeeds or fails
    }
  }

  async approveApplication(userEmai:string,applicationId:string){
    let applicationUpdateDataMap = {
      "approvedByAdmin":true,
      "currentAtDesk":GovernmentType.STATE,
    };

    let operationUpdateMap = {
      "from":GovernmentType.ADMIN,
      "to":GovernmentType.STATE,
      "operation":OperationLog.APPROVED_BY_ADMIN,
    };

     await this.firebaseConfigService.approveApplication(userEmai,applicationId,applicationUpdateDataMap,operationUpdateMap).then(async val=>{
      this.adminApprovalList = [];
      await this.getAllAdminApprovalList();
      window.alert("Application Approved!");
    
     }); 
  }

  async rejectApplication(userEmai:string,applicationId:string){
    let applicationUpdateDataMap = {
      "approvedByAdmin":false,
      "currentAtDesk":RejectionDesk.REJECTION_DESK,
      "rejectedBy":GovernmentType.ADMIN,
      "rejectionRemark":RejectRemark.APPLICANT_TYPE_MISMATCH,
      "rejectionStatus":true
    };

    let operationUpdateMap = {
      "from":GovernmentType.ADMIN,
      "to":RejectionDesk.REJECTION_DESK,
      "operation":RejectRemark.APPLICANT_TYPE_MISMATCH,
    };

    
    await this.firebaseConfigService.rejectApplication(userEmai,applicationId,applicationUpdateDataMap,operationUpdateMap).then(async val=>{
      this.adminApprovalList = [];
      await this.getAllAdminApprovalList();
      window.alert("Application Rejected!");
    
    });

    
  }

}
