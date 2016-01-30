# NodeJS Vs Elixir Batalha Mortal


## O  NodeJS

Bem o NodeJS é uma implementação do V8, motor de chrome no lado do servidor, ele possui como principal caracterisca, ter apenas uma thread e  ser totalmente assincrono, seu grande sucesso se deu por conta da sua flexibilidade, o Javascript hoje trabalha em todas as camadas de uma aplicação web, desktop e mobile.

Veja mais sobre em node.org[http];


## Elixir

Esse lindo por sua vez é uma linguagem funcional, ele roda na maquina virtual do erlang, é estremamente elegante quanto a sintax, parece com ruby e python, porem sua perfomance é de linguagem compilada, sua grande força esta na criação de greens threads(mini processos) e na troca de menssagens entre eles, isso é herdado do Erlang.

Veja mais sobre em elixir.org[http];

## Apache BanchMark(AB), Siege e Wrk

São ferramentas para teste sobre http, cada uma delas possui caractericas particulares,
o AB e focado em teste de stress e força o paralelistmo, o Siege por sua vez trabalha a questão da estabilidade e  Wrk testa qualidade, as tres ferramentas são muito bem conseitudas e bastante usadas por varias empresas para testar seus frameworks e ferramentas de http.


Veja mais sobre em ab.org[http];
Veja mais sobre em siege.org[http];
Veja mais sobre em wrk.org[http];

##  Metodos e Configurações

Os testes foram feitos no mesmo ambiente dando a mesma chance para ambas plataformas, veja abaixo os 3 arquivos usados para rodar os testes.

```sh
ab -n 5000 -c 100 http://localhost:$1/api/json
siege -b -c100 -t30s http://localhost:$1/api/json
wrk -t2 -c400 -d30s http://localhost:$1/api/json
```

Esses 3 comandos foram separados em 3 scripts execultaveis e execultados 1 apos  o outro, isso podera ser visto no video.

O endpoint do NodeJS trata-se um rota simples do express, que devolver um json, como  no código abaixo.

```js
router.get('/json',(req, res) => {
    res.json({"hello":"world"});
});
```
O caso do Elixir foi necessario criar um controller padrão do Phoenix, adicionar o endpoint no aquivo de rotas e configura a view de forma que ela envie um json. vejamos o como foi feito abaixo.

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
O computador dos testes trata-se de um core2duo com 3.0Ghz de cpu e 4gb memoria dd2 800, vale salientar que as ferramendas usadas diretamente no pc e o video sendo gravado ao mesmo tempo, tiveram impacto direto na performance porem, o anbiente foi o mesmo para as duas plataformas.

## Restultados


### Apache Banchmark
No resultado do AB,  que buscam de forma simples força o paralelismo, o Phoenix obteve o melhor resultdo, como pode ser visto na imagens abaixo.

  ![ab-table](/images/ab_wrk_siege_imgs/ab_time_total.png)

Humm nada mal como era de se esperar linguagem compilada na frente, porem se perceberem a diferença e muito baixa menos de  meio segundo, agora veja no siege.

### Siege

  ![siege-table](/images/ab_wrk_siege_imgs/siege_total_transarions.png)
### Wrk

  ![wrk-table](/images/ab_wrk_siege_imgs/wrk_latency.png)
  ![wrk-table](/images/ab_wrk_siege_imgs/wrk_reqtotal.png)
  ![wrk-table](/images/ab_wrk_siege_imgs/wrk_rps.png)
  ![wrk-table](/images/ab_wrk_siege_imgs/wrk_tps.png)
