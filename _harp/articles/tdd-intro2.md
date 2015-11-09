# Introdução ao TDD com NodeJS Part 2

## Continuando...

se você não viu a primeira parte leia ela <a href="tdd-intro1" target="_blank"> aki </a> 

## Test 4

Se você chegou ate aqui parabens você realmente esta interessado em TDD, e isso vai ajudar você a ser um desenvolvedor melhor.

Vamos escrever o teste 4, ele consiste em testar a entrada de dois algarismos romanos, por exemplo II deve retornar numero 2, então vamos criar o teste para esse caso.

```js

   it( 'deve entender  o simbolo II ', done => {
      let conversor = Conversor.converte("II");
      assert.equal(2 , conversor);
      done();
   });

``` 

Rodando esse teste com o mocha ele falha, então seguindo o ciclo do TDD, vamos fazer uma implementação para que ele passe e fique verde.

A função converte agora deve ser modificada de forma a acumular um valor de acordo com a entrada, ou seja se estamos recebendo II e sabemos ele é 2, uma variavel dera ir acumulando esse valor, vamos a nova implementação da função converte.

```js
  function  converte (romanNumber) {
    let acc = 0;
    //essa constante quando o tamanho da string de entrada
    const romanNumberLen = ramanNumber.length;

    for(let i = 0; i < romanNumberLen; i++) {
      /* 
         esse caso o acumulador vai incrementando o valor
         numerico referente ao algarismo romano em questão
      */
      acc +=  map.get(romanNumber.charAt(i));
    }
    return acc;
  }

```
Agora é a hora de rodar o teste, e termos a resposta da implementação, vamos usar o mocha, e verificar o resultado que deve ser igual essa logo abaixo.

<pre class=”green”>
  <span>✓</span> deve entender o símbolo I 
  <span>✓</span> deve entender o símbolo V 
  <span>✓</span> deve entender o símbolo M
  <span>✓</span> deve entender o símbolo II
</pre>

OK agora falta pouco para terminamos, vamos criar um test  novo para o valor XXII o número 22, vamos seguir os passos basicos do TDD, criamos o teste e rodamos o mocha, vejá abaixo a implementação do teste.

## Teste 5

```js
   it( 'deve entender  o simbolo XXII ', done => {
      let conversor = Conversor.converte("XXII");
      assert.equal(22 , conversor);
      done();
   });

```
<pre class=”green”>
  <span>✓</span> deve entender o símbolo I 
  <span>✓</span> deve entender o símbolo V 
  <span>✓</span> deve entender o símbolo M
  <span>✓</span> deve entender o símbolo II
  <span>✓</span> deve entender o símbolo XXII
</pre>

É tivemos uma surpresinha o teste já passa, ou seja temos agora um conversor que é capaz de converter a maioria dos algarismos romanos, mais seu eu tiver o numero IX que é 9, sera que esse teste tambem passa? ou ele quebra? vamos criar esse caso de teste e verificar.

## Test 6

```js
   it( 'deve entender  o simbolo IX ', done => {
      let conversor = Conversor.converte("IX");
      assert.equal(9 , conversor);
      done();
   });

```

Rodando o teste é verificado que ele falha? então esse tipo de algoritmo o nosso conversor não esta preparado para tratar, vamos agora trabalhar em um novo algoritmo que possa resolver esse problema e assim terminar nosso conversor.

Essa implementação deve ser simples, quando estiver implementando algo usando TDD ou não, prese sempre pela implementação mais simples possivel, pois no futuro sera melhor para que outros programadores entender seu codigo e assim ele tera um vida maior.

Verifique a nova estrutura da função converte que vem logo abaixo, agora ele possui um algoritmo mais robusto, ele faz a verificação dos algarismos, de uma forma que ele possa converter de para o valor esperado qualquer número romano que ela recebe como argumento.

```js

function converte (romanNumber) {
    let acc = 0;
    const romanNumberLen =  romanNumber.length;
    /*
 garda o valor o ultimo numero da direita
para trabalhar com ele no acumulador
    */
    let ultimoVizinhoDaDireita = 0;
    /*
      temos que mudar o ciclo do “for” para que ele possa trabalhar
      a nosso favor.
    */
    for(let i = romanNumber.length - 1; i >= 0; i--) { 
      // guardando o valor atual
      let atual = map.get(romanNumber.charAt(i));
      /*
        o multiplicador recebe 1 se o valor atual for menor que ultimo vizinho da
        diretira e -1 para fazer o descremento se ele não for.
        Foi usado operador  ternario para simplificar do codigo.
      */
      let multiplicador = (atual < ultimoVizinhoDaDireita) ? -1 : 1;
      /*
        aqui o acumulador vai incrementando o valor atual multiplicado
        por 1 ou  -1 dependendo do seu valor.
      */
      acc += atual * multiplicador;
      
      ultimoVizinhoDaDireita = atual;
    }
    return acc;
  }

```
Agora chegou o momento esperado onde vamos rodar o ultimo teste, caso ele passe podemos ficar livre para fazer um  refactor, ou não ok?

<pre class=”green”>
  <span> ✓ </span> deve entender o símbolo I 
  <span> ✓ </span> deve entender o símbolo V 
  <span> ✓ </span> deve entender o símbolo M
  <span> ✓ </span> deve entender o símbolo II
  <span> ✓ </span> deve entender o símbolo XXII
  <span> ✓ </span> deve entender o símbolo IX 
</pre>

Então terminamos, todos os testes passaram, fica um desafio para quem leu, procure algum site de Coding Kata, tente implementar outros desafios para melhorar seu conhecimento em teste automatizados, sinta se a vontade de me procurar no twitter ou facebook para conversar sobre TDD, eu gostaria muito de aprender mais em uma boa discrusão.

O codigo final de exemplo esta no gist, pode ser acessado nos link abaixo:

+ <a href="https://gist.github.com/Pompeu/06e78c4f66c4b9fc0211" target="_blank"> Testes </a>
+ <a href="https://gist.github.com/Pompeu/57841bcb56cbfa358970" targe="_black" > Model </a>

# Conclusão

Não perca tempo com teste manuais, busque ferramentas como o mocha, em sua linguagem de programação favorita e use-o e ganhe tempo.

O TDD hoje é de fato algo como o ingles, deixou de ser um diferencial, e passou a ser algo esperado de todo bom programador, ou seja aprenda o mais breve possivel.

Pratique, pratique e pratique. 

Obrigado a todos JS é o Poder S2.
