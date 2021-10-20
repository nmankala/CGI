import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version,Environment, EnvironmentType } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'DashWebPartStrings';
import Dash from './components/Dash';
import { IDashProps } from './components/IDashProps';
import SharePointService from './services/SharePoint/SharePointService';

export interface IDashWebPartProps {
  description: string;
}

export default class DashWebPart extends BaseClientSideWebPart<IDashWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IDashProps> = React.createElement(
      Dash,
      {
        description: this.properties.description,
        listId:'7836df75-2189-4756-ba66-6b00b369ee5e'
      }
    );

    ReactDom.render(element, this.domElement);
  }
  
  public onInit():Promise<void>{
    return super.onInit().then(()=>{
      SharePointService.setup(this.context, Environment.type);
    })
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
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
