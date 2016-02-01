'use strict';

const	list  	=	[1,2,3,4,5,6,7,42,319];
let	listEven	=	[];
let	listOdd	  =	[]; 

listEven  = list.filter(n => n%2 === 0)
listOdd		= list.filter(n => n%2 !== 0)

console.log(listEven);
console.log(listOdd);

/*
  [ 2, 4, 6, 42 ]
  [ 1, 3, 5, 7, 319 ]
*/
