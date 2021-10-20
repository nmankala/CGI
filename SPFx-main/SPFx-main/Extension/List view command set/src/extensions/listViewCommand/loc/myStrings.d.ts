declare interface IListViewCommandCommandSetStrings {
  Command1: string;
  Command2: string;
}

declare module 'ListViewCommandCommandSetStrings' {
  const strings: IListViewCommandCommandSetStrings;
  export = strings;
}
