import { ChangeDetectorRef, Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import axios from 'axios';
import * as JSZip from 'jszip';
import { Observable, switchMap } from 'rxjs';
import { GovernmentType } from 'src/app/enums/GovernmentType';
import { OperationLog } from 'src/app/enums/OperationEnum';
import { RejectRemark } from 'src/app/enums/RejectioRemark';
import { RejectionDesk } from 'src/app/enums/RejectionDesk';
import { DownloadFileModel } from 'src/app/model/DownloadFileModel';
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

  async downloadFiles(userEmail:string,applicationId:string){
    console.log("Downloading Files for UE: "+userEmail+", ApplicationId: "+applicationId);
    let downloadFilesList:DownloadFileModel[] = [];
    await this.firebaseConfigService.getApplicationDocuments(userEmail,applicationId).then(async list=>{
      list.forEach(
        (listItem:{ [key: string]: any } )=>{
          Object.keys(listItem).forEach((key: string) => {
            console.log("Key: " + key + ", Value: " + listItem[key]);
            const parts = listItem[key].split('/');
            // Access the later part after 'gs://funddistribution-f26a7.appspot.com/'
            const laterPart = parts.slice(3).join('/');
            console.log(laterPart);
            downloadFilesList.push(new DownloadFileModel(key+".pdf",laterPart,""));
        });
        }
      );
      await this.populateUrls(downloadFilesList);
    });
  }

  async downloadFile(url: string, fileName: string): Promise<void> {
    try {
        const response = await axios.get(url, { responseType: 'blob' });
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error(`Error downloading file from ${url}:`, error);
    }
}


//   async downloadFilesAsZip(filePaths: string[]): Promise<void> {
//     const zip = new JSZip();

//     try {
//         const promises = filePaths.map(async (path, index) => {
//             const fileRef = this.firebaseConfigService.storage.ref(path);
//             console.log("Ref:"+fileRef.getDownloadURL());
//             fileRef.getDownloadURL().subscribe(async (url:string)=>{
//               console.log("DOWNLOAD URL:"+url);
//               const fileBlob = await this.fetchFileAsBlobOld(url);
//               if (fileBlob) {
//                   zip.file(`file${index + 1}.pdf`, fileBlob);
//               }
//             });
//         });

//         await Promise.all(promises);

//         const zipContent = await zip.generateAsync({ type: 'blob' });
//         const blobUrl = URL.createObjectURL(zipContent);
//         const link = document.createElement('a');
//         link.href = blobUrl;
//         link.download = 'files.zip';
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     } catch (error) {
//         console.error('Error downloading files as zip:', error);
//     }
// }

async populateUrls(downloadFilesList:DownloadFileModel[]):Promise<any>{
  let downloadUrlsList:string[] = [];
  return new Promise((resolve)=>{
    downloadFilesList.forEach(file=>{
      const fileRef = this.firebaseConfigService.storage.ref(file.filePath);
      fileRef.getDownloadURL().subscribe(async (url:string)=>{
        console.log("DOWNLOAD URL:"+url);
        await this.downloadFile(url,file.fileName);
      });
     });
     resolve(downloadUrlsList);
  })
}

// async downloadFilesAsZipNew(filePaths: string[]): Promise<void> {
//   const zip = new JSZip();
   
//   try {
//       const promises = filePaths.map(async (url, index) => {
//           try {
//               const response = await axios.get(url, { responseType: 'arraybuffer' });
//               if (!response.data || !response.data.byteLength) {
//                   console.error(`Empty response for file ${index + 1}. Skipping.`);
//                   return;
//               }
//               zip.file(`file${index + 1}.pdf`, response.data);
//           } catch (error) {
//               console.error(`Error downloading file ${index + 1}:`, error);
//           }
//       });

//       await Promise.all(promises);

//       const zipContent = await zip.generateAsync({ type: 'blob' });
//       const blobUrl = URL.createObjectURL(zipContent);
//       const link = document.createElement('a');
//       link.href = blobUrl;
//       link.download = 'files.zip';
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//   } catch (error) {
//       console.error('Error downloading files as zip:', error);
//   }
// }

// async fetchFileAsBlobOld(downloadUrl: string): Promise<Blob> {
//   try {
//       const response = await fetch(downloadUrl);
//       if (!response.ok) {
//           throw new Error(`Failed to fetch file from ${downloadUrl}: ${response.statusText}`);
//       }
//       return await response.blob();
//   } catch (error) {
//       console.error('Error fetching file as blob:', error);
//       throw error;
//   }
// }

// fetchFileAsBlob(storage: AngularFireStorage, downloadUrl: string): Observable<Blob> {
//   return storage.refFromURL(downloadUrl).getDownloadURL().pipe(
//       switchMap(url => fetch(url)),
//       switchMap(response => response.blob())
//   );
// }

async approveApplication(userEmai:string,applicationId:string){
  let applicationUpdateDataMap = {
    "approvedByState":true,
    "currentAtDesk":GovernmentType.DISTRICT,
  };

  let operationUpdateMap = {
    "from":GovernmentType.STATE,
    "to":GovernmentType.DISTRICT,
    "operation":OperationLog.APPROVED_BY_STATE,
  };

   await this.firebaseConfigService.approveApplication(userEmai,applicationId,applicationUpdateDataMap,operationUpdateMap).then(async val=>{
    this.approvalList = [];
    await this.getAllStateApprovalList();
    window.alert("Application Approved!");
  
   }); 
}

async rejectApplication(userEmai:string,applicationId:string){
  let applicationUpdateDataMap = {
    "approvedByState":false,
    "currentAtDesk":RejectionDesk.REJECTION_DESK,
    "rejectedBy":GovernmentType.STATE,
    "rejectionRemark":RejectRemark.SUBMITTED_DOCUMENTS_INVALID,
    "rejectionStatus":true
  };

  let operationUpdateMap = {
    "from":GovernmentType.STATE,
    "to":RejectionDesk.REJECTION_DESK,
    "operation":RejectRemark.SUBMITTED_DOCUMENTS_INVALID,
  };
  
  await this.firebaseConfigService.rejectApplication(userEmai,applicationId,applicationUpdateDataMap,operationUpdateMap).then(async val=>{
    this.approvalList = [];
    await this.getAllStateApprovalList();
    window.alert("Application Rejected!");
  });

  
}

}
