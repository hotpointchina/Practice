import React, {Component, Fragment} from 'react';
import * as config from '../config/config';
import Title from '../component/Title';
import AddMessage from '../component/AddMessage';
import List from '../component/List';
import Boardbottom from '../component/Boardbottom';
import jsonData from '../db/data';

class App extends Component{
    state = {
        data:[Object.assign({...jsonData[0]},{})],
        isSelectorAll:false
    }

    handleAdd = (obj)=>{
        let {data} = this.state;
        if(this.checkData()){
            this.setState({
                data:[...data,obj],
                isSelectorAll:false
            });
        }else{
            this.setState([Object.assign(data[0],obj)]);
        }
    }

    checkData = ()=>{
        let {data} = this.state;

        // 如果第 0 条数据使用的是 默认数据，返回 false
        let coOK = data[0].nickName === '' && data[0].message === '' ? false : true;
        return coOK;
    }

    sendData = ()=>{
        return this.checkData()? [...this.state.data] : [];
    }


    removeLi = id=>{
        let stateData = [...this.state.data];
        stateData = stateData.filter(d=>d.id !== id);

        if(stateData.length>0){
            this.setState({
                data:stateData
            });
        }else{
            this.setState({
                data:[Object.assign({...jsonData[0]},{})]
            });
        }
        console.log('removeLi-jsonData-->', jsonData);
    }


    // 点击 input 的 checkbox
    handleInputChecked = (id, checked)=>{
        let {data} = this.state;

        for(let i=0; i<data.length; i++){
            if(data[i].id === id){
                data[i].checked = checked;
                break ;
            }
        }
        this.setState({data});

        // 切换底部全选框的状态
        if(data.some(it=>it.checked===false)){
            this.setState({isSelectorAll:false});
        }else{
            this.setState({isSelectorAll:true});
        }
    }


    // 全选所有列表
    selectAll = (isBoolean)=>{
        // console.log('全选-->');
        let {data} = this.state;
        if(isBoolean){
            data.forEach(it=>it.checked = true);
            this.setState({isSelectorAll:true});
        }else{
            data.forEach(it=>it.checked = false);
            this.setState({isSelectorAll:false});
        }
        this.setState({data});
    }


    removeSelected = ()=>{
        let {data} = this.state;
        data = data.filter(it=>it.checked===false);

        if(data.length===0){
            data = [Object.assign({...jsonData[0]},{})];
            this.setState({isSelectorAll:false});
        }

        // console.log('removeSelected-->', data);
        this.setState({data});
    }

    // 编辑留言信息
    editMessage = (id,str)=>{
        // console.log('editMessage-->', id, str);
        let {data} = this.state;
        for(let i=0; i<data.length; i++){
            if(data[i].id === id){
                data[i].message = str;
                break ;
            }
        }

        this.setState({data});
    }



    render(){
        // console.log('APP-->', (this.sendData()).length );
        let {isSelectorAll} = this.state;
        return (
            <section className="wrap">
                <Title title={config.projectName} />
                
                <AddMessage
                    hintNickNmae={config.defaultInfo.nickName}
                    hintMessage={config.defaultInfo.message}
                    hintButton={config.defaultInfo.button}
                    add={this.handleAdd}
                    data={[...this.state.data]}
                ></AddMessage>


                {
                    (this.sendData()).length>0 && (<Fragment>
                        <List
                            data={this.sendData()}
                            remove={this.removeLi}
                            handleInputChecked={this.handleInputChecked}
                            editMessage={this.editMessage}
                        ></List>

                        <Boardbottom
                            data={this.sendData()}
                            isSelectorAll={isSelectorAll}
                            selectAll={this.selectAll}
                            removeSelected={this.removeSelected}
                        />
                    </Fragment>)
                }
            </section>
        );
    }
}

export default App;