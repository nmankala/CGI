import * as React from 'react';
import styles from './Dash.module.scss';
import { IDashProps } from './IDashProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IListItem } from '../services/SharePoint/IListItem';
import SharePointService from '../services/SharePoint/SharePointService';
import DateTimePicker from 'react-datetime-picker';
import date from 'date-and-time';

export interface IDashState {
  items: IListItem[];
  loading: boolean;
  error: string | null;
  Startvalue:Date,
  Endvalue:Date
}

export default class Dash extends React.Component<IDashProps,IDashState> {
  constructor(props: IDashProps) {
    super(props);

    // Bind methods
    this.getItems = this.getItems.bind(this);
  

    // Set initial state
    this.state = {
      items: [],
      loading: false,
      error: null,
      Startvalue:new Date(),
      Endvalue:new Date()
    };
  }
  
  public getItems(): void {
    this.setState({ loading: true });

    SharePointService.getListItems(this.props.listId).then(items => {
      console.log(items)
      this.setState({
        items: items.value,
        loading: false,
        error: null,
      });
    }).catch(error => {
      this.setState({
        error: 'Something went wrong!',
        loading: false,
      });
    });
  }
  public render(): React.ReactElement<IDashProps> {
    return (
      <div>
        <DateTimePicker
       onChange={val => this.setState({Startvalue:val})}
       value={this.state.Startvalue}
      />

<DateTimePicker
       onChange={val => this.setState({Endvalue:val})}
       value={this.state.Endvalue}
      />
      <button onClick={()=>{alert(this.state.Startvalue.toISOString())}}>Click me</button>
      <button onClick={()=>{alert(date.format(this.state.Startvalue,'YYYY/MM/DD HH:mm:ss') )}}>Click me</button>
      <button onClick={()=>{alert(date.format(this.state.Endvalue,'YYYY/MM/DD HH:mm:ss') )}}>Click End</button>
        <ul>
          {this.state.items.map(item => {
            return (
              <li key={item.Id}>
                <strong>{item.FromDate}</strong> ({item.Id})
              </li>
            );
          })}
        </ul>
      <button onClick={this.getItems} disabled={this.state.loading}>
        {this.state.loading ? 'Loading...' : 'Refresh'}
      </button>
      </div>
    );
  }
}
