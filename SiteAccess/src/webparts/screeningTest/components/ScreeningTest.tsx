import * as React from 'react';
import styles from './ScreeningTest.module.scss';
import { IScreeningTestProps } from './IScreeningTestProps';
import { IScreeningTestState } from './IScreeningTestProps'
import { escape } from '@microsoft/sp-lodash-subset';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { TooltipHost } from '@fluentui/react/lib/Tooltip';
import { TextField, MaskedTextField } from '@fluentui/react/lib/TextField';
import { Icon } from '@fluentui/react/lib/Icon';
import { SPHttpClient } from '@microsoft/sp-http';
import "bootstrap/dist/css/bootstrap.min.css";
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';

export default class ScreeningTest extends React.Component<IScreeningTestProps, IScreeningTestState> {
  constructor(props: IScreeningTestProps, state: IScreeningTestState) {
    super(props);
    this.state = {
   
      Fever:"false",
      Sf:"false",
      Sof:"false",
      Crc:"false",
      Chills:"false",
      Nvd:"false",
      Ma:"false",
      Headache:"false",
      St:"false",
      Nlt:"false",
      one:"false",
      two:"false",
      three:"false",
 
    }

    //Bind Methods
    this._onChange = this._onChange.bind(this);
   
    this.saveItem = this.saveItem.bind(this);
    this.submitItem = this.submitItem.bind(this);
    this.resetItem = this.resetItem.bind(this);
    this.check=this.check.bind(this)
  }
  public render(): React.ReactElement<IScreeningTestProps> {
    console.log(this.state);
    let check=this.check();
    return (
      
      <div className={"container"}>
         <div className={"row"}>
           <h2 >COVID-19 PRE-SCREENING QUESTIONNAIRE</h2>
            < div className={"col-lg-12 col-md-12 col-sm-12"}>
              <Toggle label="Fever >37.0 C" defaultChecked={false} onText="Yes" offText="No" onChange={(event,checked)=>{this._onChange("Fever",checked)}}/>
            </div>
            < div className={"col-lg-12 col-md-12 col-sm-12"}>
              <Toggle label="Subjective fever (felt feverish)" defaultChecked={false} onText="Yes" offText="No" onChange={(event,checked)=>{this._onChange("Sf",checked)}} />
            </div>
            < div className={"col-lg-12 col-md-12 col-sm-12"}>
              <Toggle label="Shortness of breath or difficulty breathing" defaultChecked={false} onText="Yes" offText="No" onChange={(event,checked)=>{this._onChange("Sof",checked)}} />
            </div>
            < div className={"col-lg-12 col-md-12 col-sm-12"}>
              <Toggle label="Congestion, runny nose or Cough (new or chronic cough worsens" defaultChecked={false} onText="Yes" offText="No" onChange={(event,checked)=>{this._onChange("Crc",checked)}} />
            </div>
            < div className={"col-lg-12 col-md-12 col-sm-12"}>
              <Toggle label="Chills" defaultChecked={false} onText="Yes" offText="No" onChange={(event,checked)=>{this._onChange("Chills",checked)}} />
            </div>
            < div className={"col-lg-12 col-md-12 col-sm-12"}>
              <Toggle label="Nausea, Vomiting, Diarrhea" defaultChecked={false} onText="Yes" offText="No" onChange={(event,checked)=>{this._onChange("Nvd",checked)}} />
            </div>
            < div className={"col-lg-12 col-md-12 col-sm-12"}>
              <Toggle label="Muscle aches (myalgias)" defaultChecked={false} onText="Yes" offText="No" onChange={(event,checked)=>{this._onChange("Ma",checked)}} />
            </div>
            < div className={"col-lg-12 col-md-12 col-sm-12"}>
              <Toggle label="Headache" defaultChecked={false} onText="Yes" offText="No" onChange={(event,checked)=>{this._onChange("Headache",checked)}} />
            </div>
            < div className={"col-lg-12 col-md-12 col-sm-12"}>
              <Toggle label="Sore Throat" defaultChecked={false} onText="Yes" offText="No" onChange={(event,checked)=>{this._onChange("St",checked)}} />
            </div>
            < div className={"col-lg-12 col-md-12 col-sm-12"}>
              <Toggle label="New loss of taste or smell" defaultChecked={false} onText="Yes" offText="No" onChange={(event,checked)=>{this._onChange("Nlt",checked)}} />
            </div>
            <h2 >In the last 14 days before symptom(s) onset, did the employee (suspected case) … </h2>
            < div className={"col-lg-12 col-md-12 col-sm-12"}>
              <Toggle label="1. Have close contact* with any suspected or confirmed COVID-19 case?" defaultChecked={false} onText="Yes" offText="No" onChange={(event,checked)=>{this._onChange("one",checked)}} />
            </div>
            < div className={"col-lg-12 col-md-12 col-sm-12"}>
              <Toggle label="2. Travel to the US and/or to a Community with high COVID-19 incidence rate?" defaultChecked={false} onText="Yes" offText="No"onChange={(event,checked)=>{this._onChange("two",checked)}} />
            </div>
            < div className={"col-lg-12 col-md-12 col-sm-12"}>
              <Toggle label="3.  Have any family members returned from the US or UK or any other country with a high C19 rate and is currently staying at your location." defaultChecked={false} onText="Yes" offText="No" onChange={(event,checked)=>{this._onChange("three",checked)}} />
            </div>
            <div className={"row col-lg-12 col-md-12 col-sm-12"}>
                <span className={"col-lg-6 col-md-6 col-sm-12"}>Status</span>
                <TextField className={"col-lg-6 col-md-6 col-sm-12"} id="Status" value={check==true ? "Pending":"Pass"} disabled={true}/>
          </div>

            <div className={"row col-lg-12 col-md-12 col-sm-12"}>

                <DefaultButton className={"col-lg-6 col-md-6 col-sm-12"} text="Save" onClick={this.submitItem} allowDisabledFocus />   
                <DefaultButton className={"col-lg-6 col-md-6 col-sm-12"} text="Reset" onClick={this.resetItem} allowDisabledFocus />
            </div>
          </div>
      </div>
    );
  }

