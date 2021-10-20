import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IScreeningTestProps {
  description: string;
  context: WebPartContext;
  item: any;
  itemID: any;
}

export interface IScreeningTestState {

  Fever:string,
  Sf:string,
  Sof:string,
  Crc:string,
  Chills:string,
  Nvd:string,
  Ma:string,
  Headache:string,
  St:string,
  Nlt:string,
  one:string,
  two:string,
  three:string,
  
}
export interface IScreeningViewState {

status:string,
disable:boolean,
Fever:string,
Sf:string,
Sof:string,
Crc:string,
Chills:string,
Nvd:string,
Ma:string,
Headache:string,
St:string,
Nlt:string,
one:string,
two:string,
three:string,
  
}