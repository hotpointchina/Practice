import React, {Component} from 'react';

class Li extends Component{
    removeThis = ()=> {
        let {id, remove} = this.props;
        remove(id);
    }

    render(){
        let {nickName, message} = this.props;
        return (
            <li>
                <h3>{nickName}</h3>
                <p>{message}</p>
                <a onClick={this.removeThis}>删除</a>
            </li>
        );
    }
}
export default Li;