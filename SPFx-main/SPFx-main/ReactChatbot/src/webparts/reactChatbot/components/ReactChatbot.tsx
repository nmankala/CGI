import * as React from 'react';
import styles from './ReactChatbot.module.scss';
import { IReactChatbotProps } from './IReactChatbotProps';
import { escape } from '@microsoft/sp-lodash-subset';
import ChatBot from "react-simple-chatbot";

export default class ReactChatbot extends React.Component<IReactChatbotProps, {}> {
  
  public render(): React.ReactElement<IReactChatbotProps> {
    const steps = [
      {
        id: "Greet",
        message: "Hello, Welcome to our shop",
        trigger: "Ask Name"
      },
      {
        id: "Ask Name",
        message: "Please type your name?",
        trigger: "Waiting user input for name"
      },
      {
        id: "Waiting user input for name",
        user: true,
        trigger: "Asking options to eat"
      },
      {
        id: "Asking options to eat",
        message: "Hi {previousValue}, Glad to know you !!",
        trigger: "Done"
      },
      {
        id: "Done",
        message: "Have a great day !!",
        end: true
      }
   ];
    return (
      <div className={ styles.reactChatbot }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
            <ChatBot steps={steps}/>
          </div>
        </div>
       
      </div>
    );
  }
}
