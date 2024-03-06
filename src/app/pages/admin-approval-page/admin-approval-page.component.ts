import { Component } from '@angular/core';
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
    await this.firebaseConfigService.getAllAdminapprovalRequests().then(list=>{
      this.adminApprovalList = list;
    });
    this.isLoading = false;
  }

  async approveApplication(userEmai:string,applicationId:string){
    
  }

  async rejectApplication(userEmai:string,applicationId:string){
    
  }

}
