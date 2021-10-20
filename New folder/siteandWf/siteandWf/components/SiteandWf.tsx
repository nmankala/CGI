import * as React from 'react';
import styles from './SiteandWf.module.scss';
import { ISiteandWfProps, ISiteandWfState } from './ISiteandWfProps';
import { escape } from '@microsoft/sp-lodash-subset';
import "bootstrap/dist/css/bootstrap.min.css";
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';
import { TextField, MaskedTextField } from '@fluentui/react/lib/TextField';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { SPHttpClient } from '@microsoft/sp-http';
// import { sp, Web } from "@pnp/sp";
import { sp } from "@pnp/sp";
import { Web } from "@pnp/sp/webs";
import "@pnp/sp/webs";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import { WebPartContext } from '@microsoft/sp-webpart-base';
import DateTimePicker from 'react-datetime-picker';
import date from 'date-and-time';
import * as moment from "moment-timezone";
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import MultiSelect from "react-multi-select-component";
import { Toggle } from '@fluentui/react/lib/Toggle';

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 },
};

const options: IChoiceGroupOption[] = [
  { key: "Requestor", text: "Requestor" },
  { key: "Contractor", text: "Contractor" },
  { key: 'Visitor', text: 'Visitor' },
];

export default class SiteandWf extends React.Component<ISiteandWfProps, ISiteandWfState> {
  constructor(props: ISiteandWfProps, state: ISiteandWfState) {
    super(props);
    if (this.props.itemID != null) {
      this.state = {
        defaultSubmitter: "",
        refresh: "no",
        attachedFiles: [],
        userType: true,
        dptOther: false,
        multiValue: [{ label: "", value: "" }],
        selectedmultiValue: [],
        WSrequired: (this.props.item.WSrequired == "true"),
        MRrequired: (this.props.item.MRrequired == "true"),
        EmployeeContractororonbehalfoffa: this.props.item.EmployeeContractororonbehalfoffa,
        PurposeifOther: this.props.item.PurposeifOther,
        covidStatus: this.props.item.Status,
        DisLineMrg: (this.props.item.DisLineMrg == "true"),
        mrDisabled: true,
        saveDisable: (this.props.item.FormStatus != "Draft"),
        subDisable: (this.props.item.FormStatus == "Submit")
      }
    }
    else {
      this.state = {
        defaultSubmitter: "",
        refresh: "no",
        attachedFiles: [],
        userType: true,
        dptOther: false,
        multiValue: [{ label: "", value: "" }],
        selectedmultiValue: [],
        WSrequired: false,
        MRrequired: false,
        EmployeeContractororonbehalfoffa: "",
        PurposeifOther: false,
        covidStatus: "Not Started",
        DisLineMrg: false,
        mrDisabled: true,
        saveDisable: false,
        subDisable: false
      }
    }
    // this.dropDownValues["ReasonPurposeforsiteaccess"] = [{ label: "", value: "" }]
    this._onChange = this._onChange.bind(this);
    this._ondatechange = this._ondatechange.bind(this);
    // this.saveItem = this.saveItem.bind(this);
    this.submitItem = this.submitItem.bind(this);
    this.resetItem = this.resetItem.bind(this);
    this.checkavailablity = this.checkavailablity.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.toggleChange = this.toggleChange.bind(this);
    this.CovidScreen = this.CovidScreen.bind(this);


    // if (this.props.itemID == null) {
    //   this.props.item["DaterequestingsiteaccessTo"] = new Date();
    //   this.props.item["Daterequestingsiteaccessfrom"] = new Date();
    //   this.props.item["Meeting_x0020_Room_x0020_EndT"] = new Date();
    //   this.props.item["Meeting_x0020_Room_x0020_StartT"] = new Date();
    // }
  }


