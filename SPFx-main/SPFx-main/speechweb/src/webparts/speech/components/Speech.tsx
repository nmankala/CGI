import * as React from 'react';
import styles from './Speech.module.scss';
import { ISpeechProps } from './ISpeechProps';

import {ISpfxTexttospeakState} from './ISpeechState';
import { escape } from '@microsoft/sp-lodash-subset';
import { TextField, DefaultButton, Stack, IStackTokens } from 'office-ui-fabric-react/lib';
import Speech from 'speak-tts';
const sectionStackTokens: IStackTokens = { childrenGap: 10 };
export default class Speech extends React.Component<ISpeechProps, ISpfxTexttospeakState> {
  private speech: Speech;
  constructor(props: ISpeechProps, state: ISpfxTexttospeakState) {
    super(props);
    this.state = {
      textcontent: ''
    };
    
    this.speech = new Speech(props,state);
    this.speech
      .init({
        volume: 1,
        lang: 'en-GB',
        rate: 1,
        pitch: 1,
        'voice': 'Google UK English Male',
        //'splitSentences': false,
        listeners: {
          onvoiceschanged: voices => {
            console.log("Voices changed", voices);
          }
        }
      })
      .then(data => {
        console.log("Speech is ready", data);
      })
      .catch(e => {
        console.log("An error occured while initializing : ", e);
      });
  }
  public render(): React.ReactElement<ISpeechProps> {
    return (
      <div>
      <TextField rows={10} label="Text content" multiline autoAdjustHeight onChange={(e, newval) => this.setState({ textcontent: newval })} />
      <br />
      <Stack horizontal tokens={sectionStackTokens}>
        <DefaultButton
          text={'Play'}
          allowDisabledFocus onClick={this.onclickPlay} />
        <DefaultButton
          text={'Stop'}
          allowDisabledFocus onClick={this.onclickStop} />
      </Stack>
    </div>
    );
  }
  private onclickStop = (): void => {
    this.speech.cancel();
  };
   
  private onclickPlay = (): void => {
    this.speech.speak({
      text: this.state.textcontent,
      queue: false,
      listeners: {
        onstart: () => {
          console.log("Start utterance");
        },
        onend: () => {
          console.log("End utterance");
        },
        onresume: () => {
          console.log("Resume utterance");
   
        },
        onboundary: event => {
          console.log(
            event.name +
            " boundary reached after " +
            event.elapsedTime +
            " milliseconds."
          );
        }
      }
    })
      .then(data => {
        console.log("Success !", data);
      })
      .catch(e => {
        console.error("An error occurred :", e);
      });
  }
}

