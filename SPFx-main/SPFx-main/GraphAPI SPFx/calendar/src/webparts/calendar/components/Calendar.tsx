import * as React from 'react';
import styles from './Calendar.module.scss';
import { ICalendarProps } from './ICalendarProps';
import { escape } from '@microsoft/sp-lodash-subset';

import {MSGraphClient} from '@microsoft/sp-http';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import { Icalendardemostate} from './calendardemostate'

export default class Calendar extends React.Component<ICalendarProps, Icalendardemostate> {
  
  constructor(props:ICalendarProps){
    super(props);
    this.state={
      events:[]
    };
  }
  componentDidMount():void{
    this.props.context.msGraphClientFactory.getClient().then((client:MSGraphClient):void=>{
      client
      .api('/me/calendar/events')
      .version("v1.0")
      .select("*")
      .get((error:any,eventresponse,rawresponse?:any)=>{
        if(error){
          console.log(Error);
          return;
        }
        const calevents:microsoftgraph.Event[]=eventresponse.value;
        this.setState({events:calevents})
      })
    })
  }
  
  public render(): React.ReactElement<ICalendarProps> {
    return (
      <div>
        <ul>
          {
            this.state.events.map((item,key)=>{
              <li key={item.id}>
                {item.subject}
                {item.organizer.emailAddress.name}
              </li>
            })
          }
        </ul>
      </div>
    );
  }
}