  public _input: any = null;
  public render(): React.ReactElement<ISiteandWfProps> {
    //debugger;


    return (
      <div className={"container"}>
        <div className={"row"}>
          <div style={{ marginTop: '10px', height: '50px', textAlign: 'center', fontWeight: 'bold', padding: '12px', background: 'aliceblue' }} className={"col-lg-12 col-md-12 col-sm-12"}>GENERAL INFO</div>
          <div className={"row col-lg-12 col-md-12 col-sm-12"}>
            <span className={"col-lg-6 col-md-6 col-sm-12"}>USER</span>
            <ChoiceGroup className={"col-lg-6 col-md-6 col-sm-12"} selectedKey={this.state.EmployeeContractororonbehalfoffa} options={options} onChange={this._onChange} />
          </div>
          <div style={{ marginTop: '10px' }} className={"row col-lg-12 col-md-12 col-sm-12"}>
            <span className={"col-lg-6 col-md-6 col-sm-12"}>NAME</span>
            <TextField className={"col-lg-6 col-md-6 col-sm-12"} onChange={(value) => this._onTextChange(value, "FirstName")} value={this.props.item.FirstName} />
          </div>
          {/* <div style={{ marginTop: '10px' }} className={"row col-lg-12 col-md-12 col-sm-12"}>
            <span className={"col-lg-6 col-md-6 col-sm-12"}>Last Name</span>
            <TextField className={"col-lg-6 col-md-6 col-sm-12"} onChange={(value) => this._onTextChange(value, "LastName")} value={this.props.item.LastName} />
          </div> */}
          <div style={{ marginTop: '10px' }} className={"row col-lg-12 col-md-12 col-sm-12"}>
            <span className={"col-lg-6 col-md-6 col-sm-12"}>EMAIL ID</span>
            <TextField className={"col-lg-6 col-md-6 col-sm-12"} onChange={(value) => this._onTextChange(value, "EmailId")} value={this.props.item.EmailId} />
          </div>
          <div style={{ marginTop: '10px' }} className={"row col-lg-12 col-md-12 col-sm-12"}>
            <span className={"col-lg-6 col-md-6 col-sm-12"}>DEPARTMENT</span>
            {/* <TextField className={"col-lg-6 col-md-6 col-sm-12"} onChange={(value) => this._onTextChange(value, "Department")} value={this.props.item.Department} /> */}
            <Dropdown style={{ width: '100%' }} className={"col-lg-6 col-md-6 col-sm-12"} onChange={(e) => this.handleDropdownChange(e, "Department")} placeholder="Select an option" defaultSelectedKey={[this.props.item.Department]} options={this.dropDownValues["Department"]} styles={dropdownStyles} />
          </div>
          {this.state.dptOther ?
            <div style={{ marginTop: '10px' }} className={"row col-lg-12 col-md-12 col-sm-12"}>
              <span className={"col-lg-6 col-md-6 col-sm-12"}>If Other</span>
              <TextField className={"col-lg-6 col-md-6 col-sm-12"} onChange={(value) => this._onTextChange(value, "DptValue")} value={this.props.item.DptValue} />
            </div> : <div></div>
          }

          <div style={{ marginTop: '10px' }} className={"row col-lg-12 col-md-12 col-sm-12"}>
            <span className={"col-lg-6 col-md-6 col-sm-12"}>SITE TO BE ACCESSED</span>

            <Dropdown style={{ width: '100%' }} className={"col-lg-6 col-md-6 col-sm-12"} onChange={(e) => this.handleDropdownChange(e, "SitestobeAccesed")} placeholder="Select an option" defaultSelectedKey={[this.props.item.SitestobeAccesed]} options={this.dropDownValues["SitestobeAccesed"]} styles={dropdownStyles} />
          </div>
          <div style={{ marginTop: '10px' }} className={"row col-lg-12 col-md-12 col-sm-12"}>
            <span className={"col-lg-6 col-md-6 col-sm-12"}>SITE ACCESS DATE FROM</span>
            <DateTimePicker
              className={"col-lg-6 col-md-6 col-sm-12"}
              onChange={val => this._ondatechange(val, "Daterequestingsiteaccessfrom")}

              value={this.props.itemID == null ? this.props.item.Daterequestingsiteaccessfrom : new Date(this.props.item.Daterequestingsiteaccessfrom)}
            />

          </div>
          <div style={{ marginTop: '10px' }} className={"row col-lg-12 col-md-12 col-sm-12"}>
            <span className={"col-lg-6 col-md-6 col-sm-12"}>SITE ACCESS DATE TO</span>
            <DateTimePicker
              className={"col-lg-6 col-md-6 col-sm-12"}
              onChange={val => this._ondatechange(val, "DaterequestingsiteaccessTo")}

              value={this.props.itemID == null ? this.props.item.DaterequestingsiteaccessTo : new Date(this.props.item.DaterequestingsiteaccessTo)}
              minDate={this.props.itemID == null ? this.props.item.Daterequestingsiteaccessfrom : new Date(this.props.item.Daterequestingsiteaccessfrom)}

            />

          </div>


          {/* <div style={{ marginTop: '10px' }} className={"row col-lg-12 col-md-12 col-sm-12"}>
            <span className={"col-lg-6 col-md-6 col-sm-12"}>EXPECTED ARRIVAL TIME</span>
            <TextField className={"col-lg-6 col-md-6 col-sm-12"} onChange={(value) => this._onTextChange(value, "Expected_x0020_Arrival_x0020_Tim")} value={this.props.item.Expected_x0020_Arrival_x0020_Tim} />
          </div>
          <div style={{ marginTop: '10px' }} className={"row col-lg-12 col-md-12 col-sm-12"}>
            <span className={"col-lg-6 col-md-6 col-sm-12"}>EXPECTED DEPARTURE TIME</span>
            <TextField className={"col-lg-6 col-md-6 col-sm-12"} onChange={(value) => this._onTextChange(value, "ExpectedDeparture")} value={this.props.item.ExpectedDeparture} />
          </div> */}

          <div style={{ marginTop: '10px' }} className={"row col-lg-12 col-md-12 col-sm-12"}>
            <span className={"col-lg-6 col-md-6 col-sm-12"}>PURPOSE OF VISIT</span>
            <MultiSelect className={"col-lg-6 col-md-6 col-sm-12"} options={this.state.multiValue} value={this.state.selectedmultiValue} onChange={this.onSelect} labelledBy="Select" disableSearch={true} />
            {/* <select
              multiple={true}
              value={this.state.multiValue}
              onChange={this.multihandleChange}
            >
              <option value="" />
              {this.dropDownValues.ReasonPurposeforsiteaccess.map((item) => {
                return (<option value={item.text} />)
              })}
            </select> */}
            {/* <TextField className={"col-lg-6 col-md-6 col-sm-12"} onChange={(value) => this._onTextChange(value, "ReasonPurposeforsiteaccess")} value={this.props.item.ReasonPurposeforsiteaccess} /> */}
          </div>
          {this.state.PurposeifOther ?
            <div style={{ marginTop: '10px' }} className={"row col-lg-12 col-md-12 col-sm-12"}>
              <span className={"col-lg-6 col-md-6 col-sm-12"}>If Other</span>
              <TextField className={"col-lg-6 col-md-6 col-sm-12"} onChange={(value) => this._onTextChange(value, "PurposeifOther")} value={this.props.item.PurposeifOther} />
            </div> : <div></div>
          }


          {this.state.userType ?
            <div style={{ marginTop: '10px' }} className={"row col-lg-12 col-md-12 col-sm-12"}>
              <span className={"col-lg-6 col-md-6 col-sm-12"}>TECHNICAL WORKSTATION REQUIRED?</span>
              {/* <TextField className={"col-lg-6 col-md-6 col-sm-12"} onChange={(value) => this._onTextChange(value, "Technical_x0020_Workstation_x002")} value={this.props.item.Technical_x0020_Workstation_x002} /> */}
              <Toggle className={"col-lg-6 col-md-6 col-sm-12"} onText="On" offText="Off" checked={this.state.WSrequired} onChange={(e, val) => this.toggleChange(e, val, "WSrequired")} />
            </div> :
            (<div>
              <div style={{ marginTop: '10px' }} className={"row col-lg-12 col-md-12 col-sm-12"}>
                <span className={"col-lg-6 col-md-6 col-sm-12"}>HOST NAME</span>

                <Dropdown style={{ width: '100%' }} className={"col-lg-6 col-md-6 col-sm-12"} onChange={(e) => this.handleDropdownChange(e, "Host_x0020_Name")} placeholder="Select an option" defaultSelectedKey={[this.props.item.Host_x0020_Name]} options={this.dropDownValues["Host_x0020_Name"]} styles={dropdownStyles} />
              </div>
              <div style={{ marginTop: '10px' }} className={"row col-lg-12 col-md-12 col-sm-12"}>
                <span className={"col-lg-6 col-md-6 col-sm-12"}>COMPANY NAME</span>
                <TextField className={"col-lg-6 col-md-6 col-sm-12"} onChange={(value) => this._onTextChange(value, "Company_x0020_Name")} value={this.props.item.Company_x0020_Name} />
              </div>
            </div>)
          }
          {this.state.WSrequired ?
            (<div><div style={{ marginTop: '10px' }} className={"row col-lg-12 col-md-12 col-sm-12"}>
              <span className={"col-lg-6 col-md-6 col-sm-12"}>WORKSTATION REQUIRED TO VISIT</span>
              <TextField className={"col-lg-6 col-md-6 col-sm-12"} onChange={(value) => this._onTextChange(value, "Workstationrequirestovisit")} value={this.props.item.Workstationrequirestovisit} />
              {/* <Toggle label="Enabled and checked" onText="On" offText="Off" checked={false} onChange={(e, val) => this.toggleChange(e, val, "WSrequired")} /> */}
            </div>

              <div style={{ marginTop: '10px' }} className={"row col-lg-12 col-md-12 col-sm-12"}>
                <span className={"col-lg-6 col-md-6 col-sm-12"}>WORKSTATION TYPE</span>
                <TextField className={"col-lg-6 col-md-6 col-sm-12"} onChange={(value) => this._onTextChange(value, "WorkstationType")} value={this.props.item.WorkstationType} />
              </div></div>) : <div></div>
          }
          {/* <div style={{ marginTop: '10px' }} className={"row col-lg-12 col-md-12 col-sm-12"}>
            <span className={"col-lg-6 col-md-6 col-sm-12"}></span>
            <DefaultButton className={"col-lg-6 col-md-6 col-sm-12"} text="Check Availabilty" onClick={this.checkavailablity} allowDisabledFocus />
          </div> */}

          {this.state.userType ?
            (<div>
              <div style={{ marginTop: '10px' }} className={"row col-lg-12 col-md-12 col-sm-12"}>
                <span className={"col-lg-6 col-md-6 col-sm-12"}>MEETING ROOM REQUIRED?</span>
                {/* <TextField className={"col-lg-6 col-md-6 col-sm-12"} onChange={(value) => this._onTextChange(value, "Technical_x0020_Workstation_x002")} value={this.props.item.Technical_x0020_Workstation_x002} /> */}
                <Toggle className={"col-lg-6 col-md-6 col-sm-12"} onText="On" offText="Off" checked={this.state.MRrequired} onChange={(e, val) => this.toggleChange(e, val, "MRrequired")} />
              </div>
              {this.state.MRrequired ?
                (<div> <div style={{ marginTop: '10px' }} className={"row col-lg-12 col-md-12 col-sm-12"}>
                  <span className={"col-lg-6 col-md-6 col-sm-12"}>MEETING ROOM</span>
                  {/* <TextField className={"col-lg-6 col-md-6 col-sm-12"} onChange={(value) => this._onTextChange(value, "MeetingRoom")} value={this.props.item.MeetingRoom} /> */}
                  <Dropdown disabled={this.state.mrDisabled} style={{ width: '100%' }} className={"col-lg-6 col-md-6 col-sm-12"} onChange={(e) => this.handleDropdownChange(e, "MeetingRoom")} placeholder="Select an option" defaultSelectedKey={[this.props.item.MeetingRoom]} options={this.dropDownValues["MeetingRoom"]} styles={dropdownStyles} />
                </div>
                  <div style={{ marginTop: '10px' }} className={"row col-lg-12 col-md-12 col-sm-12"}>
                    <span className={"col-lg-6 col-md-6 col-sm-12"}>NO OF ATTENDEES</span>
                    <TextField className={"col-lg-6 col-md-6 col-sm-12"} onChange={(value) => this._onTextChange(value, "Spacerequiredforvisit")} value={this.props.item.Spacerequiredforvisit} />
                  </div>
                  {/* < div style={{ marginTop: '10px' }} className={"row col-lg-12 col-md-12 col-sm-12"}>
                    <span className={"col-lg-6 col-md-6 col-sm-12"}>NO OF ATTENDEES</span>
                    <TextField className={"col-lg-6 col-md-6 col-sm-12"} onChange={(value) => this._onTextChange(value, "No_x0020_of_x0020_Attendees")} value={this.props.item.No_x0020_of_x0020_Attendees} />
                  </div> */}
                  <div style={{ marginTop: '10px' }} className={"row col-lg-12 col-md-12 col-sm-12"}>
                    <span className={"col-lg-6 col-md-6 col-sm-12"}>MEETING TIME FROM</span>
                    <DateTimePicker
                      className={"col-lg-6 col-md-6 col-sm-12"}
                      onChange={val => this._ondatechange(val, "Meeting_x0020_Room_x0020_StartT")}
                      value={this.props.itemID == null ? this.props.item.Meeting_x0020_Room_x0020_StartT : new Date(this.props.item.Meeting_x0020_Room_x0020_StartT)}

                    />

                  </div>



                  <div style={{ marginTop: '10px' }} className={"row col-lg-12 col-md-12 col-sm-12"}>
                    <span className={"col-lg-6 col-md-6 col-sm-12"}>MEETING TIME TO</span>
                    <DateTimePicker
                      className={"col-lg-6 col-md-6 col-sm-12"}
                      onChange={val => this._ondatechange(val, "Meeting_x0020_Room_x0020_EndT")}
                      value={this.props.itemID == null ? this.props.item.Meeting_x0020_Room_x0020_EndT : new Date(this.props.item.Meeting_x0020_Room_x0020_EndT)}
                      minDate={this.props.itemID == null ? this.props.item.Meeting_x0020_Room_x0020_StartT : new Date(this.props.item.Meeting_x0020_Room_x0020_StartT)}
                    />

                  </div>

                  < div style={{ marginTop: '10px' }} className={"row col-lg-12 col-md-12 col-sm-12"}>
                    <span className={"col-lg-6 col-md-6 col-sm-12"}></span>
                    <DefaultButton className={"col-lg-6 col-md-6 col-sm-12"} text="Check Availabilty" onClick={this.checkavailablity} allowDisabledFocus />

                  </div>
                </div>)
                : (<div></div>)
              }

            </div>) : (<div></div>)
          }
          <div style={{ marginTop: '10px' }} className={"row col-lg-12 col-md-12 col-sm-12"}>
            <span className={"col-lg-6 col-md-6 col-sm-12"}>1:1 DISCUSSION WITH LINE MANAGER COMPLETED?</span>
            {/* <TextField className={"col-lg-6 col-md-6 col-sm-12"} onChange={(value) => this._onTextChange(value, "Technical_x0020_Workstation_x002")} value={this.props.item.Technical_x0020_Workstation_x002} /> */}
            <Toggle className={"col-lg-6 col-md-6 col-sm-12"} onText="On" offText="Off" checked={this.state.DisLineMrg} onChange={(e, val) => this.toggleChange(e, val, "DisLineMrg")} />
          </div>

          <div style={{ marginTop: '30px', height: '45px', textAlign: 'center', fontWeight: 'bold', padding: '12px', background: 'aliceblue' }} className={"col-lg-12 col-md-12 col-sm-12"}>SHELL T&T OFFICE INDUCTION</div>
          <div style={{ marginTop: '25px' }} className={"col-lg-12 col-md-12 col-sm-12"}>
            <span>Induction is mandatory for gaining access to Shell T&T offices as your safety is of paramount importance whilst on site. If you do not possess a valid induction certificate, please click here to complete online induction after which, you will be required to attach a copy below. All inductions will be valid for a period of 6 months.</span>
          </div>

          <div style={{ marginTop: '10px' }} className={"row col-lg-12 col-md-12 col-sm-12"}>
            <input className={"col-lg-6 col-md-6 col-sm-12"} type="file" ref={(elm) => { this._input = elm; }} multiple></input>

            <DefaultButton className={"col-lg-6 col-md-6 col-sm-12"} text="View Certificate" onClick={() =>
              this.getAttachedFiles("Draft", this.props.context, this.props.itemID)} /> {this.hasAttachment ? (
                <table>
                  {this.state.attachedFiles} {}
                </table>
              ) : (
                  <table></table>
                )}
          </div>

          <div style={{ marginTop: '30px', height: '45px', textAlign: 'center', fontWeight: 'bold', padding: '12px', background: 'aliceblue' }} className={"col-lg-12 col-md-12 col-sm-12"}>COVID-19 PRE-SCREENING QUESTIONNAIRE</div>
          <div style={{ marginTop: '25px' }} className={"col-lg-12 col-md-12 col-sm-12"}>
            <span>Please <a style={{ cursor: 'pointer', fontWeight: 'bold', color: 'blue' }} onClick={this.CovidScreen}>click here</a> to complete our COVID-19 Pre-Screening Questionnaire. Note: you will not be able to proceed if you have failed the Covid-19 Pre-Screening</span>

          </div>
          <div style={{ marginTop: '10px' }} className={"col-lg-12 col-md-12 col-sm-12"}>
            <span style={{ fontWeight: 'bold' }} >COVID-19 PRE-SCREENING STATUS : <span style={{ fontWeight: 'normal' }}> {this.state.covidStatus} </span></span>
          </div>

          <div style={{ margin: '30px auto' }} className={"row col-lg-10 col-md-10 col-sm-12"}>
            <DefaultButton disabled={this.state.saveDisable} className={"col-lg-3 col-md-3 col-sm-12"} text="Save" onClick={() => this.submitItem("Draft")} allowDisabledFocus />
            <DefaultButton disabled={this.state.subDisable} style={{ margin: 'auto' }} className={"col-lg-3 col-md-3 col-sm-12"} text="Submit" onClick={() => this.submitItem("Submit")} allowDisabledFocus />
            <DefaultButton className={"col-lg-3 col-md-3 col-sm-12"} text="Reset" onClick={this.resetItem} allowDisabledFocus />
          </div>
          <div style={{ visibility: 'hidden' }} className={styles.heading}></div>

        </div >
      </div >
    );
  }

