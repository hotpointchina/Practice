// 'use strict';


// console.log('ZPromise');

export default class Zpromise{
    
    constructor(fn){
        if(typeof fn !== 'function'){
            throw new Error('aaaaa');
        }
        this.fnQueue = [];

        fn(this._resolve.bind(this));

    }


    _resolve(data){
        // let fn1 = this.fnQueue.shift();
        // let fn1;
        // while(fn1 = this.fnQueue.shift()){
        //     fn1(data);
        // }

        console.log('_resolve-data-->',data);
        if(this.fnQueue.length > 0){
            let fn1 = this.fnQueue.shift();
            return fn1(data);
        }else{
            return data;
        }
        // console.log(this.fnQueue)

    }

    then(fn){
        this.fnQueue.push(fn);
        // this.fnQueue.length
        // this._resolve()

    }

}



// export default class Player{
//     constructor(name){
//         this.name = name;
//         this.heroes = [new Yase, new Luban];
//     }
// }