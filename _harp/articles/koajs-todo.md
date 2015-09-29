# Criando uma Api Rest com KoaJS Usando TDD/BDD

## Dependências

Primeiro vai precisar do node na versão 4.x.x e o mocha 2.X.X , o mocha deve ser instalado na sua versão global.

<a href="https://www.youtube.com/watch?v=LTyqMuc9Vjs" target="_blank"> Instalando node JS </a>

Para instalar do mocha basta apenas ter nodeJs instalado

sudo npm install -g mocha

### resultado

```shell
$ node -v 
4.1.1
$ mocha --version
2.3.2
sudo npm install -g mocha
```
# Começando o Projeto.

```shell
sudo npm init
```

Siga os passos preenchendo com seus dados os campos pedidos, esse comando npm init vai criar um arquivo o package.json, ele por sua vez é usado pelo npm para controlar suas depencias, instalando elas no projeto a partir dele.

### instalando depencias do projeto

```shell
sudo npm install koa koa-router co-body mongoose --save
sudo npm  i superagent chai charlatan --save-dev
```
Esses dois comandos vão instalar as dependências do projeto, e ira salva-las no arquivo package.json, com isso seu projeto podera ser inicializado com tranquilidade.

### cat package.json

```json
{
  "name": "todo",
  "version": "0.0.1",
  "description": "todo pompeu",
  "main": "app.js",
  "scripts": {
    "test": "mocha"
  },
  "keywords": [
    "todo",
    "list"
  ],
  "author": "Itacir Ferreira Pompeu",
  "license": "MIT",
  "devDependencies": {
    "chai": "^3.2.0",
    "charlatan": "^1.0.0",
    "superagent": "^1.3.0"
  },
  "dependencies": {
    "co-body": "^4.0.0",
    "koa": "^1.0.0",
    "koa-router": "^5.1.2",
    "mongoose": "^4.1.6"
  }
}
```
# Criando o app.js

Por uma convenção da comunidade, a base estrutural de um projeto node fica no app.js, ele deve ficar na raiz do projeto, basicamente nesse caso em especial, são as  configurações do <a href="http://koajs.com/" target="_blank">koajs</a> que seguem o mesmo estilo do express porem com varias melhorias internas, o Koa se vale de rotas e middlewares para facilitar a criação de aplicações, api restful entre outras.

### configurando o app.js

Declarando as depencias, e configurando o inicio do projeto.


```js
'use strict';

let koa =  require('koa');
let app = module.exports = koa();
let mongoose = require('mongoose');
//conectando ao mongodb 
//ele deve estar instalado
mongoose.connect('mongodb://localhost/todo');

app.listen(5000);

```
#### conectando com mongoose

Antes de começar a codificação do model certifique-se que mongodb esteja instalado.

```shell
mongo --version
MongoDB shell version: 2.6.11
```

Caso o mongodb não esteja instalando você tera duas opções instalar o <a href="https://www.mongodb.org/downloads#production" target="_blank">mongodb</a> em seu SO, ou usar o <a href="https://mongolab.com/" target="_blank" >mongolab</a>, a instalação do mongodb  é simples e uso do mongolab é muito simples basta seguir a instruções dos sites.

Terminando essa parte pode agora dar inicio a a criação do primeiro teste, que var testar o model do projeto.

# Criando o Primeiro Teste

O Primeiro teste do model, este teste serve apenas para certificar que model e projeto esta funcionando de forma esperada, com seus atributos corretos.

### lista dos atributos

O model vai ser chamar TODO, ele devera ter id de intenficação, uma campo para listar os detalhes, data de inicio, e o status da todo.

Deve-se criar uma pasta de testes, um arquivo index.js e outro todo.test.js, o primeiro deve conter um simples export dos teste, ele sera lido pelo mocha, e o segundo arquivo tera os testes que usara o chai.should() para testar o comportamento esperado.

O arquivo de testes deve ter a seguinte nomenclatura a baixo.

```js
// file: tests/todo.test.js - created at 2015-09-09, 10:40
'use strict';

let should = require('chai').should();
let Todo = require('../models/todo');

describe('todo',() => {

 let todo = new Todo({ details : "Nova Tarefa" });

 it('todo should be a object', () => {
   todo.should.be.a('Object');
 });

 it('todo should have properts details isDone initalData', () => {
   todo.should.have.property('details');
   todo.should.have.property('isDone');
   todo.should.have.property('initalData');
 });
 
 it('todo should dont be have details is empty and isDone start with false', () => {
   todo.details.should.be.not.null;
   todo.isDone.should.be.false
 });

});


```

