import {Drag} from './libs/Drag';
// let Drag = require('./libs/Drag.ts');

console.log('Drag-->',Drag);

let h1 = <HTMLElement>document.querySelector('h1');
let drag = new Drag(h1);

// console.log('Drag-->', Drag);