# NodeJS Vs Elixir Batalha Mortal

## O NodeJS

Bem o NodeJS é uma implementação do V8, motor de chrome no lado do servidor, ele possui como principal característica, ter apenas uma thread e  ser totalmente assincrono, seu grande sucesso se deu por conta da sua flexibilidade, o Javascript hoje trabalha em todas as camadas de uma aplicação web, desktop e mobile.

Veja mais sobre em node.org[http];

## Elixir

Esse lindo por sua vez é uma linguagem funcional, ele roda na maquina virtual do erlang, é extremamente elegante quanto a sintaxe, parece com ruby e python, porem sua performance é de linguagem compilada, sua grande força esta na criação de greens threads(mini processos) e na troca de mensagens entre eles, isso é herdado do Erlang.

Veja mais sobre em elixir.org[http];

## Apache BanchMark(AB), Siege e Wrk

São ferramentas para teste sobre http, cada uma delas possui características particulares,
o AB e focado em teste de stress e força o paralelismo, o Siege por sua vez trabalha a questão da estabilidade e  Wrk testa qualidade, as trés ferramentas são muito conceituadas e bastante usadas por varias empresas para testar seus frameworks e ferramentas de http.

[link Apache Banchmark](http://www.debianhelp.co.uk/apacheab.htm)
[link Siege](https://www.joedog.org/siege-home/)
[link Wrk](https://github.com/wg/wrk)

##  Métodos e Configurações

Os testes foram feitos no mesmo ambiente dando a mesma chance para ambas plataformas, veja abaixo os 3 arquivos usados para rodar os testes.

```sh
ab -n 5000 -c 100 http://localhost:$1/api/json
siege -b -c100 -t30s http://localhost:$1/api/json
wrk -t2 -c400 -d30s http://localhost:$1/api/json
```

Esses 3 comandos foram separados em 3 scripts executáveis e executados 1 apos  o outro, isso poderá ser visto no vídeo.

O endpoint do NodeJS trata-se um rota simples do express, que devolve um json, como  no código abaixo.

```js
router.get('/json',(req, res) => {
      res.json({"hello":"world"});
});
```
O caso do Elixir foi necessário criar um controller padrão do Phoenix, adicionar o endpoint no aquivo de rotas e configurar a view de forma que ela envie um json. vejamos o como foi feito abaixo, 

Sera apresentado apenas o controller.

### Controller
```ex
defmodule RestApi.PageController do
 use RestApi.Web, :controller
 import JSON

    def index(conn, _params) do
       render conn, hello: JSON.parse("{\"hello\" : \"world\"}")
    end
end
```
O computador dos testes trata-se de um Core2duo com 3.0Ghz de cpu e 4gb memoria dd2 800, vale salientar que as ferramentas usadas diretamente no pc e o video sendo gravado ao mesmo tempo, tiveram impacto direto na performance porem, o ambiente foi o mesmo para as duas plataformas.

## Restultados

### Apache Banchmark

No resultado do Apachebanchmark(AB),  que buscam de forma simples força o paralelismo, o Phoenix obteve o melhor resultado, como pode ser visto no gráfico abaixo.

 ![ab-grafico](/images/ab_wrk_siege_imgs/ab_time_total.png)

Nada mal como era de se esperar a linguagem compilada na frente, porem se perceberem a diferença e muito baixa menos de  meio segundo, vamos ao siege.

### Siege

 ![siege-table](/images/ab_wrk_siege_imgs/siege_total_transarions.png)

Observando esse gráfico onde o NodeJS obteve um resulto expressivo, com cerca de sete mil transação a mais, começa ficar claro que o NodeJS é superior, quando o quesito e troca de mensagens.

No Siege o resultado geral, o NodeJS foi muito melhor.

### Wrk

Primeiro a analise da latência, o Erlang é famoso por ter baixa latência, contudo o NodeJS foi bem melhor que o Elixir nesse quesito, o que é muito relevante.

Com o uso http houve essa diferença imagine usando socktes? (fica ai um trabalho futuro).

 ![wrk-table](/images/ab_wrk_siege_imgs/wrk_latency.png)
 ![wrk-table](/images/ab_wrk_siege_imgs/wrk_reqtotal.png)
 ![wrk-table](/images/ab_wrk_siege_imgs/wrk_rps.png)

 Esses gráficos deixam claro que sim é o Elixir é muito bom e rápido se comparado com Python, ruby e php, mais quando submetido a testes com “gente grande” no mundo de alta performance o cenário fica complicado, quem sabe no futuro ele  melhore e possa bater de frente com NodeJS.

 Um observação, eu escrevi um artigo acadêmico onde testei 7 tecnologias dentre elas  o GO e Java, elas em alguns casos foram ate  5x mais rápido que NodeJS, o que me leva a pensar que em um banchmark entre elixir e golang o resultado seria assustador.
 Artigo pode ser baixado e lido.

http://www.enacomp.com.br/?page_id=215

### Conclusão

Esse teste foi feito com intuído de esclarecimento, mostrando que para o caso de problemas de performance devemos testar sempre a tecnologia que ira ser usada, para evitar que  apenas troque o lento pelo menos lento, então uma avaliação mais na base do teste de performance , usando ferramentas especialistas e adequadas ao seu cenário vale a pena.


# Links

# <a href="https://www.youtube.com/watch?v=K36BJz5kX6Q" target="_blank"> Teste Video </a>

# <a href="https://www.youtube.com/watch?v=8Ng6TfAj7Sk" target="_blank"> Palesta Master Akita  </a>

# <a href="http://www.akitaonrails.com/2015/12/03/the-obligatory-flame-war-phoenix-vs-node-js" target="_blank"> Flame War NodeJS vs Phoenix by Master Akita  </a>


# <a href="/logs/elixirvsnode.log" target="_blank"> Logs </a>
