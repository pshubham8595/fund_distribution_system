import { ChangeDetectorRef, Component } from '@angular/core';
import { StateApprovalModel } from 'src/app/model/StateApprovalModel';
import { FirebaseConfigService } from 'src/app/services/firebase-config.service';

@Component({
  selector: 'app-state-home-page',
  templateUrl: './state-home-page.component.html',
  styleUrls: ['./state-home-page.component.css']
})
export class StateHomePageComponent {
  approvalList:StateApprovalModel[] = [];
  isLoading:boolean = true;

  // getAllStateapprovalRequests

  constructor(public firebaseConfigService:FirebaseConfigService,private cdr: ChangeDetectorRef){
    this.getAllStateApprovalList();  
  }

  async getAllStateApprovalList(): Promise<void> {
    console.log("Fetching");
    this.isLoading = true; // Set isLoading to true to indicate loading
    this.approvalList = await this.firebaseConfigService.getAllStateapprovalRequests();

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

  downloadFiles(userEmai:string,applicationId:string){
    console.log("Downloading Files for UE: "+userEmai+", ApplicationId: "+applicationId);
    this.firebaseConfigService.downloadFile("applicationDocs/aaa@gmail.com/1/adharCard.pdf");
  }

  approveApplication(userEmai:string,applicationId:string){

  }

  rejectApplication(userEmai:string,applicationId:string){

  }

}
