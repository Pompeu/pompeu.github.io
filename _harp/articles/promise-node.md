# Promise Nativa nodeJS(sem -harmony)

No mundo assincrono do javascritp, as veses fica muito complexo entender o ciclo da informações,  o já fomoso e debatido callbackhell é realmente um problema na manutenção dos codigos, contudo um grande alternativa para resolver esse problema é usar as Promise.

Vejamos um exemplo de callbackhell no codigo 01, pois bem callbackhell se da quando uma função necessita do resoltado de outra, basicamente é isso, contudo vale salientar que Promise não é a unica solução porem é uma das mais elengantes.

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

O código 01, basicamente esta lendo dois json, concatenando eles e colocando eles em um Array e restornando eles na função, varias estretegias poderiam ser usadas para melhorar esse codigo, programação funcional, libs como lodash ou underscore (_.***) ajudariam resolver o problema, os metodos Array.prototype.* poderiam facilmente resolver, porem em algumas sutiações nos desenvolvedores herdamos códigos para mantermos e nos deparamos com isso, no estado atual temos solução nativa que é ajuda muito.

Quando  atulizei meu nodeJS para v0.12.7, me deparei com novo modulo nativo, Promise, pois bem eu percebi que não era um modolo....OMG,  não presciso importar nada para usar ele apenas uso e proto. Digitando no seu terminal node entranando no modo interativo do nodeJS e ditando Promise.+tab , pronto esta la Promise nativa.

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
Fiquei empolado em ver compartilhei com os NODEROS do facebook e Twiter, e resolvi fazer esse poste e gravar um video de como usar o basico dessa funcionalidade que nodeJS tem agora, já havia visto que com uso da flag -harmony a Promise fucionava acho que nave v0.11.4+, porem agora roda sosinho sem flag. Vamos voltar ao código para deixar ele mais organizado e legivel, vamos usar Promise.

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

É nitido! o segundo modulo possue uma simplicidade muito maior de implementação, e laramente pode ser reusado por conta da flexibilidade que foi escrito,  código 01 se foce criado para reuso a complexidade ficaria ainda maior tornando-o muito duro de manter, lembrando que são dois simples json, imagine se foce varias consoltas ao DB ou varios request http? seria "imanutentivel" (KKKKKK)Agora vamos passar para a parte do usuario das duas api criadas, Quando forem consumir as apis que é unir dois jsons.

Um detalhe se por algum motivo aparecer tiver outro json a primeira api já quebra a segunda não e vamos verificar a baixo por que não.O codigo 03 representa o client do proprio nodeJS, que poderia ser no navegador caso usasemos chrom e ajax, ele vai apenes usar a api e mostra os JSONs, pois bem vamos ao código.

<center> <strong> Código 03 </strong></center>

```js
var fileOpenCb = require('./pessoascb');

fileOpenCb(function(err ,data) {
  console.log(data);
});

```

Sim eu concordo que uso dele é muito simples para quem entende de javascritp, vamos para uso do proximo? que é a Promise nativa.

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
  Percebe-se que o codigo é maior ok? contudo a flexibilidade do código é linda, tento visto que se existir varios JSONs, basta passar o path e o encoding de cada um deles para usalos, no Promise.all([]) ele recebe um array de promises e resolve todas no method then , caso tenha erro? use o catch ok ele pego os erros.<center>  <h1>Conclusão</h1></center>É isso galera apenas para concluir a intenção não mostrar a fundo que é Promise, mais sim mostrar que o CoreTeam do nodeJS não esta paradado estão de fato trabalhando e acopnhando a evolução do V8, para  que possamos a cada dia ter coisas melhores e padronizadas e a Promise.