  CovidScreen() {
    if (this.props.itemID != null) {
      //debugger;
      const body: string = JSON.stringify(this.props.item);
      this.props.context.spHttpClient.post(this.props.context.pageContext.web.absoluteUrl + "/_api/web/lists/getbytitle('Site Access Request Form')/items(" + this.props.itemID + ")", SPHttpClient.configurations.v1,
        {
          headers: {
            'X-HTTP-Method': 'MERGE',
            'IF-Match': '*'
          },
          body: body
        }).then(response => {
          this.uploadFileFromControl(this.props.context, this.props.itemID, true);
        });
    }
    else {
      const body: string = JSON.stringify(this.props.item);
      this.props.context.spHttpClient.post(this.props.context.pageContext.web.absoluteUrl + "/_api/web/lists/getbytitle('Site Access Request Form')/items", SPHttpClient.configurations.v1,
        {
          headers: {
            'Accept': 'application/json;odata=nometadata',
            'Content-type': 'application/json;odata=nometadata',
            'odata-version': ''
          },
          body: body
        }).then(response => {
          response.json().then(responseJson => {
            console.log(responseJson.Id);
            this.uploadFileFromControl(this.props.context, responseJson.Id, true);
          });
        });
    }
  }

  private toggleChange(ev: React.MouseEvent<HTMLElement>, checked?: boolean, value?: any) {
    console.log('toggle is ' + (checked ? 'checked' : 'not checked'));
    console.log(value);
    this.props.item[value] = "" + checked + "";
    let state = {};
    state[value] = checked;
    this.setState(state);
  }


