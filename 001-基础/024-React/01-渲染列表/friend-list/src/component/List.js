import React,{Component} from 'react';
import '../asset/css/style.css';


export default class List extends Component{
  state={
    show:false
  };

  onoff=()=>{
    let {show} = this.state;
    this.setState({
      show:!show
    });
  };

  render(){
    let {name,children} = this.props.data;
    return (
        <dl className={this.state.show?"friend-group expanded":"friend-group"}>
            <dt onClick={this.onoff}>{name}</dt>
            
            {children.map( (child,index)=>{
              return (<dd key={index}>{child}</dd>)
            } )}
        </dl>
    );
  }

}
