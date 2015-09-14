# Promise Nativa nodeJS(sem -harmony)

No mundo assíncrono do javascritp, as vezes fica muito complexo entender o ciclo da informações,  o já famoso e debatido callbackhell é realmente um problema na manutenção dos códigos, contudo um grande alternativa para resolver esse problema é usar as Promise.

Vejamos um exemplo de callbackhell no código 01, pois bem callbackhell se da quando uma função necessita do resultado de outra, basicamente é isso, contudo vale salientar que Promise não é a única solução porem é uma das mais elegantes.

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

O código 01, basicamente esta lendo dois json, concatenando eles e colocando eles em um Array e retornando eles na função, varias estrategias poderiam ser usadas para melhorar esse código, programação funcional, libs como lodash ou underscore (_.***) ajudariam resolver o problema, os métodos Array.prototype.* poderiam facilmente resolver, porem em algumas situações nos desenvolvedores herdamos códigos para mantermos e nos deparamos com isso, no estado atual temos solução nativa que é ajuda muito.

Quando  atualizei meu nodeJS para v0.12.7, me deparei com novo modulo nativo, Promise, pois bem eu percebi que não era um modulo....OMG,  não preciso importar nada para usar ele apenas uso e proto. Digitando no seu terminal node entretanto no modo interativo do nodeJS e ditando Promise.+tab , pronto esta la Promise nativa.

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

É nítido! o segundo modulo possui uma simplicidade maior quanto à implementação, e claramente pode ser reusado por conta da flexibilidade que foi escrito,  o código 01 se fosse criado para reuso a complexidade ficaria ainda maior, tornando-o muito duro de manter, lembrando que são dois simples json, imagine se fosse varias consultas a um DB ou requests http? seria "imanutentivel"(KKKKKK) Agora vamos passar para a parte do usuário das api criadas, Quando forem consumir as apis que é unir dois jsons.

Um detalhe se por algum motivo aparecer a necessidade de um novo json ser usado a primeira api já quebra e a segunda não, vamos verificar a baixo o por que disso. O código 03 representa o client do próprio nodeJS, que poderia ser no navegador caso usássemos google chrome e ajax, esse caso vai apenas usar a api e mostrar os JSONs, pois bem vamos ao código.

<center> <strong> Código 03 </strong></center>

```js
var fileOpenCb = require('./pessoascb');

fileOpenCb(function(err ,data) {
  console.log(data);
});

```

Sim eu concordo que uso dele é muito simples para quem entende de javascritp, vamos para uso do próximo? O da Promise nativa.

```js
var fileOpen = require('./passoaspromise');

fileOpen('pessoas.json','utf-8')   
  .then(console.log,console.error);

Promise
  .all([fileOpen('pessoas.json','utf-8'),

  fileOpen('amigos.json','utf-8')])
    .then(console.log,console.error);
    .catch(console.log)

```
  Percebe-se que o código é maior ok mais isso foi de proposito, se observar com calma a flexibilidade do código é linda, tento visto que se existir vários JSONs, basta passar o path e o encoding de cada um deles para fazer sua leitura, o Promise.all([]) faz todo trabalho recebendo um array de promises e resolve todas no method then, caso tenha erro use o catch para tratalos.<center>  <h1>Conclusão</h1></center>É isso galera apenas para concluir a intenção não mostrar a fundo que é Promise, mais sim mostrar que o CoreTeam do nodeJS não esta parado estão de fato trabalhando e acompanhando a evolução do V8, para  que possamos a cada ter features novas.
