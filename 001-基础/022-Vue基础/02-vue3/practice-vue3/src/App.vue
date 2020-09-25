<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <br><hr><br>
  <div class="turnover">
    <b>【父级组件】</b>
    销售量：{{turnover}}
  </div>
  <br><hr><br>
  <Practice />
  <br><hr><br>
  <Communication :turnover="turnover" @turnovernow="turnOverNow"></Communication>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import {ref, provide} from 'vue';
import Practice from "./components/Practice";
import Communication from "./components/Communication";

export default {
  name: "App",
  components: {
    Practice,
    Communication
  },

  setup(){

    /*
      'sendDown' 是 key ，子级使用 inject 接收时，也需要书写 'sendDown' 进行获取对应的值。
      后面是要传递的内容
    */ 
    provide('sendDown', '传递到子级的信息。');

    let turnover = ref(3);
    return {
      turnover,
      turnOverNow:(number)=>{
        // console.log('App - turnOverNow-->', number);
        turnover.value = number;
      }
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.turnover{
    padding:20px 0px;
    background:cornflowerblue none;
    color:aliceblue;
}
</style>
