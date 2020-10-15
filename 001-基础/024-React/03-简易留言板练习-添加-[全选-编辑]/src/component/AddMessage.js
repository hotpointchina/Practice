import React, {Component} from 'react';



class AddMessage extends Component{
    state = {
        nickName:'',
        message:''
        
    }

    changeNickName = ({target}) => {
        this.setState({
            nickName:target.value
        });
        // console.log('input-Change->>', target.value);
    }
    changeMessage = ({target}) => {
        this.setState({
            message:target.value
        });
        // console.log('changeMessage->>', target.value);
    }

    submit = ()=>{
        let {nickName, message} = this.state;
        if(nickName===''){
            alert('请输入昵称。');
            return ;
        }
        if(message===''){
            alert('请输入留言信息。');
            return ;
        }

        let {add,data} = this.props;
        let id = [...data].reduce((acc,cur)=>{
            return acc.id<cur.id ? {id:cur.id} : acc;
        },{id:0});
        id = ++id.id;

        add({
            id,
            nickName,
            message,
            checked:false
        });
        this.setState({
            nickName:'',
            message:''
        });
    }


    render(){
        let {hintNickNmae, hintMessage, hintButton} = this.props;
        let {nickName, message} = this.state;
        return (
            <div id="add_message_box" className="addMessage">
                <input type="text" 
                    placeholder={hintNickNmae} 
                    value={nickName}
                    onChange={this.changeNickName}
                />
                <textarea 
                    placeholder={hintMessage}
                    value={message}
                    onChange={this.changeMessage}
                ></textarea>

                <button onClick={this.submit}>{hintButton}</button>
            </div>
        );
    }
}

export default AddMessage;