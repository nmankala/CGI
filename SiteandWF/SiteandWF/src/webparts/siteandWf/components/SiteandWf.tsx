import * as React from 'react';
import styles from './SiteandWf.module.scss';
import { ISiteandWfProps, ISiteandWfState } from './ISiteandWfProps';
import { escape } from '@microsoft/sp-lodash-subset';
import "bootstrap/dist/css/bootstrap.min.css";
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';
import { TextField, MaskedTextField } from '@fluentui/react/lib/TextField';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { SPHttpClient } from '@microsoft/sp-http';

const options: IChoiceGroupOption[] = [
  { key: 'Requestor', text: 'Requestor' },
  { key: 'Contractor', text: 'Contractor' },
  { key: 'Visitor', text: 'Visitor' },
];

export default class SiteandWf extends React.Component<ISiteandWfProps, ISiteandWfState> {
  constructor(props: ISiteandWfProps, state: ISiteandWfState) {
    super(props);
    this.state = {
      defaultSubmitter: "",
      refresh: "no"
    }
    this._onChange = this._onChange.bind(this);
    this.saveItem = this.saveItem.bind(this);
    this.submitItem = this.submitItem.bind(this);
  }

  public render(): React.ReactElement<ISiteandWfProps> {

    return (
      <div className={"container"}>
        <div className={"row"}>
          <div className={"col-lg-12 col-md-12 col-sm-12"}>
            <ChoiceGroup className={"col-lg-12 col-md-12 col-sm-12"} defaultSelectedKey={this.props.item.EmployeeContractororonbehalfoffa} options={options} onChange={this._onChange} label="Requestor" required={true} />
          </div>
          <div className={"row col-lg-12 col-md-12 col-sm-12"}>
            <span className={"col-lg-6 col-md-6 col-sm-12"}>First Name</span>
            <TextField className={"col-lg-6 col-md-6 col-sm-12"} onChange={(value) => this._onTextChange(value, "FirstName")} value={this.props.item.FirstName} />
          </div>
          <div className={"row col-lg-12 col-md-12 col-sm-12"}>
            <span className={"col-lg-6 col-md-6 col-sm-12"}>Last Name</span>
            <TextField className={"col-lg-6 col-md-6 col-sm-12"} onChange={(value) => this._onTextChange(value, "LastName")} value={this.props.item.LastName} />
          </div>
          <div className={"row col-lg-12 col-md-12 col-sm-12"}>
            <span className={"col-lg-6 col-md-6 col-sm-12"}>Email ID</span>
            <TextField className={"col-lg-6 col-md-6 col-sm-12"} onChange={(value) => this._onTextChange(value, "EmailId")} value={this.props.item.EmailId} />
          </div>
          <div className={"row col-lg-12 col-md-12 col-sm-12"}>
            <DefaultButton className={"col-lg-6 col-md-6 col-sm-12"} text="Save" onClick={this.saveItem} allowDisabledFocus />
            <DefaultButton className={"col-lg-6 col-md-6 col-sm-12"} text="Submit" onClick={this.submitItem} allowDisabledFocus />
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
        console.log(response);
      });
  }


  public _onChange(ev: React.FormEvent<HTMLInputElement>, option: IChoiceGroupOption): void {
    console.dir(option);
    this.props.item["EmployeeContractororonbehalfoffa"] = option.text;
  }

  public _onTextChange(value, stateValue) {
    debugger;
    let state = {};
    state[stateValue] = value.nativeEvent.target.value;
    this.props.item[stateValue] = value.nativeEvent.target.value;
    this.setState(state);
  }


}
