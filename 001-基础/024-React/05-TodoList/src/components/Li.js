import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

export default (props)=>{
    const {message,id,selected} = props.data;
    const dispatch = useDispatch();
    

    // 单个删除
    const delFN = ()=>{
        dispatch({
            type:'DELECT_SINGLE',
            id
        });
    };


    // 进入编辑模式
    const [val,setVal] = useState('');
    const [edit,setEdit] = useState(false);
    const editInput = useRef();
    const nowEdit = ()=>{
        setEdit(true);
    };
    const EditDone = ()=>{
        if(val.trim()===''){
            setVal(message);
        }else{
            dispatch({
                type:'UPDATE_MESSAGE',
                id,
                message:val
            });
        }
        setEdit(false);
    };
    const isayOK = ({keyCode})=>{
        if(keyCode===13){
            EditDone();
        }
    };
    useEffect(()=>{
        setVal(message);
    },[message]);
    useEffect(()=>{
        editInput.current.focus();
    },[edit]);



    return (
        <li className={edit?'editing':''}>
            <div className={selected?"todo done":"todo"}>
                <div className="display" style={{display: edit?'none':'block'}}>
                    <input 
                        className="check" type="checkbox" 
                        checked={selected}
                        onChange={({target})=>{
                            dispatch({
                                type: 'CHECKING',
                                id,
                                selected:target.checked
                            });
                        }}
                    />
                    <div className="todo-content" onDoubleClick={nowEdit}>{message}</div>
                    <span className="todo-destroy" onClick={delFN} title={id}></span>
                </div>


                <div className={edit?"":'edit'}>
                    <input 
                        className="todo-input" type="text" 
                        ref={editInput}
                        value={val} 
                        onChange={({target})=>{
                            setVal(target.value);
                        }}
                        onKeyDown={isayOK}
                        onBlur={EditDone}
                    />
                </div>
            </div>
        </li>
    );
}