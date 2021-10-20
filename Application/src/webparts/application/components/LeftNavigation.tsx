import * as React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch, HashRouter, PropsRoute } from 'react-router-dom'; 
import styles from './Application.module.scss';
import { Stack, StackItem } from 'office-ui-fabric-react'; 
import { Nav, INavLink } from 'office-ui-fabric-react/lib/Nav';
const LeftNav = () => {
    return (
        <React.Fragment>
        <div>
          <Nav
            expandButtonAriaLabel="Expand or collapse"
            ariaLabel="Nav basic example"
            styles={{
              link: {
                background: "#808080",
                color: "#fff",
              },
              root: {
                background: "#808080",
                width: 208,
                height: "auto",
                boxSizing: 'border-box',
                border: '1px solid #eee',
                overflowY: 'auto'
              }
  
            }}
            groups={
              [
                {
                  links: [
                    {
                      iconClassName: styles.button,
                      name: 'DashBoard',
                      url: '#/',
                      key: 'key2',
                      isExpanded: true,
  
                    },
                    {
                      name: 'Apps',
                      url: '#/Apps',
                      key: 'key3',
                      isExpanded: true,
                    },
                    {
                      name: 'Pages',
                      url: '#/Pages',
                      key: 'key4',
                    }
                  ]
                }
              ]}
          />
        </div>
        </React.Fragment>
      );
}
export default LeftNav;