  onSelect(selectedList) {
    //debugger;
    let x = 0;
    let selectedValuePurpose = "";
    let PurposeifOther = false;
    selectedList.map((item) => {
      if (x + 1 == selectedList.length) {
        selectedValuePurpose += item.value;
      }
      else {
        selectedValuePurpose += item.value + ",";
      }
      x++;
    });
    if (selectedList.length == 1) {
      if (selectedList[0].value == "Other") {
        PurposeifOther = true;
      }
    }
    this.props.item["ReasonPurposeforsiteaccess"] = selectedValuePurpose;
    this.setState({ selectedmultiValue: selectedList, PurposeifOther: PurposeifOther });
  }

  private multihandleChange(event) {
    let newVal = event.target.value
    let stateVal = this.state.multiValue

    console.log(stateVal)
    console.log(newVal)

    stateVal.indexOf(newVal) === -1
      ? stateVal.push(newVal)
      : stateVal.length === 1
        ? (stateVal = [])
        : stateVal.splice(stateVal.indexOf(newVal), 1)

    this.setState({ multiValue: stateVal })
  }

  private handleDropdownChange(e, idValue) {
    //debugger;
    console.log("Checking");
    let selecteValue = e.nativeEvent.target.textContent.replace("", "");
    this.props.item[idValue] = selecteValue;
    if (idValue == "Department" && selecteValue == "Other") {
      this.setState({ dptOther: true });
    }
    else {
      this.setState({ dptOther: false });
    }

  }

