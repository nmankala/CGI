import * as React from 'react';
import styles from './Officefabric.module.scss';
import { IOfficefabricProps } from './IOfficefabricProps';
import { escape } from '@microsoft/sp-lodash-subset';

import {IComponentState} from './ITextState';
import { TextField } from 'office-ui-fabric-react/lib/TextField';  
import { IButtonProps, DefaultButton } from 'office-ui-fabric-react/lib/Button';  
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 },
};
const options: IDropdownOption[] = [
  { key: 'fruitsHeader', text: 'Fruits', itemType: DropdownMenuItemType.Header },
  { key: 'apple', text: 'Apple' },
  { key: 'banana', text: 'Banana' },
  { key: 'orange', text: 'Orange', disabled: true },
  { key: 'grape', text: 'Grape' },
  { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
  { key: 'vegetablesHeader', text: 'Vegetables', itemType: DropdownMenuItemType.Header },
  { key: 'broccoli', text: 'Broccoli' },
  { key: 'carrot', text: 'Carrot' },
  { key: 'lettuce', text: 'Lettuce' },
];

export default class Officefabric extends React.Component<IOfficefabricProps, IComponentState> {
constructor(props:IOfficefabricProps,state:IComponentState){
super(props);
this.state=({userName:''}); 
}

  public render(): React.ReactElement<IOfficefabricProps> {
    return (
      <div className={ styles.officefabric }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <TextField required={true} name="txtuserName" value={this.state.userName} onChange={(ev,value:string)=> this.setState({userName:value})}/>
              <DefaultButton  
                  data-automation-id="greet"  
                  target="_blank"  
                  title="Greet the user!"  
                  onClick={this._greetClicked}  
                  >  
                  Greet  
                </DefaultButton>  
                <Dropdown
        placeholder="Select an option"
        label="Basic uncontrolled example"
        options={options}
        styles={dropdownStyles}
      />
            </div>
          </div>
        </div>
      </div>
    );
  }
@autobind
  private _greetClicked(){
    alert('Hello ' + this.state.userName);   
  }
}
