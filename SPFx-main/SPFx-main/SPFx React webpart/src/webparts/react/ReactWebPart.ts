import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ReactWebPartStrings';
import ReactTest from './components/React';
import { IReactProps } from './components/IReactProps';

export interface IReactWebPartProps {
  description: string;
  mytest:string;
}

export default class ReactWebPart extends BaseClientSideWebPart <IReactWebPartProps>{

  public render(): void {
    const element: React.ReactElement<IReactProps> = React.createElement(
      ReactTest,
      {
        description1: this.properties.description,
        mytest1:this.properties.mytest
      }
    );
    ReactDom.render(element,this.domElement)

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('mytest', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
