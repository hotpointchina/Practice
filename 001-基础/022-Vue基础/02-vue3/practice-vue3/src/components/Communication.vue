<template>
    <div id="communication">
        <b>【子级组件】</b>
        <p>组件通信： 销售量 --> {{count}}</p>
        <button @click="changeTurnOver">销售量++</button>
    </div>
</template>

<script>
import { inject, ref } from 'vue';
export default {
    props:{
        turnover:{
            type:Number,
            default:0,
            require:true
        }
    },
    // props:['turnover'],

    setup(props, context){

        let getInfo = inject('sendDown');
        console.log('getInfo - sendDown-->', getInfo);

        console.log('context-->', context);
        let count = ref(props.turnover);
        let changeTurnOver = function(){
            count.value++;
            context.emit('turnovernow', count.value);
        };

        return {
            count,
            changeTurnOver
        }
    }
}
</script>

<style scoped>
#communication{
    padding:20px 0px;
    background:cornflowerblue none;
    color:aliceblue;
}
</style>