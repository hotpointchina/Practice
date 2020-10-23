import React from 'react';
import '../asset/css/index.css';
import Title from '../components/Title';
import AddMessage from '../components/AddMessage';
import MessageList from '../components/MessageList';
import MessageFoot from '../components/MessageFoot';
import { useSelector } from 'react-redux';


export default function App(){
    const data = useSelector(state=>state.data);
    return (
        <div id="todoapp">
            <Title title={'todo'} />

            <div className="content">
                <AddMessage />
                <MessageList />
                {data.length>0 ? <MessageFoot /> : ''}
            </div>
        </div>
    );
}

