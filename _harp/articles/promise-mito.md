# Promise no banheiro(Promise Mito KKKKKK)

> Fui mijar agora e automaticamente fiz um algoritmo assíncrono com 2 funções encadeadas, como assim?
> Entrei no banheiro, ele é pequeno, com a mão direita eu fechei a porta e com a esquerda eu levantei a tampa, porém as 2 próximas ações dependem do resultado das ações anteriores.
> Logo eu só pude acender a luz co a direita enquanto eu tirava meu fazedor de xixi com a esquerda.
> Pelo menos foram 2 ações e paralela por vez, ou seja, uso de 100% da infraestrutura.
> Assim que um programador mija.
> By Jean Carlos Nascimento (Suissudo)

## Vamos começar ?

Certo primeiro passo que é uma Promise? Bem traduzindo a pé da letra Promise é promeça, trazendo isso para mundo do Javascript significa que um bloco de codigo sera resolvido assincronamente e ao final eu terei um resultado de sucesso ou erro, mais quando é esse final? não sei é assincrono, talvez não fique claro nesse momento porem vamos executar este algoritmo do Tio Suissa? Usando callbck e depois promise? Pois bem vamos começar.


## Entrando no banheiro com callback

##### código 01
```js
'use strict';
const banheiro = require('./banheiro');

banheiro.abrir_porta(true, (err, res) => {
	if(!err) {
		console.log(res);
		banheiro.levantar_tampa(true, (err, res) => {
			if(!err) {
				console.log(res);
					banheiro.acender_luz(true, (err, res) => {
						if(!err) {
							console.log(res);
							banheiro.tirando_fazedor_de_xixi(true, (err, res) => {
								if(!err) console.log(res);
							});	
						} 
					});
			}
		});
	}
})

```
Se você não entendeu esse codigo acima, bem vindo ao time, eu também demorei um tempo para entender o que ele faz, pois é muito feio o uso de callbacks aninhados isso tambem  é conhecido como callback hell, mais com tudo a performance  deles é muito boa no futuro devo fazer alguns testes de callback Vs promises aguardem.
É o resto do Codigo? Onde fica? onde esta essas funções?  Sim tem mais código ele esta no arquivo banheiro.js

##### código 02
```js

'use strict';

module.exports.abrir_porta = function abrir_porta(action,callback){
	if(action) { 
		return callback(null,'Posta aberta!!');
	}
	return callback(new Error('erro ao abrir porta'));
}

module.exports.levantar_tampa = function levantar_tampa(action, callback) {
	if(action) { 
		return callback(null, 'Tampa Levantada!!!');
	}
	return callback(new Error('erro ao levantar tampa'));
}

module.exports.acender_luz =  function acender_luz(action, callback) {
	if(action) { 
		return callback(null, 'Luz acesa!!!');
	}
	return callback(new Error('erro ao acender a luz'));
}

module.exports.tirando_fazedor_de_xixi = function tirando_fazedor_de_xixi(action, callback) {
	if(action) { 
		return callback(null, 'fazedor de xixi de fora(coisa feia)!!!');
	}
	return callback(new Error('fazedor de xixi undefined T_T'));
}

```
Pois bem ao executar o codigo no console do nodejs, vamos receber o resutado, de todas funções, vamos ler as frazes na ordem e tudo bem ficou feio estranho mais funcional, mais sera podemos melhorar esse codigo? Não esta vergoso D+(você mostraria ele pra sua mãe?),  Olha ele ai o famoso callback hell, não queremos isso, vamos pedir ajuda ao core do nosso amado nodeJS, a ele como eu disse em outro post possue a  Promise nativa que vai nos salvar.

Então é isso essa séria uma forma muito antiga de executar este algoritmo que Jean propos, pois bem vamos, lembrar de programar usando boas praticas, qualquer livro de programação que você ler ou ate mesmo na faculdade vão te falar isso, código é seu quando se esta escrevendo ele, depois em muitas das vezes quem vai manter ou mecher nele não é mais você e sim outros programadores, pois bem deixe-o mais limpo e simples possível e sua marca ficara nele por anos e você sera reconhecido.

