<center>
 <h1> Callback sync e async, Entendo process.nextTick </h1>
</center>

 <center>
  ![wrk-table](/images/nexttick.png)
 </center>

  Essa imagem representa o ciclo do event loop do NodeJS, ele trabalha de forma simples como um <em> handler </em> que fica procurando eventos para resolvelos, isso é uma definição baisca, leia mais sobre em :<a href="https://strongloop.com/strongblog/node-js-event-loop/" target="_blanck"> event loop </a>, por sinal esse post do strongloop, faz comparações de código C# e Ruby vale a pena ler.

# Callback Sync Vs Async

Sim se você não sabia ainda, pode sim existir callback sincrono, é isso pode impactar no seu sistema, porem  de modo geral, são callbacks criados por nós mesmo quando estamos desenvolvendo nosso modulus, vamos ver um exemplo.

```js
'use strict';

let sum = (a, b, cb) => cb(a + b);

sum(1, 2, res => {
      console.log(res);
});

console.log("soma");
```

Caso você já seja acostumado com javascript deve imaginar que a string "soma", sera impressa no console, antes do valor do callback, porem ao testar esse código surpresa? a resposta vem antes, veja o resultado abaixo.

```sh
node cb-sync.js 
3
soma
```
<center>
 ![wrk-table](/images/bebe-assustado.jpg)
 </center>

 Confesso que primeira vez, que vi fiquei assustado, pois pense vocês eu estava tendo um problema em um projeto com um banco de dados SQL, onde havia vários callback dessa forma, havia casos onde um simples request local demorar alguns segundos era assustador, até parecia que estava usando outras linguagens.

 Porem depois de perder algum tempo estudando e depurando o código percebi que o  problema eram alguns callbacks(sincronos), eles estavam parando o eventloop, assim eu tive procurar motivo, encontrei, e consegui resolver esse probleminha assim melhorando e muito a performance buscas. Veja como foi resolvido o problema usando process.nextTick, no próximo código de exemplo.


 ```js
 'use strict';

 let sum = (a, b, cb) => process.nextTick(
 () => {
       cb(a+b);
 });

 sum(1, 2, res => {
       console.log(res);
 });

 console.log("soma");

 ```

 Vamos entender esse código? primeiro tudo que mudou nele foi, eu usei process.nextTick,
 para dar continuidade no event loop, com isso "a fila andou KKK", e como resposta o desempenho melhorou certo.

 O problema com o banco de dados, foi resolvido de forma similar, eu criei um modulo que usava para todos callback o process.netTick era chamado e pronto problema resolvido.

 Vamos ver agora qual seria o resultado apresentado no console da execução desse do modulo suma?

 ```sh
 node cb-async.js 
 soma
 3
 ```
 Ou seja o event loop não parou, o NodeJS trabalhou da forma esperada que é assincronamente, mostrando o fator que o faz ser poderoso.

# Concluindo

Fica essa simples dica sobre, como a falta de estudar a API da plataforma/linguagem onde se trabalha, pode ser prejudicial a ao projeto, entender  como a sua ferramenta funciona é de entrama importância, e cuidado com os callbacks síncronos :P.

