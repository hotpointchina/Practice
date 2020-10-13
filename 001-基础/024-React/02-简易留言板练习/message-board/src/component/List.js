import React, {Component} from 'react';
import Li from '../component/Li';

class List extends Component{
    forLI = ()=>{
        let {data,remove} = this.props;

        if(data.length===0){
            return ''
        }else{
            return data.map(item=>{
                return <Li  
                            key={item.id}
                            id={item.id}
                            nickName={item.nickName}
                            message={item.message}
                            remove={remove}
                        ></Li>
            });
        }
    }

    render(){
        return (
            <ul className="messageList">
                {this.forLI()}
            </ul>
        );
    }
}

export default List;