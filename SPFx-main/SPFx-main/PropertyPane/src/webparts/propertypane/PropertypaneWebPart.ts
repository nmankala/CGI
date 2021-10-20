import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './PropertypaneWebPart.module.scss';
import * as strings from 'PropertypaneWebPartStrings';

export interface IPropertypaneWebPartProps {
  description: string;
  yesorno:boolean;
}


export default class PropertypaneWebPart extends BaseClientSideWebPart <IPropertypaneWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.propertypane }">
    <div class="${ styles.container }">
      <div class="${ styles.row }">
        <div class="${ styles.column }">
          <span class="${ styles.title }">Welcome to SharePoint!</span>
  <p class="${ styles.subTitle }">Customize SharePoint experiences using Web Parts.</p>
    <p class="${ styles.description }">${escape(this.properties.description)}</p>
    <p class="${ styles.description }">${this.properties.yesorno}</p>
      <a href="https://aka.ms/spfx" class="${ styles.button }">
        <span class="${ styles.label }">Learn more</span>
          </a>
          </div>
          </div>
          </div>
          </div>`;
        
          
  }
  protected get disableReactivePropertyChanges():boolean{
    return true;
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
             PropertyPaneToggle('yesorno',{
              key:"yesorno",
              label:"YesOrNo",
              onText:"ISMVP",
              offText:"NoMVP"
             })
            ]
          }
        ]
      }
    ]
  };
}
}
