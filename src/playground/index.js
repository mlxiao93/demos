import './index.scss'

let box = document.querySelector('.box');

let target = document.documentElement;
// let target = box;
console.log(target.clientHeight);
console.log(target.offsetHeight);
console.log(target.scrollHeight);

console.log(box.getBoundingClientRect());

// console.log(box.offsetHeight, box.clientHeight);
// console.log(box.offsetTop);

