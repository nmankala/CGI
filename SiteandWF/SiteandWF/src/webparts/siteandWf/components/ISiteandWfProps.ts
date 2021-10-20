import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ISiteandWfProps {
  description: string;
  context: WebPartContext;
  item: any;
  itemID: any;
}

export interface ISiteandWfState {
  defaultSubmitter: string,
  refresh: string
}

