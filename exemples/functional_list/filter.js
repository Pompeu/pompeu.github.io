'use strict';

const list  = [1,2,3,4,5,6,7,42,319];
let listOdd  = [];
let listEven = [];

listOdd     = list.filter(checkOdd);
listEven    = list.filter(checkEven);

function checkEven(n) {
  return n%2 === 0;
}

function checkOdd (n) {
  return n%2 !==0;
}
console.log(listOdd);
console.log(listEven);
/*
   389
   54
   335
   */
