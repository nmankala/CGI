import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ILandingPageProps {
  description: string;
  context: WebPartContext;
}

export interface ILandingPageState{
  refresh:string;
  buttonstate:string;
}
