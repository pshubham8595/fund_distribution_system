export enum OperationLog{

    APPROVED_BY_ADMIN = "APPROVEDByAdmin: Transfered to State",
    REJECTED_BY_ADMIN = "REJECTEDByAdmin: No further transfer",

    APPROVED_BY_STATE = "APPROVEDByState: Transfered to District",
    REJECTED_BY_STATE = "REJECTEDByState: No further transfer",

    APPROVED_BY_DISTRICT = "APPROVEDByDistrict: Transfered to Bank",
    REJECTED_BY_DISTRICT = "REJECTEDByDistrict: No further transfer",

    APPROVED_BY_BANK = "APPROVEDByBank: Transfered to User's Bank account",
    REJECTED_BY_BANK = "REJECTEDByBank: No further transfer",
}