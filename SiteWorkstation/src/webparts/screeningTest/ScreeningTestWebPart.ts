import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ScreeningTestWebPartStrings';
import ScreeningTest from './components/ScreeningTest';
import { IScreeningTestProps } from './components/IScreeningTestProps';

import { SPHttpClient } from '@microsoft/sp-http';
import ScreeningTestview from './components/ScreeningView';


export interface IScreeningTestWebPartProps {
  description: string;
}

export default class ScreeningTestWebPart extends BaseClientSideWebPart<IScreeningTestWebPartProps> {

  public render(): void {
    debugger;
    let ID = this.getParameterByName('MyID');
    
    if (ID != null) {
      this.getSelectedItem("Site Access Request Form", ID).then(data => {
        console.log(data);
        
        const element: React.ReactElement<IScreeningTestProps> = React.createElement(
          ScreeningTestview,
          {
            description: this.properties.description,
            context: this.context,
            item: data,
            itemID: ID
          }
        );

        ReactDom.render(element, this.domElement);
      });
    }
    else {
      const element: React.ReactElement<IScreeningTestProps> = React.createElement(
        ScreeningTest,
        {
          description: this.properties.description,
          context: this.context,
          item: {},
          itemID: null
        }
      );

      ReactDom.render(element, this.domElement);
    }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
  protected getSelectedItem(listName: string, Id: any): Promise<any> {
    debugger;
    return new Promise<any>((resolve, reject) => {
      this.context.spHttpClient.get(this.context.pageContext.web.serverRelativeUrl + "/_api/web/lists/getbytitle('" + listName + "')/items(" + Id + ")", SPHttpClient.configurations.v1).then(response => {
        response.json().then((result: any) => {
          let jobTitles = result;
          console.log(jobTitles);
          resolve(jobTitles);

        });
      });
    });
  }


  public getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
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
