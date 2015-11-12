'use strict';

const list = [1,2,3,4,5,6,7,42,319];
let listEven = [];
let listAdd = []; 
let sum = 0;

list.forEach(n => {
  console.log(n);
});

list.forEach((n,i) => {
  if(n % 2 === 0) listEven.push(list[i]);
  else listAdd.push(list[i]);
  sum += list[i];
});

console.log(listEven);
console.log(listAdd);
console.log(sum);
