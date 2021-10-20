import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ISiteandWfProps {
  description: string;
  context: WebPartContext;
  item: any;
  itemID: any;
}

export interface ISiteandWfState {
  defaultSubmitter: string,
  refresh: string,
  attachedFiles: any[],
  userType: boolean,
  dptOther: boolean,
  multiValue: any[];
  selectedmultiValue: any[];
  WSrequired: boolean;
  MRrequired: boolean;
  EmployeeContractororonbehalfoffa: string;
  PurposeifOther: boolean;
  covidStatus: string;
  DisLineMrg: boolean;
  mrDisabled: boolean;
  saveDisable:boolean;
  subDisable:boolean;
}

