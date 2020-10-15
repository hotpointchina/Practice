import React, {PureComponent, createRef} from 'react';

class Li extends PureComponent{

    state = {
        edit: false,
        val:this.props.data.message
    }

    editTextarea=createRef()

    componentDidUpdate(prevProps, prevState){
        if(!prevState.edit && this.state.edit){
            this.editTextarea.current.focus();
        }
    }


    removeThis = ()=> {
        let {data:{id}, handleFunction:{remove}} = this.props;
        remove(id);
    }

    ChangeInputState = ({target})=>{
        let {data:{id}, handleFunction:{handleInputChecked}} = this.props;
        handleInputChecked(id, target.checked);
    }

    isEdit = ()=>{
        this.setState({
            edit:true
        });
    }


    render(){
        let {id,nickName, message, checked} = this.props.data;
        let {editMessage} = this.props.handleFunction;
        let {edit,val} = this.state;


        return (
            <li>
                <h3>{nickName}</h3>

                <input 
                    type="checkbox" 
                    checked={checked}
                    onChange={this.ChangeInputState}
                />
                
                <p 
                    onDoubleClick={this.isEdit}
                    style={{display:edit?'none':'block'}}
                >{message}</p>

                <textarea 
                    ref={this.editTextarea}
                    style={{display:edit?'block':'none'}}
                    value={val}
                    onChange={({target})=>{
                        this.setState({
                            val:target.value
                        })
                    }}
                    onBlur={()=>{
                        if(val.trim()){
                            // console.log('编辑');
                            editMessage(id,val);
                        }else{
                            this.setState({
                                val:message
                            });
                        }
                        
                        this.setState({
                            edit:false
                        });
                    }}
                ></textarea>
                
                <span onClick={this.removeThis}>删除</span>
            </li>
        );
    }
}
export default Li;