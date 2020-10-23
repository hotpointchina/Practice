import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

export default ()=>{
    const dispatch = useDispatch();
    const input = useRef();
    useEffect(()=>{
        input.current.focus();
    },[]);
    
    
    let [message, setmes] = useState('');
    const change = ({target})=>{
        setmes(target.value);
    };
    // 提交
    const submit = ({target,keyCode})=>{
        if(target.value.trim()==='') return ;
        if(keyCode===13){
            dispatch({
                type:'ADD',
                message:target.value
            });
            setmes('');
        }
    };

    return (
        <div id="create-todo">
            <input 
                id="new-todo"
                type="text" 
                placeholder="What needs to be done?"
                ref={input}
                value={message}
                onChange={change}
                onKeyDown={submit}
            />
        </div>
    );
}