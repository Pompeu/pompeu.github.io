'use strict';

const list = [1,2,3,4,5,6,7,42,319];
const listLen = list.length;

for(let i = 0; i < listLen; i++){
  console.log(list[i]);
}

let listEven = [];
let listAdd = []; 
let sum = 0;

for(let i = 0; i < listLen; i++){
  if(i % 2 === 0) listEven.push(list[i]);
  else listAdd.push(list[i]);
  sum += list[i];
}

console.log(listEven);
console.log(listAdd);
console.log(sum);
