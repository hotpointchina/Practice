import React, {Component} from 'react';
import Li from '../component/Li';

class List extends Component{
    forLI = ()=>{
        let {data} = this.props;
        // console.log('List-->', this.props);
        // console.log('List-->', data);

        let handleFunction = Object.keys(this.props).reduce((acc,cur)=>{
            if(cur!=='data'){
                acc[cur]=this.props[cur];
            }
            return acc;
        },{});
        // console.log('List- handleFunction', handleFunction);
        // console.log('List- handleFunction', Object.keys(handleFunction).length);

        if(data.length===0){
            return ''
        }else{
            return data.map(item=>{
                return <Li  
                            key={item.id}
                            data={{...item}}
                            handleFunction={{...handleFunction}}
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