# Promise Nativa nodeJS(sem -harmony)

No mundo assíncrono do javascript, as vezes fica muito complexo entender o ciclo das informações,  o já famoso e debatido callbackhell é realmente um problema na manutenção dos códigos, contudo uma grande alternativa para resolver esse problema é usar Promise.

Vejamos um exemplo de callbackhell no código 01, pois bem callbackhell se da quando uma função necessita do resultado de outra, basicamente é isso, contudo vale salientar que Promise não é a única soluçãoi, porem é uma das mais elegantes.

<center> <strong> Código 01 </strong></center>

```js

function pessoas(cb) {
  var fs = require('fs');
  var assert = require('assert');
  var allPersons = [];
  fs.readFile('amigos.json','utf8', function(err , amigos){
    if(!err){
      fs.readFile('pessoas.json', 'utf8', function(err, pessoas){
        if(!err){
          allPersons = allPersons.concat(JSON.parse(amigos), JSON.parse(pessoas));
          return cb(null,allPersons);
        }else{
          return cb(err, null);
        }       
      });
    }else{ 
      return cb(err, null);
    }
  });
} 

module.exports = pessoas;

```

O código 01, basicamente esta lendo dois json, concatenando eles e colocando-os um Array, retornando-os na função de callback, varias estrategias poderiam ser usadas para melhorar esse código, programação funcional, libs como lodash ou underscore (_.***) ajudariam resolver o problema, os métodos Array.prototype.* poderiam facilmente resolver, porem em algumas situações nos desenvolvedores herdamos códigos para mantelos e esse tipo de situação é vista, no estado atual temos solução nativa que  ajuda muito a resolver esse poblema de legibilidade.

Quando  atualizei meu nodeJS para v0.12.7, me deparei com novo modulo nativo, Promise, pois bem eu percebi que não era um modulo....OMG,  não preciso importar nada para usa-lo, ele esta disponivel no Process do nodeJS, pois ele veio do V8. Digitando no seu terminal node entretanto no modo interativo do nodeJS e ditando Promise.+tab, pronto esta la Promise "nativa".

<center> <strong> Fígura 01 </strong></center>

```
user@user:~$ node
> Promise.
Promise.__defineGetter__      Promise.__defineSetter__
Promise.__lookupGetter__      Promise.__lookupSetter__
Promise.__proto__             Promise.constructor
Promise.hasOwnProperty        Promise.isPrototypeOf
Promise.propertyIsEnumerable  Promise.toLocaleString
Promise.toString              Promise.valueOf

Promise.apply                 Promise.arguments
Promise.bind                  Promise.call
Promise.caller                Promise.length
Promise.name                  

Promise.accept                Promise.all
Promise.defer                 Promise.prototype
Promise.race                  Promise.reject
Promise.resolve

```
Fiquei empolado em ver compartilhei com os NODEROS do facebook e Twiter, e resolvi fazer esse poste e gravar um video de como usar o basico dessa funcionalidade que nodeJS tem agora, já havia visto que com uso da flag -harmony a Promise funcionava acho que nave v0.11.4+, porem agora roda sozinho sem flag. Vamos voltar ao código para deixar ele mais organizado e legível, vamos usar Promise.

<center> <strong> Código 02 </strong></center>

```js

function fileOpen (path, encoding) {
  var fs = require('fs');
  return new Promise(function(resolve, reject) {
    fs.readFile(path, encoding , function (err, res) {
      if (res) { resolve(res);}
      else { reject(new Error(err));}
    });
  });
}

module.exports = fileOpen;

```

É nítido! o segundo modulo possui uma simplicidade maior quanto à implementação, e claramente pode ser reusado por conta da flexibilidade em que foi escrito,  o código 01 se criado para reuso a complexidade e verbosidade ficaria ainda maior, tornando-o muito duro de manter, lembrando que são dois simples json, imagine se fosse varias consultas a um DB ou requests http? seria "imanutentivel"(KKKKKK) Agora vamos passar para a parte do uso das api criadas, a ideia é consumir as apis e unir dois jsons em apens um.

Um detalhe  é se por algum motivo houver a necessidade de um novo json ser usado a primeira api já quebra e a segunda não, vamos verificar no código 03 o porque disso. O código 03 representa o client do próprio nodeJS, que poderia ser um navegador caso usássemos o googlechrome e ajax, nesse caso em especial vamos apenas usar a api e mostrar os JSONs, pois bem vamos ao código.

<center> <strong> Código 03 </strong></center>

```js
var fileOpenCb = require('./pessoascb');

fileOpenCb(function(err ,data) {
  if(!err)  console.log(data);
  console.log(err);
});

```

Sim eu concordo que uso dele é muito simples para quem entende de javascript. Então vamos para uso do próximo? O da Promise nativa.

```js
var fileOpen = require('./passoaspromise');
//usando apenas 1 promise
fileOpen('pessoas.json','utf-8')   
  .then(console.log,console.error);

//usando um array de promises
Promise
  .all([
      fileOpen('pessoas.json','utf-8'),
      fileOpen('amigos.json','utf-8')
    ])
    .then(console.log,console.error);
    .catch(console.log)

```
  Percebe-se que o código é maior,  mais isso foi de proposito,  observando-se com calma, e percepitivel que a flexibilidade do código é linda, verificando o fator de se existirem vários JSONs, basta passar o path e o encoding de cada um deles para fazer sua leitura, isso gera um otimo reuso. O Promise.all([]) faz todo trabalho recebendo um array de promises e resolvendo todas no method then(), caso tenha algum erro  method  catch() sera chamado e assim, alguma tipo de tratamento podera ser feito.

<center>  <h1>Conclusão</h1></center>

Assim temino, esse poste galera apenas para concluir a intenção não mostrar a fundo que é Promise, mais sim mostrar que o CoreTeam do nodeJS não esta parado estão de fato trabalhando e acompanhando a evolução do V8, para  que possamos a cada ter features novas sempre.

## Links para continuar

+ [Promise CookBook](https://github.com/mattdesl/promise-cookbook)
+ [Promise A+](https://www.promisejs.org/)
+ [Promise-mito](http://pompeu.github.io/articles/promise-mito)
+ [Mozilla Spec](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) 
+ [NomaDev](http://nomadev.com.br/javascript-promises/)

