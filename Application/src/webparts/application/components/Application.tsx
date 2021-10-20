import * as React from 'react';

import styles from './Application.module.scss';
import { IApplicationProps } from './IApplicationProps';
import { escape } from '@microsoft/sp-lodash-subset';
import 'office-ui-fabric-react/dist/css/fabric.css';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import App from './main';
import {
  ComboBox,
  IComboBox,
  IComboBoxOption,
  IComboBoxStyles,
  SelectableOptionMenuItemType,
  PrimaryButton,
  IButtonStyles,
} from '@fluentui/react';



export default class Application extends React.Component<IApplicationProps, {}> {
  
  public render(): React.ReactElement<IApplicationProps> {
 
    const items = [
      { name: 'Home', url: '', key: 'key3' },
      { name: 'Admin', key: 'key4' }
    ];
    return (
      <div className="ms-Grid" dir="ltr">
        <CommandBar items={items} />
        <App webpartcontext={this.props.webpartcontext}/>
      </div>   

      
    );
  }
}
