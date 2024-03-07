import { ChangeDetectorRef, Component } from '@angular/core';
import { GovernmentType } from 'src/app/enums/GovernmentType';
import { OperationLog } from 'src/app/enums/OperationEnum';
import { RejectRemark } from 'src/app/enums/RejectioRemark';
import { RejectionDesk } from 'src/app/enums/RejectionDesk';
import { DistricDataModel } from 'src/app/model/DistrictDataModel';
import { FirebaseConfigService } from 'src/app/services/firebase-config.service';

@Component({
  selector: 'app-district-home-page',
  templateUrl: './district-home-page.component.html',
  styleUrls: ['./district-home-page.component.css']
})
export class DistrictHomePageComponent {
  approvalList:DistricDataModel[] = [];
  isLoading:boolean = true;
  newApprovalValue:number = 0;
  constructor(public firebaseConfigService:FirebaseConfigService,private cdr: ChangeDetectorRef){
    this.getAllDistrictApprovalList();
  }
  
  async getAllDistrictApprovalList(): Promise<void> {
    console.log("Fetching");
    this.isLoading = true; // Set isLoading to true to indicate loading
    this.approvalList = await this.firebaseConfigService.getAllDistrictApprovalRequests();

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

  updateValue(event: any) {
    const newValue = event.target.innerText.trim(); // Get the updated value
    // Send newValue to TypeScript or perform any other action with it
    this.newApprovalValue = newValue; 
    console.log("UPDATED APPROVED VAL: "+this.newApprovalValue);
  }

  async approveApplication(userEmai:string,applicationId:string,approvedAmount:number){
    console.log("Updated Approved Fund amount: "+approvedAmount);
    let applicationUpdateDataMap = {
      "approvedByDistrict":true,
      "currentAtDesk":GovernmentType.BANK,
      "finalAmount":this.newApprovalValue
    };
  
    let operationUpdateMap = {
      "from":GovernmentType.DISTRICT,
      "to":GovernmentType.BANK,
      "operation":OperationLog.APPROVED_BY_DISTRICT,
    };
  
     await this.firebaseConfigService.approveApplication(userEmai,applicationId,applicationUpdateDataMap,operationUpdateMap).then(async val=>{
      this.approvalList = [];
      await this.getAllDistrictApprovalList();
      window.alert("Application Approved!");
    
     }); 
  }
  
  async rejectApplication(userEmai:string,applicationId:string){
    let applicationUpdateDataMap = {
      "approvedByDistrict":false,
      "currentAtDesk":RejectionDesk.REJECTION_DESK,
      "rejectedBy":GovernmentType.DISTRICT,
      "rejectionRemark":RejectRemark.REJECTION_BY_DISTRICT,
      "rejectionStatus":true
    };
  
    let operationUpdateMap = {
      "from":GovernmentType.DISTRICT,
      "to":RejectionDesk.REJECTION_DESK,
      "operation":RejectRemark.REJECTION_BY_DISTRICT,
    };
    
    await this.firebaseConfigService.rejectApplication(userEmai,applicationId,applicationUpdateDataMap,operationUpdateMap).then(async val=>{
      this.approvalList = [];
      await this.getAllDistrictApprovalList();
      window.alert("Application Rejected!");
    });
  
}
}
