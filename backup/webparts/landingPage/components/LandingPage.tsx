import * as React from 'react';
import styles from './LandingPage.module.scss';
import { ILandingPageProps,ILandingPageState } from './ILandingPageProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPHttpClient } from '@microsoft/sp-http';
import "bootstrap/dist/css/bootstrap.min.css";
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';

export default class LandingPage extends React.Component<ILandingPageProps,ILandingPageState> {
  
  constructor(props: ILandingPageProps, state: ILandingPageState) {
    super(props);

    this.state={
      refresh: "no",
      buttonstate:""
    };

    ///bind methods
    this.buttonChange=this.buttonChange.bind(this);
  }


  public render(): React.ReactElement<ILandingPageProps> {

    return (
      <div className={"container"}>
          <div className={"row"}>
              <div style={{ marginTop: '10px', height: '50px', textAlign: 'center', fontWeight: 'bold', padding: '12px', background: 'brown', color:'white' }} className={"col-lg-12 col-md-12 col-sm-12"}>SHELL T&T OFFICE ACCESS AND SPACE BOOKING TOOL</div>
          </div>
          <br />
          <div className={"row"}>
              <div className={"col-lg-8 col-md-8 col-sm-12"}>
                <p>Welcome to the Shell T&T Office Aceess and Space Booking Tool</p>
               
                <p>In this tool, you are able to :</p>
                <p>
                <ul>
                  <li>Request access to the POS offices</li>
                  <li>Check In & Check Out from the office</li>
                  <li>Book Meeting Rooms (Shell users only)</li>
                  <li>Reserve Individual Workstations (Shell users only)</li>
                </ul>
                </p>
              </div>
          </div>
          <div className={"row"}>
              <div style={{ marginTop: '10px', height: '50px', textAlign: 'center', fontWeight: 'lighter', padding: '12px', background: 'brown', color:'white' }} className={"col-lg-12 col-md-12 col-sm-12"}>ARE YOU SHELL USER OR EXTERNAL PARTY</div>
          </div>
          <div className={"row justify-content-between"}>
              <div className={`col-lg-4 col-md-4 col-sm-12`}>
                <PrimaryButton className={styles.cbutton} onClick={(e)=>this.buttonChange("Shell User")} text="Shell User"></PrimaryButton>
              </div>
              <div className={`col-lg-4 col-md-4 col-sm-12`}>
              <PrimaryButton className={styles.cbutton} onClick={(e)=>this.buttonChange("External Contractor")} text="External Contractor"></PrimaryButton>
              </div>
              <div className={`col-lg-4 col-md-4 col-sm-12`}>
              <PrimaryButton className={styles.cbutton} onClick={(e)=>this.buttonChange("External Visitor")} text="External Visitor"></PrimaryButton>
              </div>
          </div>
          <div className={"row"}>
              <div style={{ marginTop: '10px', height: '50px', textAlign: 'center', fontWeight: 'lighter', padding: '12px',background: 'brown', color:'white'  }} className={"col-lg-12 col-md-12 col-sm-12"}>WHAT WOULD YOU LIKE TO DO</div>
          </div>
          {this.state.buttonstate=="Shell User" ? <div className={"container"}>
            <div className={"row"}>
              <div className={` col-lg-4 col-md-4 col-sm-12`}>
                <PrimaryButton className={styles.ebutton} text="Request Access to Office"></PrimaryButton>
              </div>
              <div className={` col-lg-4 col-md-4 col-sm-12`}>
                <PrimaryButton className={styles.ebutton} text="Raise new Request"></PrimaryButton>
              </div>
              <div className={` col-lg-4 col-md-4 col-sm-12`}>
                <PrimaryButton className={styles.ebutton} text="Edit Existing Request"></PrimaryButton>
              </div>
            </div>
          </div> : <div></div>}
          {this.state.buttonstate=="External Contractor" ? <div className={"container"}>
            <div className={"row"}>
              <div className={` col-lg-4 col-md-4 col-sm-12`}>
                <PrimaryButton className={styles.ebutton} text="External Request Access to Office"></PrimaryButton>
              </div>
              <div className={` col-lg-4 col-md-4 col-sm-12`}>
                <PrimaryButton className={styles.ebutton} text="Raise new Request"></PrimaryButton>
              </div>
              <div className={` col-lg-4 col-md-4 col-sm-12`}>
                <PrimaryButton className={styles.ebutton} text="Edit Existing Request"></PrimaryButton>
              </div>
            </div>
          </div> : <div></div>}
          {this.state.buttonstate=="External Visitor" ? <div className={"container"}>
            <div className={"row"}>
              <div className={` col-lg-4 col-md-4 col-sm-12`}>
                <PrimaryButton className={styles.ebutton} text="visitor Request Access to Office"></PrimaryButton>
              </div>
              <div className={` col-lg-4 col-md-4 col-sm-12`}>
                <PrimaryButton className={styles.ebutton} text="Raise new Request"></PrimaryButton>
              </div>
              <div className={` col-lg-4 col-md-4 col-sm-12`}>
                <PrimaryButton className={styles.ebutton} text="Edit Existing Request"></PrimaryButton>
              </div>
            </div>
          </div> : <div></div>}
      </div>
    );
  }
public buttonChange(change:string){
  this.setState({buttonstate:change})
}
}
