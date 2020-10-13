import React, {Component} from 'react';
import * as config from '../config/config';
import Title from '../component/Title';
import AddMessage from '../component/AddMessage';
import List from '../component/List';
import jsonData from '../db/data';

class App extends Component{
    state = {
        data:[Object.assign({...jsonData[0]},{})]
    }

    handleAdd = (obj)=>{
        let {data} = this.state;
        if(this.checkData()){
            this.setState({
                data:[...data,obj]
            });
        }else{
            this.setState([Object.assign(data[0],obj)]);
        }
    }

    checkData = ()=>{
        let {data} = this.state;
        let coOK = data[0].nickName === '' && data[0].message === '' ? false : true;
        return coOK;
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


    render(){
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

                <List
                    data={this.checkData()? [...this.state.data] : []}
                    remove={this.removeLi}
                ></List>
            </section>
        );
    }
}

export default App;