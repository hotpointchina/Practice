import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default ()=>{
    const data = useSelector(state=>state.data);
    const done = data.reduce((acc,cur)=>{
        return cur.selected ? acc : ++acc;
    },0);


    const dispatch = useDispatch();
    let del = ()=>{
        let doneList = data.reduce((acc,cur)=>{
            return cur.selected ? [...acc, cur.id] : acc;
        },[]);

        dispatch({
            type:'DELECT_THEM',
            list:[...doneList]
        });
    };

    return (
        <div id="todo-stats">
            <span className="todo-count">
                <span className="number">{done}</span>
                <span className="word">项待完成</span>
            </span>

            <div className="todo-clear" onClick={del}>
                <ins>
                    Clear 
                    <b>{data.length - done}</b>
                    已完成事项
                </ins>
            </div>
        </div>
    );
}