Caso queira ver um video desse tutorial no <a href="https://www.youtube.com/watch?v=Ss-EaJPcfw8" target="blank"> youtube </a> voce vera um passo a passo  dos testes.

### Rodando o Teste

Na raiz do projeto rode o comando a seguir.

```shell
mocha teste/todo.test.js
```

Ele deve falhar por ainda não criamos o model.

# Criando o Model

Vamos criar uma pasta com nome de models, nela vamos colocar o arquivo index.js, nele deve conter a lista de todos models do projeto export.NAMEMODEL, o proximo arquivo deve ser o todo.js, que é o modelo que sera usado na pela api.

#### todo model
```js
cd todo/models/

echo "exports.Todo = require('./todo');"  >>  index.js

touch todo.js

'use strict';
function todoHandler() {
 let mongoose = require('mongoose');
 let Schema = mongoose.Schema;
 let schema = null;

 schema = new Schema({
  details    : { type : String,  required : true, trin : true},
  isDone     : { type : Boolean, default : false},
  initalData : { type : Date,    default : Date.now},
 });

 return mongoose.model('Todo', schema);
}

module.exports = exports = todoHandler();

```
com o model criado, agora volte ao teste e repita o comando mocha teste/todo.test.js, nesse momento ele deve passar e ficar verde, com uma mensagem de que os testes passaram.

``` shell
 models test todo
   ✓ should be todo a object
   ✓ should be have in Todo, details , initalDate e isDone 
   ✓ should be details isDone is false


 3 passing (16ms)
```
### video do teste da criação do model
Assista o video pela <a href="https://www.youtube.com/watch?v=Ss-EaJPcfw8" target="_blank">WebSchool.io </a>

# Criando o Segundo Arquivo de Testes.

Primeiramente, esse segundo teste que sera criado, tem por sua vez, testar o comportamento de todas a rotas da api, assim dando credibilidade as rotas estão ligadas ao controller, os controllers ligado ao model e que a resposta do controller esteja correta, respondendo o status http correto e o  JSON de resposta na body com os dados do model.

O projeto deve estar rodando para isso basta rodar o comando nodemon app.js, em seguida da inicio a mais um arquivo de teste, o “touch tests/todo-ctrl.test.js”, esse por sua vez tera todos o testes, nesse momento deve-se ter conciencia que primeiro cria-se um teste, depois uma rota usando koa-router, adiciona-se está rota no app.js e em seguida cria-se o controller que nos dara o resultado esperado, que é esperado pelo chai.should().

### Criando o teste para o controller e rotas.

``` js
'use strict';

let should = require('chai').should();
let request =  require('superagent');
let ch =  require('charlatan');
let url =  require('url');
const ABS_URL = 'http://localhost:5000/api/v1/todos';

describe('todoCtrl', () => {
 
 let todo = {
   details : ch.Name.title()
 };
 let id = null;

 it('should be create a todo in api', (done) => {
   request
     .post(url.resolve(ABS_URL,'todos'))
     .send(todo)
     .end((err , res) => {
       res.should.be.exist;
       res.body.should.be.a('Object');
       res.body._id.should.exist;
       res.status.should.be.eql(201);
       id = res.body._id;
       done();
     })
 });

 it('should be get one todo by id', (done) => {
    request
     .get(url.resolve(ABS_URL,'todos/'+id))
     .end((err , res) => {
       res.should.be.exist;
       res.body.should.be.a('Object');
       res.status.should.be.eql(200);
       res.body._id.should.exist;
       done();
     })
 });

 it('should be getall todos', (done) => {
    request
     .get(url.resolve(ABS_URL,'todos'))
     .end((err , res) => {
       res.should.be.exist;
       res.body.should.be.a('Array');
       res.status.should.be.eql(200);
       done();
     })
 });

 it('should be update one todo by id set status true', (done) => {
   var body = {
     isDone : true  
   };
   request
     .put(url.resolve(ABS_URL,'todos/'+id))
     .send(body)
     .end((err , res) => {
       res.status.should.be.ok;
       res.status.should.be.eql(202);
       done();
     });
 });

 it('should be delete one todo by id' , (done) => {
   request
     .del(url.resolve(ABS_URL,'todos/'+id))
     .end((err , res) => {
       res.should.be.exist;
       res.status.should.be.eql(204)
       done();      
     });
 });
 
});

```

### Criando a Rotas.