  public submitItem(status: string) {
    //debugger;
    if (this.props.itemID != null) {
      //debugger;
      this.props.item.FormStatus = status;
      const body: string = JSON.stringify(this.props.item);
      this.props.context.spHttpClient.post(this.props.context.pageContext.web.absoluteUrl + "/_api/web/lists/getbytitle('Site Access Request Form')/items(" + this.props.itemID + ")", SPHttpClient.configurations.v1,
        {
          headers: {
            'X-HTTP-Method': 'MERGE',
            'IF-Match': '*'
          },
          body: body
        }).then(response => {

          this.uploadFileFromControl(this.props.context, this.props.itemID);

        });
    }
    else {
      this.props.item.FormStatus = status;
      const body: string = JSON.stringify(this.props.item);
      this.props.context.spHttpClient.post(this.props.context.pageContext.web.absoluteUrl + "/_api/web/lists/getbytitle('Site Access Request Form')/items", SPHttpClient.configurations.v1,
        {
          headers: {
            'Accept': 'application/json;odata=nometadata',
            'Content-type': 'application/json;odata=nometadata',
            'odata-version': ''
          },
          body: body
        }).then(response => {
          response.json().then(responseJson => {
            console.log(responseJson.Id);
            this.uploadFileFromControl(this.props.context, responseJson.Id);
          });
        });
    }
  }

