<template>
    <div>
        {{msg}}
        <br /><br />
        <hr />
        <br /><br />
        
        <p>
            <b id="tagb" ref="tagB">{{count}}</b>
            <ins>{{double}}</ins>
        </p>
        <button @click="changeCount" title="大于3变化颜色">count++</button>
    </div>
</template>

<script>
import {computed, onMounted, ref, watch, watchEffect} from 'vue'
export default {
    setup(){
        let msg = ref('Vue 3.000000');
        console.log(msg.value);

        let tagB = ref();
        onMounted(()=>{
            console.log('tagB-->', tagB);
        });

        let count = ref(0);
        let double = computed(()=>{
            return count.value * 2;
        });

        watch('double', (newValue, oldValue)=>{
            console.log('watch [double] -->', newValue, oldValue);
        });

        watchEffect(()=>{
            // console.log(a, count.value);
            if(count.value > 3){
                tagB.value.style['background-color'] = 'darkred';
                tagB.value.style.color = 'aliceblue';
            }
        });

        return {
            msg,
            count,
            double,
            tagB,
            changeCount:()=>{
                count.value++;
            },
            
        }
    }
}
</script>

<style scoped>
#tagb,
ins{
    margin: 0px 16px; padding: 8px 30px;
    border-radius: 6px;
}
</style>