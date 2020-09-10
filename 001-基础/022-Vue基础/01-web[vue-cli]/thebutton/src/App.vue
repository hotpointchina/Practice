<template>
  <div id="app">
    <TheButton 
      :disbaled="setdisbaled" 
      :edge="edge"
      @sendCount="getCount"
    >
        {{info}}
    </TheButton>
  </div>
</template>

<script>
import TheButton from './components/TheButton.vue';
export default {
  name: 'App',
  data:()=>{
    return {
      info:'Click',
      setdisbaled:true,
      edge:4
    }
  },

  components: {
    TheButton
  },
  
  methods:{
    getCount(num){
      num>this.edge ? this.setdisbaled=false : this.setdisbaled= true;
    }
  }
}
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
b{
    display: inline-block;
    margin: 0px 10px;
}
</style>
