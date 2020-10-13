import React, {Component} from 'react';
import List from './List';
import data from '../db/data.json';

export default class App extends Component{
    render(){
        return (
            data.map((item)=>{
                return <List
                           data={item}
                           key={item.id} 
                       ></List>;
            })            
        );
    }
}