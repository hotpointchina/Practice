import React from 'react';
import Nav from '../components/nav';
import List from '../components/list';
import PageNavigation from '../components/pageNavigation';

export default function Homepage(props){
    // console.log('Homepage-->', props);

    return <div className="wrap">
                <Nav></Nav>
                <List></List>
                <PageNavigation></PageNavigation>
            </div>
}
