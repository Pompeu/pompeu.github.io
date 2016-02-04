'use strict';

const list  = [1,2,3,4,5,6,7,42,319];
let sum     = 0;
let sumOdd  = 0;
let sumEven = 0;

sum     = list.reduce((n, i) => n+i , 0);

sumOdd  = list
.filter(n => n%2 === 0)
.reduce((n,i) => n+i,0);

sumEven = list
.filter(n => n%2 !== 0)
.reduce((n,i) => n+i,0);

console.log(sum);
console.log(sumOdd);
console.log(sumEven);

// 389
// 54
// 335
