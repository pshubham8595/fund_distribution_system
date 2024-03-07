  import { Injectable } from '@angular/core';
  import {AngularFirestore, QuerySnapshot} from '@angular/fire/compat/firestore'
  import {AngularFireStorage} from '@angular/fire/compat/storage'
  import { Router } from '@angular/router';
  import * as sha256 from 'crypto-js/sha256';
  import { Observable, Subject, takeUntil } from 'rxjs';
  import { AdminApprovalModel } from '../model/AdminApprovalModel';
  import { GovernmentType } from '../enums/GovernmentType';
  import { StateApprovalModel } from '../model/StateApprovalModel';
import { DistricDataModel } from '../model/DistrictDataModel';
import { BankDataModel } from '../model/BankDataModel';

  @Injectable({
    providedIn: 'root'
  })
  export class FirebaseConfigService {

    constructor(
      public firestore:AngularFirestore,public storage:AngularFireStorage) { }

    getCurrentDate(): string {
      const date = new Date();
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear().toString();
      const hour = date.getHours().toString().padStart(2, '0');
      const minute = date.getMinutes().toString().padStart(2, '0');
      const second = date.getSeconds().toString().padStart(2, '0');
      return `${day}-${month}-${year} ${hour}:${minute}:${second}`;
    }

    computeHash(
      nonce:number,
      prevHash:string,
      timeStamp:string,
      schemeDescription:string,
      schemeTitle:string,
      applicantType:string,
      ){
      
      let inputString = 
      nonce + 
      prevHash + 
      timeStamp + 
      schemeDescription +
      schemeTitle +
      applicantType;

      return sha256(inputString).toString();
    }
    
    computeOperationHash(
      inputString:string,
      ){
      return sha256(inputString).toString();
    } 

    getMasterBlockChainData():Observable<any> {
      return this.firestore.collection("MasterChain").snapshotChanges();
    }
    
    getMasterBlockChainList():Observable<any> {
      return this.firestore.collection("MasterChain").valueChanges();
    }

    async getDataFromFirestore(): Promise<{ prevHash: string; nonce: number }> {
      return new Promise((resolve, reject) => {
        let prevHash: string;
        let nonce: number;
    
        this.firestore.collection('MasterChain').valueChanges().subscribe(result => {
          if(result.length == 0){
            prevHash = "#0"
          }
          else{
            result.forEach(e => {
              var recvdData = JSON.parse(JSON.stringify(e, this.getCircularReplacer()));
              prevHash = recvdData['hash'];
            });
          }
          nonce = result.length + 1;
    
          resolve({ prevHash, nonce });
        }, error => {
          reject(error);
        });
      });
    }

    async addDataToMasterChain(dataMap:any){
      let nonceString = dataMap['nonce'].toString();
      console.log("Updating for nonce:"+nonceString)
      this.firestore.collection("MasterChain").doc(nonceString).set(dataMap);

      
    }

    async getAllAdminapprovalRequests():Promise<AdminApprovalModel[]>{
      return new Promise((resolve) => {
      const userCollection = this.firestore.collection('Users');
      const unsubscribe$ = new Subject<void>();
      let adminApprovalList: AdminApprovalModel[] = [];
      userCollection.valueChanges().pipe(
        takeUntil(unsubscribe$)
      ).subscribe(
        users=>{
          users.forEach(user=>{
            var userEmail = JSON.parse(JSON.stringify(user))["email"];
            // console.log("userEmail:"+userEmail)
            this.firestore.collection('Users').doc(userEmail.toString()).collection("applications").valueChanges().pipe(
              takeUntil(unsubscribe$)
            ).subscribe(applications=>{
                applications.forEach(application=>{
                  let applicationData = JSON.parse(JSON.stringify(application));
                  let currentDesk = applicationData["currentAtDesk"];   
                  if(currentDesk.toString() == GovernmentType.ADMIN){
                    console.log("userEmail :"+userEmail+"currentDesk: "+currentDesk);
                    let adminApprovalObject = new AdminApprovalModel(applicationData["nonce"],userEmail,applicationData["userType"],applicationData["applicantType"],applicationData["schemeTitle"],applicationData["approvedByAdmin"],applicationData["applicationId"]);
                    adminApprovalList.push(adminApprovalObject);
                  }
                })
            })
            })
          })
          resolve(adminApprovalList);
          })
        }

    async getAllStateapprovalRequests():Promise<StateApprovalModel[]>{
          return new Promise((resolve) => {
          const userCollection = this.firestore.collection('Users');
          const unsubscribe$ = new Subject<void>();
          let approvalList: StateApprovalModel[] = [];
          userCollection.valueChanges().pipe(
            takeUntil(unsubscribe$)
          ).subscribe(
            users=>{
              users.forEach(user=>{
                var userEmail = JSON.parse(JSON.stringify(user))["email"];
                // console.log("userEmail:"+userEmail)
                this.firestore.collection('Users').doc(userEmail.toString()).collection("applications").valueChanges().pipe(
                  takeUntil(unsubscribe$)
                ).subscribe(applications=>{
                    applications.forEach(application=>{
                      let applicationData = JSON.parse(JSON.stringify(application));
                      let currentDesk = applicationData["currentAtDesk"];   
                      if(currentDesk.toString() == GovernmentType.STATE){
                        console.log("userEmail :"+userEmail+"currentDesk: "+currentDesk);
                        let adminApprovalObject = new StateApprovalModel(applicationData["nonce"],applicationData["applicationId"],applicationData["userEmail"],applicationData["schemeTitle"]);
                        approvalList.push(adminApprovalObject);
                      }
                    })
                })
                })
              })
              resolve(approvalList);
              })
        }
      
    async getAllDistrictApprovalRequests():Promise<DistricDataModel[]>{
              return new Promise((resolve) => {
              const userCollection = this.firestore.collection('Users');
              const unsubscribe$ = new Subject<void>();
              let approvalList: DistricDataModel[] = [];
              userCollection.valueChanges().pipe(
                takeUntil(unsubscribe$)
              ).subscribe(
                users=>{
                  users.forEach(user=>{
                    var userEmail = JSON.parse(JSON.stringify(user))["email"];
                    // console.log("userEmail:"+userEmail)
                    this.firestore.collection('Users').doc(userEmail.toString()).collection("applications").valueChanges().pipe(
                      takeUntil(unsubscribe$)
                    ).subscribe(applications=>{
                        applications.forEach(application=>{
                          let applicationData = JSON.parse(JSON.stringify(application));
                          let currentDesk = applicationData["currentAtDesk"];   
                          if(currentDesk.toString() == GovernmentType.DISTRICT){
                            console.log("userEmail :"+userEmail+"currentDesk: "+currentDesk);
                            let districtApprovalObject = new DistricDataModel(applicationData["schemeTitle"],applicationData["schemeFund"],applicationData["finalAmount"],applicationData["applicationId"],applicationData["nonce"],applicationData["userEmail"]);
                            approvalList.push(districtApprovalObject);
                          }
                        })
                    })
                    })
                  })
                  resolve(approvalList);
                  })
        }

    async getAllBankApprovalRequests():Promise<BankDataModel[]>{
          return new Promise((resolve) => {
          const userCollection = this.firestore.collection('Users');
          const unsubscribe$ = new Subject<void>();
          let approvalList: BankDataModel[] = [];
          userCollection.valueChanges().pipe(
            takeUntil(unsubscribe$)
          ).subscribe(
            users=>{
              users.forEach(user=>{
                var userEmail = JSON.parse(JSON.stringify(user))["email"];
                // console.log("userEmail:"+userEmail)
                this.firestore.collection('Users').doc(userEmail.toString()).collection("applications").valueChanges().pipe(
                  takeUntil(unsubscribe$)
                ).subscribe(applications=>{
                    applications.forEach(application=>{
                      let applicationData = JSON.parse(JSON.stringify(application));
                      let currentDesk = applicationData["currentAtDesk"];   
                      if(currentDesk.toString() == GovernmentType.BANK){
                        console.log("userEmail :"+userEmail+"currentDesk: "+currentDesk);
                        let bankApprovalObject = new BankDataModel(applicationData["schemeTitle"],applicationData["schemeFund"],applicationData["finalAmount"],applicationData["applicationId"],applicationData["nonce"],applicationData["userEmail"]);
                        approvalList.push(bankApprovalObject);
                      }
                    })
                })
                })
              })
              resolve(approvalList);
              })
    }

    async approveApplication(userEmail:string,applicationId:string,applicationUpdateMap:any,operationUpdateMap:any):Promise<boolean>{
        return new Promise(async (resolve)=>{
          let currentOperationLogsCount = -1;
          console.log("Application Data Map:"+JSON.stringify(applicationUpdateMap));
          await this.firestore.collection('Users').doc(userEmail.toString()).collection("applications").doc(applicationId.toString()).update(applicationUpdateMap).then(async val=>{
            console.log("Updated Application Data");
            const unsubscribe$ = new Subject<void>();
            this.firestore.collection('Users').doc(userEmail.toString()).collection("applications").doc(applicationId.toString()).collection("operationLog").get().pipe(
              takeUntil(unsubscribe$)
            ) .subscribe(
              async operationLogs=>{
                console.log("Current OperationsLog length:"+operationLogs.docs.length);
                currentOperationLogsCount = operationLogs.docs.length+1;
                console.log("Updated OperationsLog length:"+currentOperationLogsCount);
                let operationLogData = await this.getOperationLogData(userEmail,applicationId,(operationLogs.docs.length).toString());
                // console.log("LAST OPERATION DATA: "+operationLogData);
                let operationJSON = JSON.parse(operationLogData);
                operationUpdateMap["prevHash"] = operationJSON["currentHash"];
                operationUpdateMap["blockNonce"] = operationJSON["blockNonce"];
                let timeStamp = this.getCurrentDate();
                operationUpdateMap["timeStamp"] = timeStamp;
                operationUpdateMap["operationId"] = currentOperationLogsCount;
                let inputString = ""+operationJSON["blockNonce"]+","+operationJSON["currentHash"]+","+timeStamp+","+operationUpdateMap["operation"]+","+operationUpdateMap["from"]+","+operationUpdateMap["to"]
                let currentHash = this.computeOperationHash(inputString);              
                operationUpdateMap["currentHash"]= currentHash;
                console.log(JSON.stringify(operationUpdateMap));
                this.updateOperationLog(userEmail,applicationId,currentOperationLogsCount,operationUpdateMap);
              }
            ) 
          });
          
          resolve(true);
        });
    } 

    async updateOperationLog(userEmail:string,applicationId:string,operationId:number,operationUpdateMap:any){
      await this.firestore.collection('Users').doc(userEmail.toString()).collection("applications").doc(applicationId.toString()).collection("operationLog").doc(operationId.toString()).set(operationUpdateMap).then(operationUpdated=>{
        console.log("Updated Operation Log Data")
      });
    }

    async getOperationLogData(userEmail:string,applicationID:string,lastOperationId:string):Promise<string>{
      return new Promise((resolve) => {
        const operationDocData = this.firestore.collection('Users').doc(userEmail.toString()).collection("applications").doc(applicationID.toString()).collection("operationLog").doc(lastOperationId).get();
          operationDocData.subscribe(docData=>{
            resolve(JSON.stringify(docData.data()));
          })
      });
    }

    async rejectApplication(userEmail:string,applicationId:string,applicationUpdateMap:any,operationUpdateMap:any):Promise<boolean>{
      return new Promise(async (resolve)=>{
        let currentOperationLogsCount = -1;
        await this.firestore.collection('Users').doc(userEmail.toString()).collection("applications").doc(applicationId.toString()).update(applicationUpdateMap).then(async val=>{
          console.log("Updated Application Data");
          const unsubscribe$ = new Subject<void>();
          this.firestore.collection('Users').doc(userEmail.toString()).collection("applications").doc(applicationId.toString()).collection("operationLog").get().pipe(
            takeUntil(unsubscribe$)
          ) .subscribe(
            async operationLogs=>{
              console.log("Current OperationsLog length:"+operationLogs.docs.length);
              currentOperationLogsCount = operationLogs.docs.length+1;
              console.log("Updated OperationsLog length:"+currentOperationLogsCount);
              let operationLogData = await this.getOperationLogData(userEmail,applicationId,(operationLogs.docs.length).toString());
              // console.log("LAST OPERATION DATA: "+operationLogData);
              let operationJSON = JSON.parse(operationLogData);
              operationUpdateMap["prevHash"] = operationJSON["currentHash"];
              operationUpdateMap["blockNonce"] = operationJSON["blockNonce"];
              let timeStamp = this.getCurrentDate();
              operationUpdateMap["timeStamp"] = timeStamp;
              operationUpdateMap["operationId"] = currentOperationLogsCount;
              let inputString = ""+operationJSON["blockNonce"]+","+operationJSON["currentHash"]+","+timeStamp+","+operationUpdateMap["operation"]+","+operationUpdateMap["from"]+","+operationUpdateMap["to"]
              let currentHash = this.computeOperationHash(inputString);              
              operationUpdateMap["currentHash"]= currentHash;
              console.log(JSON.stringify(operationUpdateMap));
              this.updateOperationLog(userEmail,applicationId,currentOperationLogsCount,operationUpdateMap);
            }
          ) 
        });
        
        resolve(true);
      });
  } 

    async getApplicationData(userEmail:string,applicationID:string):Promise<any>{
      return new Promise((resolve) => {
        const applicationDocData = this.firestore.collection('Users').doc(userEmail.toString()).collection("applications").doc(applicationID.toString()).get();
        console.log("applicationData: "+applicationDocData);
        const unsubscribe$ = new Subject<void>();
        applicationDocData.pipe(
          takeUntil(unsubscribe$)
        ).subscribe(docData=>{
          console.log("data"+docData.data());
          resolve(JSON.stringify(docData.data()));
        })
      });
    }

    async getApplicationDocuments(userEmail:string,applicationID:string):Promise<any[]>{
      return new Promise(async (resolve) => {
      try{
      const unsubscribe$ = new Subject<void>();
      let documentUrlist:{ [key: string]: any }[] = [];
      let documentUrlMap: { [key: string]: any } = {};

      await this.firestore.collection('Users').doc(userEmail.toString()).collection("applications").doc(applicationID.toString()).collection("docs").get().pipe(
            takeUntil(unsubscribe$)
        ).subscribe(documentsObj=>{
          documentsObj.forEach(document=>{
            let documentType:string = document.id.toString();
            documentUrlMap = {};
            documentUrlMap[documentType] = JSON.parse(JSON.stringify(document.data()))["filePath"]; 
            console.log("UpdateMap:"+JSON.stringify(documentUrlMap));
            documentUrlist.push(documentUrlMap);
          })
          resolve(documentUrlist);
        });
        
      }
        catch (error) {
          // Code to handle the error
          console.error("An error occurred:", error);
          resolve([]);
        }
      });
      }
    


    getCircularReplacer = () => {
      const seen = new WeakSet();
      return (key:string, value:any) => {
        if (typeof value === "object" && value !== null) {
          if (seen.has(value)) {
            return;
          }
          seen.add(value);
        }
        return value;
      };
    };

  }


  // downloadFile(filePath: string): void {
  //   const fileRef = this.storage.ref(filePath);

  //   fileRef.getDownloadURL().subscribe(url => {
  //     const anchor = document.createElement('a');
  //     anchor.href = url;
  //     anchor.download = filePath; 
  //     anchor.target = "_blank"; // Open the download in new tab to avoid navigating from the current page
  //     anchor.click();
  //   });
  // }  