  private uploadFileFromControl(curContext: WebPartContext, folderName: any, isCovidScreen?: boolean) {
    //Get the file from File DOM


    var files = this._input.files;
    if (files.length != 0) {

      curContext.spHttpClient.post(curContext.pageContext.web.absoluteUrl + "/_api/Web/Folders/add('SiteWFSupportDocs/" + folderName + "')", SPHttpClient.configurations.v1, {
        headers: {
          'Accept': 'application/json;odata=nometadata',
          'Content-type': 'application/json;odata=nometadata',
          'odata-version': ''
        },
      }).then(response => {
        response.json().then((result: any) => {
          for (let i = 0; i < files.length; i++) {
            var file = files[i];
            let jobTitles: any[] = [];
            jobTitles = result.value;
            let web = Web(curContext.pageContext.web.absoluteUrl);
            console.log(curContext.pageContext.web.absoluteUrl);
            web.getFolderByServerRelativeUrl(curContext.pageContext.web.serverRelativeUrl + "/SiteWFSupportDocs/" + folderName + "")
              .files.add(file.name, file, true)
              .then((data) => {
                console.log("File uploaded sucessfully");
                if ((i + 1) == files.length) {
                  if (isCovidScreen) {
                    window.location.href = curContext.pageContext.web.serverRelativeUrl + "/_layouts/15/workbench.aspx?ID=" + folderName + "";
                  }
                  // window.location.href = curContext.pageContext.web.serverRelativeUrl + "/SitePages/DashBoard.aspx";
                }
              })
              .catch((error) => {
                console.log(error);
                alert("Error in uploading");
              });
            // alert("Success");
          }
        });
      });
    }
    else {
      if (isCovidScreen) {
        window.location.href = curContext.pageContext.web.serverRelativeUrl + "/_layouts/15/workbench.aspx?ID=" + folderName + "";
      }
      // window.location.href = curContext.pageContext.web.serverRelativeUrl + "/SitePages/DashBoard.aspx";
    }
    //Upload a file to the SharePoint Library
  }

  public resetItem() {
    console.log(this.props);
    console.log(this.state);
  }

  public attachedFileCount = 0;
  public isFilesVisible = false;
  public attachedFile: any[] = [];
  public hasAttachment = false;

  private getAttachedFiles(status, curContext: WebPartContext, itemID) {
    //debugger;
    if (!this.isFilesVisible) {
      this.isFilesVisible = true;

      this.props.context.spHttpClient.get(curContext.pageContext.web.absoluteUrl + "/_api/web/GetFolderByServerRelativeUrl('SiteWFSupportDocs/" + itemID + "')?$expand=Files", SPHttpClient.configurations.v1).then(response => {
        response.json().then((result: any) => {
          this.attachedFileCount = result.Files.length;
          //this.attachedFile = "";
          for (let i = 0; i < result.Files.length; i++) {
            if (status == "Draft") {
              this.attachedFile.push(<tr><td><a href={result.Files[i].ServerRelativeUrl}>{result.Files[i].Name}</a></td><td><input type='button' value="Delete" onClick={(e) => this.deleteItem(result.Files[i].ServerRelativeUrl)} /></td></tr>);
            }
            else {
              this.attachedFile.push(<tr><td><a href={result.Files[i].ServerRelativeUrl}>{result.Files[i].Name}</a></td><td></td></tr>);
            }
            //this.attachedFile = this.attachedFile + "<tr><td><a href='" + result.Files[i].ServerRelativeUrl + "'>" + result.Files[i].Name + "</a></td><td><input type='button' onclick=deleteItem('" + result.Files[i].ServerRelativeUrl + "') /></td></tr>";
            this.hasAttachment = true;
            //this.setState({attachedFiles:(<table><tr><td><a href={result.Files[i].ServerRelativeUrl}>{result.Files[i].Name}</a></td><td><input type='button' onClick={(e) => this.deleteItem(result.Files[i].ServerRelativeUrl)} /></td></tr></table>)})
          }
          this.setState({ attachedFiles: this.attachedFile });
          // this.attachedFile="<tr><td><a href=" + result.Files[0].ServerRelativeUrl + ">" + result.Files[0].Name + "</a></td><td><input type='button' onclick='this.deleteItem('" + result.Files[0].ServerRelativeUrl + "')'/></td></tr>";
        });
      });
    }
  }

