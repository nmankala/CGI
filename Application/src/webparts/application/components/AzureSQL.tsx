import * as React from 'react';
import styles from './Application.module.scss';

import { IHttpClientOptions, HttpClientResponse, HttpClient } from '@microsoft/sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';
export interface IApp {
  webpartcontext:WebPartContext;
}

const AzureCrud=(props:IApp)=>{
    const postURL = "https://prod-168.westus.logic.azure.com:443/workflows/2f7c3efe1947408e88e8a371d5eea596/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=j6WkrPgSWX-RuwpMMPTpst-C9Z7Mt4AHVb14zbTl8T0"
    const body: string = JSON.stringify({  
        'emailaddress': "mdeepansrinivasan@mdstechsolutions.onmicrosoft.com",  
        'emailSubject': "Test",  
        'emailBody': "Test",  
      }); 
    const requestHeaders: Headers = new Headers();  
    requestHeaders.append('Content-type', 'application/json');  

    const httpClientOptions: IHttpClientOptions = {  
        
        headers: requestHeaders  
      }; 
    
    const sendingmail = async (postURL,requestHeaders,httpClientOptions)=>{
      const data= await  props.webpartcontext.httpClient.get(postURL,HttpClient.configurations.v1,httpClientOptions);
            console.log("Email sent.");  
            console.log(data);
           
        
     
    }
    const buttonclick=()=>{sendingmail(postURL,requestHeaders,httpClientOptions)}
    
    return (
        <div>
            <button onClick={buttonclick}>Click Me</button>
        </div>
    )
}
export default AzureCrud;