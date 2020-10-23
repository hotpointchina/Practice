import React from 'react';
import Isgone from '../views/404';
import Homepage from '../views/Homepage';
// import navList from '../route/navList';
// import { Redirect } from 'react-router-dom';


const routerList = [
    {
        path:['/','/:page','/all','/all/:page', '/home','/home/:page'],
        exact:true,
        render(props){
            const {pathname} = props.location;
            const {page="1"} = props.match.params;

            if( pathname==='/' ){
                let notIndex = pathname !== '/' || pathname !== '/home';
                console.log('notIndex-->', notIndex);
                if(notIndex && page>0 && parseInt(page)+"" === page){
                    return <Homepage {...props} />
                }
            }else if((/(?<=\/)\d+/).test(pathname)){
                console.log('else if((/(?<).test(pathname)-->');
                return <Homepage {...props} />
            }else{
                console.log('404-->');
                return <Isgone />
            }
        },
    },
    {
        path:['/good','/good/:page'],
        exact:true,
        render(props){
            return <Homepage {...props} />
        }
    },
    {
        path:['/share','/share/:page'],
        exact:true,
        render(props){
            return <Homepage {...props} />
        }
    },
    {
        path:['/ask','/ask/:page'],
        exact:true,
        render(props){
            return <Homepage {...props} />
        }
    },




    {
        path:'',
        render(){
            console.log('Isgone-->');
            return <Isgone />
        }
    }
];

export default routerList;