  private deleteItem(fileURL) {
    this.props.context.spHttpClient.post(this.props.context.pageContext.web.absoluteUrl + "/_api/web/getfilebyserverrelativeurl('" + fileURL + "')", SPHttpClient.configurations.v1, {
      headers: {
        'Accept': 'application/json;odata=nometadata',
        'Content-type': 'application/json;odata=nometadata',
        'odata-version': '',
        "X-HTTP-Method": "DELETE",
        "If-Match": "*",
      },
    }).then(response => {
      this.isFilesVisible = false;
      this.attachedFile = [];
      // this.setState({ attachedFiles: [] });
      this.getAttachedFiles("Draft", this.props.context, this.props.itemID)
      this.refresh("del");

      // response.json().then((result: any) => {
      //   //debugger;
      // });
    });
  }


  public _onChange(ev: React.FormEvent<HTMLInputElement>, option: IChoiceGroupOption): void {
    console.dir(option);
    debugger;
    this.props.item["EmployeeContractororonbehalfoffa"] = option.text;
    if (option.text == "Requestor") {
      this.setState({ userType: true, EmployeeContractororonbehalfoffa: option.text });
    }
    else {
      this.setState({ userType: false, EmployeeContractororonbehalfoffa: option.text });
    }
  }

  public _onTextChange(value, stateValue) {
    //debugger;
    let state = {};
    state[stateValue] = value.nativeEvent.target.value;
    this.props.item[stateValue] = value.nativeEvent.target.value;

    this.setState(state);


  }

  public refresh(stateValue) {
    let state = {};
    state[stateValue] = false;
    this.setState(state);
  }


  public _ondatechange(value, stateValue) {
    //debugger;
    let state = {};
    state[stateValue] = value;
    this.props.item[stateValue] = value;
    this.setState(state);
  }

  public checkavailablity() {
    //debugger;

    let startdate = moment.tz(new Date(this.props.item.Meeting_x0020_Room_x0020_StartT), 'Europe/London').toISOString();
    let enddate = moment.tz(new Date(this.props.item.Meeting_x0020_Room_x0020_EndT), 'Europe/London').toISOString();
    let ignoredates = [];
    let validDates = [];
    this.props.context.spHttpClient.get(this.props.context.pageContext.web.absoluteUrl + "/_api/web/lists/getbytitle('Site Access Request Form')/items?$filter=((Meeting_x0020_Room_x0020_StartT gt datetime'" + startdate + "') and (Meeting_x0020_Room_x0020_StartT lt datetime'" + enddate + "') or (Meeting_x0020_Room_x0020_EndT gt datetime'" + startdate + "') and (Meeting_x0020_Room_x0020_EndT lt datetime'" + enddate + "'))", SPHttpClient.configurations.v1).then(response => {

      response.json().then((result: any) => {
        // console.log(result.value);
        result.value.forEach(element => {
          console.log(element.Id);
          ignoredates.push(element);
        });
        this.props.context.spHttpClient.get(this.props.context.pageContext.web.absoluteUrl + "/_api/web/lists/getbytitle('Site Access Request Form')/items?$filter=((datetime'" + startdate + "' gt Meeting_x0020_Room_x0020_StartT) and (datetime'" + startdate + "' lt Meeting_x0020_Room_x0020_EndT) or (datetime'" + enddate + "' gt Meeting_x0020_Room_x0020_StartT) and (datetime'" + enddate + "' lt Meeting_x0020_Room_x0020_EndT))", SPHttpClient.configurations.v1).then(response2 => {

          response2.json().then((result2: any) => {
            //console.log(result2.value);
            result2.value.forEach(element => {
              console.log(element.Id);
              ignoredates.push(element);

            });
            let x = { "1": { id: [], no: "" } }
            let y = [];
            ignoredates.map((date) => {

              if (x[date.MeetingRoom] == null) {
                x[date.MeetingRoom] = { id: [date.Id], no: date.Spacerequiredforvisit }
              }
              else {
                if (x[date.MeetingRoom].id.includes(date.Id)) {
                  console.log("yes");
                }
                else {
                  x[date.MeetingRoom].id.push(date.Id);
                  var total = parseInt(x[date.MeetingRoom].no) + parseInt(date.Spacerequiredforvisit)
                  x[date.MeetingRoom].no = total;
                }
                // var total = parseInt(x[date.Id].no) + parseInt(date.Spacerequiredforvisit)
                // x[date.MeetingRoom] = { id: date.MeetingRoom, no: total }
              }

            });

            this.dropDownValues["MeetingRoom"] = [];
            this.meetingRooms.map((room) => {
              if (x[room.room] != null) {
                if (parseInt(room.no) > parseInt(x[room.room].no)) {
                  validDates.push(room);
                  let dropDown: any = { key: "", text: "" }
                  dropDown.key = room.room;
                  dropDown.text = room.room;
                  this.dropDownValues["MeetingRoom"].push(dropDown);
                  let availtotal = parseInt(room.no) - parseInt(x[room.room].no)
                  let avail = { room: room.room, seat: availtotal.toString() }
                  this.availSeats.push(avail);
                }
              }
              else {
                validDates.push(room);

                let dropDown: any = { key: "", text: "" }
                dropDown.key = room.room;
                dropDown.text = room.room;
                this.dropDownValues["MeetingRoom"].push(dropDown);
                let avail = { room: room.room, seat: room.no.toString() }
                this.availSeats.push(avail);
              }
              // room.room == 
              debugger;
            });
            this.refresh("mrDisabled");
            debugger;
          });
        });
      });

    });

  }

