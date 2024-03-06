import { Component } from '@angular/core';
import { GovernmentType } from 'src/app/enums/GovernmentType';
import { OperationLog } from 'src/app/enums/OperationEnum';
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
  constructor(public firebaseConfigService:FirebaseConfigService){
    this.getAllAdminApprovalList();
  }
  

  async getAllAdminApprovalList(){
    this.adminApprovalList = [];
    await this.firebaseConfigService.getAllAdminapprovalRequests().then(list=>{
      this.adminApprovalList = list;
    });
    this.isLoading = false;
  }

  async approveApplication(userEmai:string,applicationId:string){
    let applicationUpdateDataMap = {
      "approvedByAdmin":true,
      "currentAtDesk":GovernmentType.ADMIN
    };

    let operationUpdateMap = {
      "from":GovernmentType.ADMIN,
      "to":GovernmentType.STATE,
      "operation":OperationLog.APPROVED_BY_ADMIN,
    };

     await this.firebaseConfigService.approveByAdmin(userEmai,applicationId,applicationUpdateDataMap,operationUpdateMap); 
  }

  async rejectApplication(userEmai:string,applicationId:string){
    
  }

}