Os arquivo de rotas de ficar num pasta chamada routes/, nela deve conter o index.js com os devidos exports e cada rota deve estar em um arquivo separado por exemplo todo.js.

O arquivo todo.js de dentro da da pasta routes é um generator ok? que é usado com middleware polo koajs, para controlar o acesso ao controller da api.

```js
'use strict';

const apitodos = '/api/v1/todos';
let todoctrl = require('../controllers/todo');

module.exports = require('koa-router')()
     .get(apitodos+'/:id',todoctrl.get)
     .get(apitodos,todoctrl.getAll)
     .post(apitodos,todoctrl.add)
     .del(apitodos+'/:id',todoctrl.del)
     .put(apitodos+'/:id',todoctrl.update)
     .routes();
```
Cada rota do ali no router, segue sempre o mesmo estilo, primeiro VERBO http, em seguida a url, caso tenha algum paramento ele vem no final da url, e depois o controller, conforme o codigo de exemplo acima.

Perceba que o arquivo de rotas possui um estilo bem limpo onde cada verbo usa uma function do controller, que é responsavel por apenas uma unica terefa.

Agora o app.js devera ter o chamado dessa rota, e assim podera ser criado o controller.

```js
app.use(require('./routes/todo'));

```
# Criando o Controller

Agora chegou chegou o  momento de criar um controller, onde o uso do koajs e node na nova versão sera visto, e isso deixara o codigo muito limpo de simples de entender.

O arquivo de controller tem como depencia o model e o co-body, e o model jé foi testado, a função do co-body e parsear as requisções do post e put, simplificando o trabalho do metodo e deixando ele mais limpo.

Cada função exportada pelo controller, faz apenas uma atividade, que são elas responsaveis por criar os recursos, recuperar por id ou recuperar todas, atualizar pelo id  e excluir pelo id, isso é sim um CRUD.

#### codigo do controller.

```js

'use strict';

let Todo = require('../models/todo');
let parse = require('co-body');

module.exports.add = function *add() {
 let todo = yield parse(this);
 let createdTodo = yield Todo.create(todo);
 if(createdTodo) {
    this.status = 201;
    this.set('location','/api/todos/'+createdTodo._id);
    this.body = createdTodo;
 }else {
     this.status = 404;
 } 
}

module.exports.get = function *get() {
 let getTodo = yield Todo.findOne({_id : this.params.id}).exec();
 this.body = getTodo ? getTodo : this.status = 404;
}

module.exports.getAll = function *getAll() {
 let allTodo = yield Todo.find({}).exec();
 this.body = allTodo ? allTodo : this.status = 404;
}

module.exports.del = function *del (){
 let delTodo = yield Todo.remove({_id : this.params.id});
 this.status = delTodo ? this.status = 204 : this.stats = 404;
}

module.exports.update = function *update() {
 let body = yield parse(this);
 let updateTodo = yield Todo.update({_id : this.params.id},body);
 if(updateTodo.nModified){
    this.status = 202;
    this.set('location','/api/todos/'+this.params.id);
 }else {
     this.status = 404;
 } 
}
```
# Testando tudo que foi criado.

Se voce chegou ate aqui parabens, voce acaba de ser introduzido ao mundo do node versão 4 e começa a aprender sobre o koajs, juntamente com algumas features do esc6, não fique desanimado , se você não entende bem sobre let, yield , generator pois e tudo isso veio para simplificar o codigo javascript, e vale muito a pena pesquisar.

Pois bem agora e hora de finalizar o teste, rodando  o mocha lembrando que a aplicação deve estar em execução, tenha certeza disso rodando "nodemon app.js" OK.

#### rodando o test

```shell
mocha testes/index.js


 models test todo
   ✓ should be todo a object
   ✓ should be have in Todo, details , initalDate e isDone 
   ✓ should be details isDone is false

 routes todo testing
   ✓ should be create a todo (101ms)
   ✓ should be get all todos
   ✓ should be get one todo by id
   ✓ should be updade one todo by id
   ✓ should be delete one todo by id


 8 passing (165ms)

```
Então caso tenha feito tudo certinho, essa imagem deve ser vista com resultado de todos o teste passando, o link do reposito do git para consulta é esse <a href="" target="_blank">aqui</a> a video aula de como criar esse projeto pode ser vista no canal da <a href="https://www.youtube.com/playlist?list=PL77JVjKTJT2grcOd7WS8WaZiv6kH8fNIC" target="_blank"> webschol.io </a>

Então é isso qualquer duvida ou sugestão disqus me KKK.


