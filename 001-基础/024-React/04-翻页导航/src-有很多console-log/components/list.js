import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Data from '../db/data.js';
import navList from '../route/navList';


let dataServe = (data)=>{
    if(data.length===0){
        return (<li>暂无数据</li>);
    }else{
        return (data.map(dl=>{
            return (<li key={dl.id}>{dl.title}</li>);
        }));
    }
}; 

// let nowDataFN = (type)=>{
//     let nowData = [];
//     if(type && type !=='all'){
//         nowData = Data[type];
//     }else{
//         navList.forEach(list=>{
//             nowData = nowData.length===0 
//                       ? [...Data[list.type]] 
//                       : [...nowData, ...Data[list.type]];
//         });
//     }
// };


export default function List(){
    let limitPagesNumber = 5;
    let {page=1} = useParams();
    let {pathname} = useLocation();
    console.log('List-pathname', pathname);
    let type = pathname.match(/(?<=\/)\w+/);
    // console.log('List-type', typeof type);
    console.log('List-type', type);
    // type = type && typeof(parseInt(type))!==Number ?  type[0] : false ;
    
    // console.log('List-type', typeof(parseInt(type)));
    if(type){
        let isnum = parseInt(type);
        if( typeof(isnum)=== 'number' && !isNaN(isnum)){
            type = false;
            console.log('========== Numer ==========');
            console.log(type, parseInt(type), typeof(parseInt(type)));
        }
        type = type[0];
    }else{
        console.log('========== false ==========')
        type = false;
    }


    console.log('List-type02', type);
    sessionStorage.setItem('type', type);

    let nowData = [];
    if(type && type !== 'all'){
        console.log('Data[type[0]]', Data[type]);
        nowData = Data[type];
    }else{
        navList.forEach(list=>{
            nowData = nowData.length===0 
                      ? [...Data[list.type]] 
                      : [...nowData, ...Data[list.type]];
        });
    }

    // console.log('List-nowData.length', nowData);
    console.log('List-nowData.length', nowData.length);
    sessionStorage.setItem('len',nowData.length);



    let start = (page-1) * limitPagesNumber;
    let end = start + limitPagesNumber;
    nowData = nowData.filter((data,index)=>index>=start&&index<end);

    return (
        <ul className="list">
            {dataServe(nowData)}
        </ul>
    );
}