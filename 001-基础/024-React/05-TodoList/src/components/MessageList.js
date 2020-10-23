import React from 'react';
import { useSelector } from 'react-redux';
import Li from './Li';

export default ()=>{
    const data = useSelector(state=>state.data);

    return (
        <ul id="todo-list">
            {data.map(item=>{
                return (<Li key={item.id} data={item} />)
            })}
        </ul>
    );
}