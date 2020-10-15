import React, {Component} from 'react';

class Title extends Component{
    render(){
        let {title} = this.props;
        return (
            <h2 className="title">{title}</h2>
        );
    }
}

export default Title;