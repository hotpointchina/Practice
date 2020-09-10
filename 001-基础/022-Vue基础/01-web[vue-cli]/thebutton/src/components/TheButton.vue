<template>
    <div id="box">
        <p>
            <b>点击下方按钮输出些内容</b>
            <br />
            <span>最多输出 {{edge+1}} 次</span>
        </p>
        <button ref="z-button" @click="say">
            <slot></slot>
        </button>
        <article ref="article"></article>
    </div>
</template>

<script>
    export default {
        name:'thebutton',
        props:{
            disbaled:{
                type:Boolean,
                default:true,
                require:true
            },
            edge:{
                type:Number,
                default:3
            }
        },
        data:()=>{
            return {
                theNumber:0
            }
        },
        methods:{
            say(){
                if(this.disbaled){
                    this.$refs.article.innerHTML += '<b>' + (++this.theNumber) + '</b>';
                    this.$emit('sendCount', this.theNumber);                
                }else{
                    this.css(this.$refs['z-button'], {
                        opacity:0.5,
                        cursor:'not-allowed'
                    });
                }
            },
            css(el, obj){
                for (let item in obj) {
                    el.style[item] = obj[item];
                }
            }
        }
    }
</script>

<style scoped>
#box{
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
button{
    width: 90px;
    margin:5px;
    background:cornflowerblue none;
    border:0px;
    border-radius:5px;
    color:aliceblue;
    font-size: 18px; line-height: 30px;
    text-align: center;
    cursor: pointer;
}
button:hover{
    opacity: 0.9;
}
article{
    width: 300px; max-height: 345px;
    margin: 20px 0px 0px;
}
</style>