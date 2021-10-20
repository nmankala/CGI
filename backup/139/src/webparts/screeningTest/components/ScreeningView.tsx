import * as React from 'react';
import styles from './ScreeningTest.module.scss';
import { IScreeningTestProps } from './IScreeningTestProps';
import { IScreeningViewState } from './IScreeningTestProps'
import { escape } from '@microsoft/sp-lodash-subset';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { TooltipHost } from '@fluentui/react/lib/Tooltip';
import { TextField, MaskedTextField } from '@fluentui/react/lib/TextField';
import { Icon } from '@fluentui/react/lib/Icon';
import { SPHttpClient } from '@microsoft/sp-http';
import "bootstrap/dist/css/bootstrap.min.css";
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';
import { sp } from '@pnp/sp';

const options: IChoiceGroupOption[] = [
  { key: 'true', text: 'Yes' },
  { key: 'false', text: 'No' },

];

export default class ScreeningTestview extends React.Component<IScreeningTestProps, IScreeningViewState> {
  constructor(props: IScreeningTestProps, state: IScreeningViewState) {
    super(props);
    console.log(this.props.item)
    this.state={
      status:this.props.item["Status"],
      disable:false,
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

    ///bind methods
    this.check=this.check.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onChange1 = this._onChange1.bind(this);
    this.saveItem = this.saveItem.bind(this);

  }
  public render(): React.ReactElement<IScreeningTestProps> {
 
    return (
      
      <div className={"container"}>
         <div className={"row"}>
           
           <div style={{ marginTop: '10px', height: '50px', textAlign: 'center', fontWeight: 'bold', padding: '12px', background: 'aliceblue' }} className={"col-lg-12 col-md-12 col-sm-12"}>COVID-19 PRE-SCREENING QUESTIONNAIRE</div>

            < div style={{ marginTop: '10px' }} className={"col-lg-12 col-md-12 col-sm-12"}>
              <ChoiceGroup defaultSelectedKey={this.check("Fever") ? "true" : "false"} options={options} onChange={(event,checked)=>{this._onChange1("Fever",checked)}} label="Fever >37.0 C" required={true} disabled={this.state.disable}/>
              
            </div>
            < div style={{ marginTop: '10px' }} className={"col-lg-12 col-md-12 col-sm-12"}>
              <ChoiceGroup defaultSelectedKey={this.check("Sf") ? "true" : "false"} options={options} onChange={(event,checked)=>{this._onChange1("Sf",checked)}} label="Subjective fever (felt feverish)" required={true} disabled={this.state.disable}/>
              {/*<Toggle label="Subjective fever (felt feverish)" defaultChecked={this.check("Sf") ? true : false} disabled={this.state.disable}  onChange={(event,checked)=>{this._onChange("Sf",checked)}} onText="Yes" offText="No" /> */}
            </div>
            < div style={{ marginTop: '10px' }} className={"col-lg-12 col-md-12 col-sm-12"}>
              <ChoiceGroup defaultSelectedKey={this.check("Sof") ? "true" : "false"} options={options} onChange={(event,checked)=>{this._onChange1("Sof",checked)}} label="Shortness of breath or difficulty breathing" required={true} disabled={this.state.disable}/>
             {/* <Toggle label="Shortness of breath or difficulty breathing" defaultChecked={this.check("Sof") ? true : false} disabled={this.state.disable} onChange={(event,checked)=>{this._onChange("Sof",checked)}} onText="Yes" offText="No"  />
            </div>
            < div style={{ marginTop: '10px' }} className={"col-lg-12 col-md-12 col-sm-12"}>
              <ChoiceGroup defaultSelectedKey={this.check("Crc") ? "true" : "false"} options={options} onChange={(event,checked)=>{this._onChange1("Crc",checked)}} label="Congestion, runny nose or Cough (new or chronic cough worsens" required={true} disabled={this.state.disable}/>
             {/* <Toggle label="Congestion, runny nose or Cough (new or chronic cough worsens" defaultChecked={this.check("Crc") ? true : false} disabled={this.state.disable} onChange={(event,checked)=>{this._onChange("Crc",checked)}} onText="Yes" offText="No"  /> */}
            </div>
            < div style={{ marginTop: '10px' }} className={"col-lg-12 col-md-12 col-sm-12"}>
              <ChoiceGroup defaultSelectedKey={this.check("Chills") ? "true" : "false"} options={options} onChange={(event,checked)=>{this._onChange1("Chills",checked)}} label="Chills" required={true} disabled={this.state.disable}/>
              {/*<Toggle label="Chills" defaultChecked={this.check("Chills") ? true : false} disabled={this.state.disable} onChange={(event,checked)=>{this._onChange("Chills",checked)}} onText="Yes" offText="No"  /> */}
            </div>
            <div style={{ marginTop: '10px' }} className={"col-lg-12 col-md-12 col-sm-12"}>
              <ChoiceGroup defaultSelectedKey={this.check("Nvd") ? "true" : "false"} options={options} onChange={(event,checked)=>{this._onChange1("Nvd",checked)}} label="Nausea, Vomiting, Diarrhea" required={true} disabled={this.state.disable}/>
              {/*<Toggle label="Nausea, Vomiting, Diarrhea" defaultChecked={this.check("Nvd") ? true : false} disabled={this.state.disable} onChange={(event,checked)=>{this._onChange("Nvd",checked)}} onText="Yes" offText="No" /> */}
            </div>
            < div style={{ marginTop: '10px' }} className={"col-lg-12 col-md-12 col-sm-12"}>
              <ChoiceGroup defaultSelectedKey={this.check("Ma") ? "true" : "false"} options={options} onChange={(event,checked)=>{this._onChange1("Ma",checked)}} label="Muscle aches (myalgias)" required={true} disabled={this.state.disable}/>
              {/*<Toggle label="Muscle aches (myalgias)" defaultChecked={this.check("Ma") ? true : false} disabled={this.state.disable} onChange={(event,checked)=>{this._onChange("Ma",checked)}} onText="Yes" offText="No" /> */}
            </div>
            < div style={{ marginTop: '10px' }} className={"col-lg-12 col-md-12 col-sm-12"}>
              <ChoiceGroup defaultSelectedKey={this.check("Headache") ? "true" : "false"} options={options} onChange={(event,checked)=>{this._onChange1("Headache",checked)}} label="Headache" required={true} disabled={this.state.disable}/>
             {/* <Toggle label="Headache" defaultChecked={this.check("Headache") ? true : false} disabled={this.state.disable} onChange={(event,checked)=>{this._onChange("Headache",checked)}} onText="Yes" offText="No" /> */}
            </div>
            < div style={{ marginTop: '10px' }} className={"col-lg-12 col-md-12 col-sm-12"}>
              <ChoiceGroup defaultSelectedKey={this.check("St") ? "true" : "false"} options={options} onChange={(event,checked)=>{this._onChange1("St",checked)}} label="Sore Throat" required={true} disabled={this.state.disable}/>
              {/*<Toggle label="Sore Throat" defaultChecked={this.check("St") ? true : false} disabled={this.state.disable} onChange={(event,checked)=>{this._onChange("St",checked)}} onText="Yes" offText="No" /> */}
            </div>
            < div style={{ marginTop: '10px' }} className={"col-lg-12 col-md-12 col-sm-12"}>
              <ChoiceGroup defaultSelectedKey={this.check("Nlt") ? "true" : "false"} options={options} onChange={(event,checked)=>{this._onChange1("Nlt",checked)}} label="New loss of taste or smell" required={true} disabled={this.state.disable}/>
              {/*<Toggle label="New loss of taste or smell" defaultChecked={this.check("Nlt") ? true : false} disabled={this.state.disable} onChange={(event,checked)=>{this._onChange("Nlt",checked)}} onText="Yes" offText="No"  /> */}
            </div>
            <div style={{ marginTop: '10px', height: '50px', textAlign: 'left', fontWeight: 'bold', padding: '12px', background: 'aliceblue' }} >In the last 14 days before symptom(s) onset, did the employee (suspected case) … </div>
            < div className={"col-lg-12 col-md-12 col-sm-12"}>
              <ChoiceGroup defaultSelectedKey={this.check("one") ? "true" : "false"} options={options} onChange={(event,checked)=>{this._onChange1("one",checked)}} label="1. Have close contact* with any suspected or confirmed COVID-19 case?" required={true} disabled={this.state.disable}/>
             {/* <Toggle label="1. Have close contact* with any suspected or confirmed COVID-19 case?" defaultChecked={this.check("one") ? true : false} disabled={this.state.disable} onChange={(event,checked)=>{this._onChange("one",checked)}} onText="Yes" offText="No" /> */}
            </div>
            < div style={{ marginTop: '10px' }} className={"col-lg-12 col-md-12 col-sm-12"}>
              <ChoiceGroup defaultSelectedKey={this.check("two") ? "true" : "false"} options={options} onChange={(event,checked)=>{this._onChange1("two",checked)}} label="2. Travel to the US and/or to a Community with high COVID-19 incidence rate?" required={true} disabled={this.state.disable}/>
             {/* <Toggle label="2. Travel to the US and/or to a Community with high COVID-19 incidence rate?" defaultChecked={this.check("two") ? true : false} disabled={this.state.disable} onChange={(event,checked)=>{this._onChange("two",checked)}} onText="Yes" offText="No" /> */}
            </div>
            < div style={{ marginTop: '10px' }} className={"col-lg-12 col-md-12 col-sm-12"}>
              <ChoiceGroup defaultSelectedKey={this.check("three") ? "true" : "false"} options={options} onChange={(event,checked)=>{this._onChange1("three",checked)}} label="3.  Have any family members returned from the US or UK or any other country with a high C19 rate and is currently staying at your location." required={true} disabled={this.state.disable}/>
             {/* <Toggle label="3.  Have any family members returned from the US or UK or any other country with a high C19 rate and is currently staying at your location." defaultChecked={this.check("three") ? true : false} onChange={(event,checked)=>{this._onChange("three",checked)}} disabled={this.state.disable} onText="Yes" offText="No"  /> */}
            </div>
            <div style={{ marginTop: '10px' }} className={"row col-lg-12 col-md-12 col-sm-12"}>
                <span className={"col-lg-6 col-md-6 col-sm-12"}>Status</span>
                <TextField className={"col-lg-6 col-md-6 col-sm-12"} id="Status" value={this.props.item["Status"]} disabled={true}/>
          </div>

            <div style={{ margin: '30px auto' }} className={"row col-lg-10 col-md-10 col-sm-12"}>
                <span>
                <DefaultButton className={"col-lg-5 col-md-5 col-sm-12"} style={{margin:'10px'}}  text="Submit" onClick={this.saveItem} allowDisabledFocus disabled={this.state.disable}/>  
                <DefaultButton className={"col-lg-5 col-md-5 col-sm-12"} style={{margin:'10px'}} text="Cancel" allowDisabledFocus />
                 </span>
                
                
                
            </div>
          </div>
      </div>
    );
  }

public check(st:string):boolean{
  
    if(this.props.item[st]=="true")
        return true;
    else if(this.props.item[st]=="false")
        return false;
    else{
      this.props.item[st]="false"
      return false;
    }
}

public saveItem() {
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
    

  if (this.props.itemID != null) {
    debugger;
 
    if(flag==true){
      this.props.item["Status"]="Pending"
    }
    else{
      this.props.item["Status"]="Pass"
    }
      
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
        if(response.status==200){
          this.setState({disable:true})
        }
      });
  }
  else {
    
  }
}


public _onChange(ev, checked?: boolean) {
 
  let state = {};
  if(checked == true){
    state[ev] = "true";
  
    this.props.item[ev] = "true";
  }
  else{
    state[ev] = "false";
    this.props.item[ev] = "false";
  }
  this.setState(state);
 
}
public _onChange1(ev,check){

  let state = {};
  if(check.key == "true"){
    state[ev] = "true";
  
    this.props.item[ev] = "true";
  }
  else{
    state[ev] = "false";
    this.props.item[ev] = "false";
  }
  this.setState(state);
}

public componentDidMount(){
  debugger;
  console.log(this.state.status)
  if(this.state.status=="Not Started"){
    this.setState({disable:false});
  }
  else
    this.setState({disable:true})
}


}