  public availSeats = [];
  public componentDidMount() {
    debugger;
    this.getDropdowns("Department", "Department").then(data => {
      this.getDropdowns("SitesToBeAccessed", "SitestobeAccesed").then(data => {
        this.getDropdowns("HostName", "Host_x0020_Name").then(data => {
          this.getmultiDropdowns("PurposeofVisit", "ReasonPurposeforsiteaccess").then(data => {
            this.getDropdownsMeetingRoom("MeetingRoom", "MeetingRoom").then(data => {
              if (this.props.itemID == null) {
                this.props.item["FirstName"] = this.props.context.pageContext.user.displayName;
                this.props.item["EmailId"] = this.props.context.pageContext.user.email;
                this.props.item["EmployeeContractororonbehalfoffa"] = "Requestor";
                this.setState({ EmployeeContractororonbehalfoffa: "Requestor" });
              }
              else {
                this.seldropDownValues = [];
                this.props.item["ReasonPurposeforsiteaccess"].split(',').map((item) => {

                  let dropDown: any = { label: "", value: "" }
                  dropDown.label = item;
                  dropDown.value = item;
                  this.seldropDownValues.push(dropDown);

                });
                var userType = false;
                if (this.props.item.EmployeeContractororonbehalfoffa == "Requestor") {
                  userType = true;
                }

                this.setState({ selectedmultiValue: this.seldropDownValues, userType: userType });

              }
              this.refresh("DptDown");
            });
          });
        });
      });
    });
  }


  public dropDownValues: any = {};
  public seldropDownValues: any = {};
  public meetingRooms: any = [];
  public async getDropdowns(listName, fieldName: string): Promise<any> {
    //debugger;
    return new Promise<any>((resolve, reject) => {
      this.props.context.spHttpClient.get(this.props.context.pageContext.web.absoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items", SPHttpClient.configurations.v1).then(response => {
        response.json().then((result: any) => {
          this.dropDownValues[fieldName] = [];
          result.value.map((item) => {
            let dropDown: any = { key: "", text: "" }
            dropDown.key = item.Title;
            dropDown.text = item.Title;
            this.dropDownValues[fieldName].push(dropDown);

          });
          resolve("done");
        });
      });
    });
  }

  public async getDropdownsMeetingRoom(listName, fieldName: string): Promise<any> {
    //debugger;
    return new Promise<any>((resolve, reject) => {
      this.props.context.spHttpClient.get(this.props.context.pageContext.web.absoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items", SPHttpClient.configurations.v1).then(response => {
        response.json().then((result: any) => {
          this.dropDownValues[fieldName] = [];
          result.value.map((item) => {
            let dropDown: any = { key: "", text: "" }
            let mr: any = { room: "", no: "" }
            dropDown.key = item.Title;
            dropDown.text = item.Title;
            this.dropDownValues[fieldName].push(dropDown);
            mr.room = item.Title;
            mr.no = item.NoofAttendees;
            this.meetingRooms.push(mr);
          });
          resolve("done");
        });
      });
    });
  }

  public async getmultiDropdowns(listName, fieldName: string): Promise<any> {
    //debugger;
    return new Promise<any>((resolve, reject) => {
      this.props.context.spHttpClient.get(this.props.context.pageContext.web.absoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items", SPHttpClient.configurations.v1).then(response => {
        response.json().then((result: any) => {
          this.dropDownValues[fieldName] = [];
          result.value.map((item) => {
            let dropDown: any = { label: "", value: "" }
            dropDown.label = item.Title;
            dropDown.value = item.Title;
            this.dropDownValues[fieldName].push(dropDown);

          });
          this.setState({ multiValue: this.dropDownValues["ReasonPurposeforsiteaccess"] })
          resolve("done");
        });
      });
    });
  }






}
