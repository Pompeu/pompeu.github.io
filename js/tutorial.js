(function(){
  'use strict';
  angular
    .module('app')
    .controller('TutorialCtrl',TutorialCtrl);
    
    TutorialCtrl.$inject = ['$scope'];
    
    function TutorialCtrl ($scope){
      
      $scope.videos = [
        { 
            title : 'Como liberar acesso para o Ajax NodeJS Http 1.1 CORS ',
            describle : 'Esse video demonstra como é simples liberar o acesso de um endpoint em  aplicaçôes web, muito bom para quem faz aplicativos mobile ou trabalha com angularJS/Ember.JS, contudo esse conceito pode ser aplicado em qualquer liguagem que implemente http 1.1 em suas requisições.',
            link : 'https://www.youtube.com/watch?v=b7qn6iceyGA',
            gitLink : 'https://github.com/Pompeu/Cors'
        },
        { 
            title : 'Video para gravação de imagens  no mongo DB MEAN',
            describle : 'Gravando imagens no MongoDB usando NodeJS, AngularJs e Formidable ',
            link : 'https://www.youtube.com/watch?v=fl3hoCwvgsI',
            gitLink : 'https://github.com/Pompeu/ImageUploadsMEAN'
        },
        { 
            title : 'Como liberar acesso para o Ajax JAVA Servlet Http 1.1 CORS ',
            describle : 'Esse video demonstra como é simples liberar o acesso de um endpoint em aplicaçôes web, muito bom para quem faz aplicativos mobile ou trabalha com angularJS/Ember.JS, contudo esse conceito pode ser aplicado em qualquer liguagem que implemente http 1.1 em suas requisições.',
            link : 'https://www.youtube.com/watch?v=4Y6V5AXsBp8',
            gitLink : 'https://github.com/Pompeu/designpatterns'
        },{ 
            title : 'Desafio Ruby(Sinatra) VS NodeJS(Restify)',
            describle : 'Um video de comparação dessas duas tecnologias!',
            link : 'https://www.youtube.com/watch?v=6j_LK33k_38',
            gitLink : '#'
        },
        { 
            title : 'Desafio PhP(Slin) VS NodeJS(Restify)',
            describle : 'Um video de comparação dessas duas tecnologias!',
            link : 'https://www.youtube.com/watch?v=LazgFwny67g',
            gitLink : '#'
        },
         { 
            title : 'NodeJs(Restify) VS Flask(Python)',
            describle : 'Um video de comparação dessas duas tecnologias!',
            link : 'https://www.youtube.com/watch?v=oI50I0WnpNE',
            gitLink : '#'
        }
      ];

    }

   
}());
