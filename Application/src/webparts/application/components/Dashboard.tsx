import * as React from 'react';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { Nav, INavLink } from 'office-ui-fabric-react/lib/Nav';
import styles from './Application.module.scss';
import {
    ComboBox,
    IComboBox,
    IComboBoxOption,
    IComboBoxStyles,
    SelectableOptionMenuItemType,
    PrimaryButton,
    IButtonStyles,
    
  } from '@fluentui/react';
  const options: IComboBoxOption[] = [
  
    { key: 'Header1', text: 'First heading', itemType: SelectableOptionMenuItemType.Header },
    { key: 'A', text: 'Option A' },
    { key: 'B', text: 'Option B' },
    { key: 'C', text: 'Option C' },
    { key: 'D', text: 'Option D' },
    { key: 'divider', text: '-', itemType: SelectableOptionMenuItemType.Divider },
    { key: 'Header2', text: 'Second heading', itemType: SelectableOptionMenuItemType.Header },
    { key: 'E', text: 'Option E' },
    { key: 'F', text: 'Option F'},
    { key: 'G', text: 'Option G' },
    { key: 'H', text: 'Option H' },
    { key: 'I', text: 'Option I' },
    { key: 'J', text: 'Option J' },
  ];


  // Optional styling to make the example look nicer
  const comboBoxStyles: Partial<IComboBoxStyles> = { root: { maxWidth: 300 } };
  const buttonStyles: Partial<IButtonStyles> = { root: { display: 'block', margin: '10px 0 20px' } };

 const Dashboard=():JSX.Element=>{
        const countrylist=[{ key: 'India', text: 'India' },{ key: 'United Kingdom', text: 'UK' }];
        const ukList=[{ key: 'apple', text: 'Apple' },{ key: 'banana', text: 'Banana' }];
        const IndiaList= [{ key: 'broccoli', text: 'Broccoli' },{ key: 'carrot', text: 'Carrot' }]
        const [country, setCountry] = React.useState(null);
        const [langList, setLangList] = React.useState([]);
        const [lang, setLang] = React.useState(null);
        const dropdownvalu =[];
        const onOpenClick = (() =>alert(dropdownvalu));

        return(
            <React.Fragment>
            <div >
                    <span className={ styles.title }>Welcome to SharePoint!</span>
                    <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
                    <div>
                    <ComboBox
                    label="Basic multi-select ComboBox"
                    multiSelect
                    options={options}
                    styles={comboBoxStyles}
                    onChange={(e,selectedvalue)=>{
                        
                        if(selectedvalue.selected === true){
                            dropdownvalu.push(selectedvalue.text);
                        
                        }
                        else{
                            if(dropdownvalu.indexOf(selectedvalue.text)!==-1){
                                dropdownvalu.splice(dropdownvalu.indexOf(selectedvalue.text),1);
                            } 
                        }  
                    }}
                    />
                </div>
                    <PrimaryButton text="Button" onClick={onOpenClick} styles={buttonStyles} />
                    <Dropdown
                      placeholder="Select an option"
                      label="Country"
                      options={countrylist}
                      onChange={(e,selectedvalue)=>{
                        if(selectedvalue.text=="UK"){
                          setLangList(ukList);
                        }
                        else{
                          setLangList(IndiaList);
                        }
              
                      }}
                    />

                    <Dropdown
                      label="Fruit"
                      defaultSelectedKey=""
                      options={langList}
                    />
        </div>
        </React.Fragment>
        );
 
  }
  export default Dashboard;