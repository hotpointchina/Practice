import React from 'react';
import {NavLink, Link, useParams} from 'react-router-dom';


export default ()=>{
    console.log('page - getItem-->', sessionStorage.getItem('len'));

    // const {type="good",page=1} = useParams();
    let type = sessionStorage.getItem('type');
    type = type === 'undefined' ? 'all' : type;
    console.log('page - type-->', type);
    
    const {page=1} = useParams();

    // let nowData = data[type];
    let nowDataLength = parseInt(sessionStorage.getItem('len'));
    const len = 5;
    const pageLen = Math.ceil(nowDataLength/len);
    console.log('===========================================', pageLen);

    let goto = (type,page)=>{
        page = Math.max(parseInt(page), 1);
        page = Math.min(parseInt(page), pageLen);
        return type==='false' || type==='undefined' ? `/all/${page}` : `/${type}/${page}`;
    };



    function setNub() {
        let nubs = [];
        for(let i = 1;i<=pageLen;i++){
            if(i === page){
                nubs.push(<b key={i}>{i}</b>);
            } else {
                nubs.push(<NavLink to={goto(type,i)} key={i}>{i}</NavLink>);
            }        
        }
        nubs.unshift(<Link to={goto(type, parseInt(page)-1)} key={'pre'}>{"上一页"}</Link>);
        nubs.push(<Link to={goto(type, parseInt(page)+1)} key={'next'}>{"下一页"}</Link>);
        return nubs;
    }
    return  <nav className="pagination">
                {setNub()}
            </nav>;
}