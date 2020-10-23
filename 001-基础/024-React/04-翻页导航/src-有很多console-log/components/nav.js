import React from 'react';
import { NavLink,useLocation } from 'react-router-dom';
import navList from '../route/navList';


let list = [...navList];
list.unshift({
    type:"all",
    name:'全部',
    to:'/all',
    exact: true,
    isActive(pathname){
        return pathname === "/" || pathname.slice(0,4) === "/all";
    }
});

console.log('pathname',list);

function Nav(){
    const {pathname} = useLocation();
    
    return (
        <nav className="nav">
            {list.map((ls,index)=>{
                return  <NavLink
                            key={index}
                            to={ls.type==="all" ? '/' : ls.to + '/1'}
                            exact={ls.exact}
                            isActive={ls.isActive?()=>{
                                return ls.isActive(pathname)
                            }:null}
                        >
                            {ls.name}
                        </NavLink>
            })}
        </nav>
    );
}

export default Nav;