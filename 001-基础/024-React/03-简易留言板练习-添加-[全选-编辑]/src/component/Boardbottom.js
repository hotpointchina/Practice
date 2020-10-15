import React, {Component} from 'react';


class Boardbottom extends Component{
    render(){

        // console.log('Boardbottom-->', this.props);
        let {data, isSelectorAll, removeSelected} = this.props;
        return (
            <div className="sum">
                <label>
                    <input 
                        type="checkbox" 
                        checked={isSelectorAll}
                        onChange={this.pickAll}
                    />
                    <div>选中全部</div>
                </label>

                <span onClick={removeSelected}>删除选中项</span>
                <p>当前选中{this.allChecked()}项，共{data.length}条留言</p>
            </div>
        );
    }

    // 检测所有 input 的 checked
    allChecked = ()=>{
        let checkedNumber = [...this.props.data].reduce((acc,cur)=>{
            if(cur.checked){
                acc++;
            }
            return acc;
        }, 0);
        return checkedNumber;
    }

    // 选取所有
    pickAll = ({target})=>{
        let {selectAll} = this.props;
        // console.log('pickAll-->', target.checked);

        selectAll(target.checked);
    }

}

export default Boardbottom;