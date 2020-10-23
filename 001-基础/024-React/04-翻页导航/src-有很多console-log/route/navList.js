const navList = [
    {
        type:"good",
        name:'精华',
        to:'/good',
        exact: false,
        isActive(pathname){
            return pathname === "/good" || pathname.slice(0,5) === "/good"
        }
    },
    {
        type:"share",
        name:'分享',
        to:'/share',
        exact: false,
        isActive(pathname){
            return pathname === "/share" || pathname.slice(0,6) === "/share"
        }
    },
    {
        type:"ask",
        name:'问答',
        to:'/ask',
        exact: false,
        isActive(pathname){
            return pathname === "/ask" || pathname.slice(0,4) === "/ask"
        }
    }
];

const navTo = navList.map(n=>n.to);

export default navList;
export {navTo};
