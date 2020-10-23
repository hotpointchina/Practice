import {createStore} from 'redux';

// 勾选与否
const checking = (data,action)=>{
    const {id,selected} = action;
    for(let i=0; i<data.length; i++){
        if(data[i].id === id){
            data[i].selected = selected;
            break ;
        }
    }
    return [...data];
};

// 删除勾选项
const delectThemFN = (data,action)=>{
    let survive = [...data];
    action.list.forEach(item=>{
        for(let i=0; i<survive.length; i++){
            if(survive[i].id === item){
                survive.splice(i,1);
            }
        }
    });
    return survive;
};

const updateMessage = (data, action)=>{
    const {id, message} = action;
    for(let i=0; i<data.length; i++){
        if(data[i].id === id){
            data[i].message = message;
            break ;
        }
    }
    return [...data];
};

function reducer(
    state={
        data:[]
    }, action
){
    
    const nowdata = [...state.data];
    const id = state.data.reduce((acc,cur)=>{
        if(cur.id && cur.id>acc){
            return acc = cur.id + 1;
        }else{
            return ++acc;
        }
    },0);

    switch (action.type) {
        case "ADD":
            let {message} = action;
            return {
                data:[
                    {id, message, selected:false},
                    ...nowdata
                ]
            }

        case 'CHECKING':
            // 勾选与否
            return {
                data:[ ...checking([...nowdata], action) ]
            }
        case 'DELECT_THEM':
            return {
                data:[ ...delectThemFN([...nowdata], action) ]
            };
        case 'DELECT_SINGLE':
            return {
                data: [...nowdata].filter(it=>it.id !== action.id)
            };

        case 'UPDATE_MESSAGE':
            return {
                data: [ ...updateMessage([...nowdata], action) ]
            }
        default:
            break;
    }
    
    return state;
}

export default createStore(reducer);