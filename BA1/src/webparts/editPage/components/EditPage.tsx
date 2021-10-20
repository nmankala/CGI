import * as React from 'react';
import styles from './EditPage.module.scss';
import { IEditPageProps } from './IEditPageProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { Announced } from '@fluentui/react/lib/Announced';
import { TextField, ITextFieldStyles } from '@fluentui/react/lib/TextField';
import { DetailsList, DetailsListLayoutMode, Selection, IColumn } from '@fluentui/react/lib/DetailsList';
import { MarqueeSelection } from '@fluentui/react/lib/MarqueeSelection';
import { mergeStyles } from '@fluentui/react/lib/Styling';
import { Home48Regular } from "@fluentui/react-icons";

import { SPHttpClient } from '@microsoft/sp-http';
const exampleChildClass = mergeStyles({
  display: 'block',
  marginBottom: '10px',
});

const textFieldStyles: Partial<ITextFieldStyles> = { root: { maxWidth: '300px' } };

export interface IDetailsListCompactExampleItem {
  key: number;
  ID: number;
  Name: string;
  Department:string;
  SitetobeAccessed:string;
  MeetingFromTime:string;
  MeetingToTime:Date

}

export interface IDetailsListCompactExampleState {
  items: IDetailsListCompactExampleItem[];
  selectionDetails: string;
}

export default class EditPage extends React.Component<IEditPageProps, IDetailsListCompactExampleState> {
  private _selection: Selection;
  private _allItems: IDetailsListCompactExampleItem[];
  private _columns: IColumn[];

  constructor(props:IEditPageProps) {
    super(props);

    this._selection = new Selection({
      onSelectionChanged: () => this.setState({ selectionDetails: this._getSelectionDetails() }),
    });

    this._allItems = [];
   

    this._columns = [
      { key: 'column1', name: 'ID', fieldName: 'ID', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'column2', name: 'Name', fieldName: 'Name', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'column3', name: 'Department', fieldName: 'Department', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'column4', name: 'SitetobeAccessed', fieldName: 'SitetobeAccessed', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'column5', name: 'MeetingFromTime', fieldName: 'MeetingFromTime', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'column6', name: 'MeetingToTime', fieldName: 'MeetingToTime', minWidth: 100, maxWidth: 200, isResizable: true },
    ];

    this.state = {
      items: this._allItems,
      selectionDetails: this._getSelectionDetails(),
    };
  }

  public render(): JSX.Element {
    const { items, selectionDetails } = this.state;

    return (
      <div className={"container"}>
         {/*<div className={"row"} style={{ height: '50px',  background: 'brown', color:'white' }}>
              
                
                <div style={{marginTop: '15px', textAlign: 'center', fontWeight: 'bold'}} className={"col-lg-10 col-md-10 col-sm-10"}>SHELL T&T OFFICE ACCESS AND SPACE BOOKING TOOL</div>
              
    </div>*/}
          <br />
        <div className={exampleChildClass}>{selectionDetails}</div>
        <Announced message={selectionDetails} />
        {/*<TextField
          className={exampleChildClass}
          label="Filter by name:"
          onChange={this._onFilter}
          styles={textFieldStyles}
        />*/}
        <Announced message={`Number of items after filter applied: ${items.length}.`} />
        <MarqueeSelection selection={this._selection}>
          <DetailsList
            compact={true}
            items={items}
            columns={this._columns}
            setKey="set"
            layoutMode={DetailsListLayoutMode.justified}
            selection={this._selection}
            selectionPreservedOnEmptyClick={true}
            onItemInvoked={this._onItemInvoked}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
            checkButtonAriaLabel="select row"
          />
        </MarqueeSelection>
      </div>
    );
  }

  private _getSelectionDetails(): string {
    const selectionCount = this._selection.getSelectedCount();

    switch (selectionCount) {
      case 0:
        return 'Double click to select item';
      case 1:
        return '1 item selected: ' + (this._selection.getSelection()[0] as IDetailsListCompactExampleItem).Name;
      default:
        return `${selectionCount} items selected`;
    }
  }

  private _onFilter = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text: string): void => {
    this.setState({
      items: text ? this._allItems.filter(i => i.Name.toLowerCase().indexOf(text) > -1) : this._allItems,
    });
  };

  private _onItemInvoked(item: IDetailsListCompactExampleItem): void {
    //alert(`Item invoked: ${item.ID}`);
    window.location.href="https://eu023-sp.shell.com/sites/SPOAA1436/SitePages/New-Request.aspx?MyID="+item.ID
  }
  public componentDidMount(){
    let Items=[];
    let usermail=this.props.context.pageContext.user.email
    this.props.context.spHttpClient.get(this.props.context.pageContext.web.absoluteUrl + "/_api/web/lists/getbytitle('Site Access Request Form')/items?$filter=EmailId eq '"+usermail+"' and FormStatus eq 'Draft'", SPHttpClient.configurations.v1).then(response => {
      response.json().then((result: any) => {
        let data = result.value;
        console.log(data);
        data.forEach(element => {
            Items.push({
            key: element.Id,
            ID:element.Id,
            Name: element.FirstName,
            Department: element.Department,
            SitetobeAccessed:element.SitestobeAccesed,
            MeetingFromTime:new Date(element.Meeting_x0020_Room_x0020_StartT).toString(),
            MeetingToTime:new Date(element.Meeting_x0020_Room_x0020_EndT).toString()
          })
        });
      });
      this.setState({items:Items});
    });
  }
}
