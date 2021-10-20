import * as React from 'react';
import styles from './Application.module.scss';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

import {
   
    PrimaryButton,
    IButtonStyles,
    
  } from '@fluentui/react';

const SPCrud =()=>{
    //Create Item
    const createItem = async () => {
      try {
        const addItem = await sp.web.lists.getByTitle("EmployeeDetails").items.add({
          'Title': document.getElementById("fullName")['value'],
          'Age': document.getElementById("age")['value']
        });
        console.log(addItem);
        alert(`Item created successfully with ID: ${addItem.data.ID}`);
      }
      catch (e) {
        console.error(e);
      }
    }
   
    
  //Get Item by ID
    const getItemById = async () => {
      try {
        const id: number = document.getElementById('itemId')['value'];
        if (id > 0) {
          const item: any = await sp.web.lists.getByTitle("EmployeeDetails").items.getById(id).get();
          document.getElementById('fullName')['value'] = item.Title;
          document.getElementById('age')['value'] = item.Age;
        }
        else {
          alert(`Please enter a valid item id.`);
        }
      }
      catch (e) {
        console.error(e);
      }
    }
   
    
  //Get all items
    const getAllItems = async () => {
      try {
        const items: any[] = await sp.web.lists.getByTitle("EmployeeDetails").items.get();
        console.log(items);
        if (items.length > 0) {
          var html = `<table><tr><th>ID</th><th>Full Name</th><th>Age</th></tr>`;
          items.map((item, index) => {
            html += `<tr><td>${item.ID}</td><td>${item.Title}</td><td>${item.Age}</td></li>`;
          });
          html += `</table>`;
          document.getElementById("allItems").innerHTML = html;
        } else {
          alert(`List is empty.`);
        }
      }
      catch (e) {
        console.error(e);
      }
    }
   
    
  //Update Item
    const updateItem = async () => {
      try {
        const id: number = document.getElementById('itemId')['value'];
        if (id > 0) {
          const itemUpdate = await sp.web.lists.getByTitle("EmployeeDetails").items.getById(id).update({
            'Title': document.getElementById("fullName")['value'],
            'Age': document.getElementById("age")['value']
          });
          console.log(itemUpdate);
          alert(`Item with ID: ${id} updated successfully!`);
        }
        else {
          alert(`Please enter a valid item id.`);
        }
      }
      catch (e) {
        console.error(e);
      }
    }
   
    
  //Delete Item
    const deleteItem = async () => {
      try {
        const id: number = parseInt(document.getElementById('itemId')['value']);
        if (id > 0) {
          let deleteItem = await sp.web.lists.getByTitle("EmployeeDetails").items.getById(id).delete();
          console.log(deleteItem);
          alert(`Item ID: ${id} deleted successfully!`);
        }
        else {
          alert(`Please enter a valid item id.`);
        }
      }
      catch (e) {
        console.error(e);
      }
    }
    return(
        <div className={styles.application}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <div className={styles.itemField}>
                <div className={styles.fieldLabel}>Item ID:</div>
                <input type="text" id='itemId'></input>
              </div>
              <div className={styles.itemField}>
                <div className={styles.fieldLabel}>Full Name</div>
                <input type="text" id='fullName'></input>
              </div>
              <div className={styles.itemField}>
                <div className={styles.fieldLabel}>Age</div>
                <input type="text" id='age'></input>
              </div>
              <div className={styles.itemField}>
                <div className={styles.fieldLabel}>All Items:</div>
                <div id="allItems"></div>
              </div>
              <div >
                <div className={styles.button}>
                    
                <PrimaryButton text="Create" onClick={createItem}  />
                
                </div>
                <div className={styles.button}>
                  
                  <PrimaryButton text="Read" onClick={getItemById}  />
                </div>
                <div className={styles.button}>
                
                  <PrimaryButton text="Read All" onClick={getAllItems}  />
                </div>
                <div className={styles.button}>
                 
                  <PrimaryButton text="update Item" onClick={updateItem}  />
                </div>
                <div className={styles.button}>
                  
                  <PrimaryButton text="Delete" onClick={deleteItem}  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    
}
export default SPCrud;