Agora que já tem-se background sobre promises ou não KKKK, vamos melhorar esse código com a ajuda desse conceito, vou criar um modulo de chamado deffer, ele sera baseado na biblioteca de <a href="https://www.npmjs.com/package/promise" target="_blank"> Promise </a>, ela  implementa uma especificação chamada de Promise A+, e usando esse modulo deffer, vamos melhorar a legibilidade do nosso código.

##### código 03
```js
'use strict';
const banheiro = require('./testes');
const deffer = require('./deffer');
let promises = [];

let abrir_porta = deffer(banheiro.abrir_porta);
let levantar_tampa = deffer(banheiro.levantar_tampa);
let acender_luz = deffer(banheiro.acender_luz);
let tirando_fazedor_de_xixi = deffer(banheiro.tirando_fazedor_de_xixi);

promises.push(abrir_porta(true));
promises.push(levantar_tampa(true));
promises.push(acender_luz(true));
promises.push(tirando_fazedor_de_xixi(true));

Promise.all(promises).then(console.log, console.error)

```

Agora sim ficou bem melhor para ler, o código com callback um programador experience pode levar mais de 5 minutos para entender, um iniciante em programação pode levar mais de 20 minutos ou mais e em alguns casos nem entender, agora por outro lado batendo o olho nesse código mais descritivo que Promise proporcionou, fica claro que o uso desse padrão deixa o codigo mais simples de mater, pois não temos nenhum condicional(if else), a complexidade ficar por conta da abstração(Promise) e isso e algo muito muito bom quando podemos contar com abstrações, mais agora se você é dos caras curiosos como eu(mais você Pompeu é um doente maratonista de programação gosta de escovar bit), e quer ver como esta código do modulo deffer foi escrito de código 04.

##### código 04
```js
'use strict';
let slice = Array.prototype.slice;
module.exports = function deffer(fn, argumentsCount) {
	argumentsCount = argumentsCount || Infinity;
	return function () {
		let self = this;
		let args = slice.call(arguments,0, argumentsCount > 0 ? argumentsCount : 0);
		return new Promise((resolve, reject) => {
			args.push((err, res) => {
				err ? reject(err) : resolve(res);
			})
			let res = fn.apply(self, args);
			if(res &&
				(typeof res === 'object' || typeof res === 'function') &&
				(typeof res.then === 'function' )){
				resolve(res);
			}
		});
	}
};
```
Não e foco falar sobre o seu comportamento, mas basicamente ele recebe um função com  parametro e devolve uma Promise, essa função de estar no mesmo padrão que o nodeJS trabalha as funções assincronascerto? e caso tudo corra bem ele devolve a resposta atravez do resolve, se não ele devolve um erro atravez do reject certo?

Eu sei ele esta muito complexo, para um iniciante, acreditem ou não eu demorei um tempo para entender tudo que ele faz, porem vamos pensar nele como uma mágica e concentrar no seu uso, e agora olhando os dois códigos, e os compando pode-se ver que a diferença de legibilidade é grande a forma como o uso de promises da um descrição a código é lindo é esse tipo de problema que ela resolve.

No final de da excução dos codigo a resposta e parecida veja abaixo :

##### resutado com callback hell :P
```
System-Product-Name:~/Documents/dev/node/teste$ node main.js 
Posta aberta!!
Tampa Levantada!!!
Luz acesa!!!
fazedor de xixi de fora(coisa feia)!!

```
##### resultado com promises :P

```
System-Product-Name:~/Documents/dev/node/teste$ node main_promise.js 
[ 'Posta aberta!!',
  'Tampa Levantada!!!',
  'Luz acesa!!!',
  'fazedor de xixi de fora(coisa feia)!!!' ]

```

Pois é galera mais um post sobre promise, a pedidos do meu amigo Suissudo :P, qualquer duvida galera disqus-me.