  public saveItem() {
    if (this.props.itemID != null) {
      debugger;
      
      const body: string = JSON.stringify(this.props.item);
      this.props.context.spHttpClient.post(this.props.context.pageContext.web.absoluteUrl + "/_api/web/lists/getbytitle('Site Access Request Form')/items(" + this.props.itemID + ")", SPHttpClient.configurations.v1,
        {
          headers: {
            'X-HTTP-Method': 'MERGE',
            'IF-Match': '*'
          },
          body: body
        }).then(response => {
          console.log(response);
        });
    }
    else {
      this.submitItem();
    }
  }

  public submitItem() {
    debugger;
    const Status=document.getElementById("Status")['value'];
    let b= {...this.state,Status}
    const body: string = JSON.stringify(b);

    this.props.context.spHttpClient.post(this.props.context.pageContext.web.absoluteUrl + "/_api/web/lists/getbytitle('Site Access Request Form')/items", SPHttpClient.configurations.v1,
      {
        headers: {
          'Accept': 'application/json;odata=nometadata',
          'Content-type': 'application/json;odata=nometadata',
          'odata-version': ''
        },
        body: body
      }).then(response => {
        console.log(response);
      });
  }
  public check():boolean{
    let flag = false;
    
    if(this.state.Chills=="true")
      flag=true;
    else if(this.state.Crc=="true")
      flag=true;
    else if(this.state.Fever=="true")
      flag=true;
    else if(this.state.Headache=="true")
      flag=true;
    else if(this.state.Ma=="true")
      flag=true;
    else if(this.state.Nlt=="true")
      flag=true;
    else if(this.state.Nvd=="true")
      flag=true;
    else if(this.state.Sf=="true")
      flag=true;
    else if(this.state.Sof=="true")
      flag=true;
    else if(this.state.St=="true")
      flag=true;
    else if(this.state.one=="true")
      flag=true;
    else if(this.state.two=="true")
      flag=true;
    else if(this.state.three=="true")
      flag=true;

  return flag;
  }
  public resetItem() {
    console.log(this.props);
    console.log(this.state);
    
  }

  public _onChange(ev, checked?: boolean) {
 
    let state = {};
    if(checked == true)
      state[ev] = "true";
    else
    state[ev] = "false";
    
    this.setState(state);
   
  }

}
