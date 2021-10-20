import * as React from 'react';
import Dashboard from './Dashboard';
import LeftNav from './LeftNavigation';
import { IApplicationProps } from './IApplicationProps';
import SPCrud from './SPCRUD';
import { BrowserRouter as Router, Route, Link, Redirect, Switch, HashRouter, PropsRoute } from 'react-router-dom';
import { Stack, StackItem } from 'office-ui-fabric-react'; 
import styles from './Application.module.scss';
import 'office-ui-fabric-react/dist/css/fabric.css';
import AzureCrud from './AzureSQL';
import { WebPartContext } from '@microsoft/sp-webpart-base';
export interface IApp {
  webpartcontext:WebPartContext;
}

const App = (prop:IApp) => {
  

    return (
      
        <div>
           
          <HashRouter >  
        <Stack horizontal gap={10}>   
          <LeftNav />  
          <StackItem grow={1}>  
            <Switch>  
              
              <Route path='/' exact={true} component={() => <Dashboard   />} />  
              <Route path='/Pages' component={() => <SPCrud   />} />
              <Route path='/Apps' component={() => <AzureCrud webpartcontext={prop.webpartcontext}  />} />
            </Switch>  
          </StackItem>  
        </Stack>  
      </HashRouter>  
        </div>
       
      );
}
export default App;