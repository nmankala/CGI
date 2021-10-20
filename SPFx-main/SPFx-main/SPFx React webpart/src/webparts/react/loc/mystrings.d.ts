declare interface IReactWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'ReactWebPartStrings' {
  const strings: IReactWebPartStrings;
  export = strings;
}
