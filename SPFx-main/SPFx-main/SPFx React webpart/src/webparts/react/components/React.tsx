import * as React from 'react';
import styles from './React.module.scss';
import { IReactProps } from './IReactProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class ReactTest extends React.Component<IReactProps, {}> {
  
  public render(): React.ReactElement<IReactProps> {
    return (
      <div className={ styles.react }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description1)}</p>
              <p className={ styles.description }>{escape(this.props.mytest1)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
