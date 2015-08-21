(function(){
  var ajax =  new XMLHttpRequest();
  var posts = [];
  ajax.open('get','articles/data.json',true);
  ajax.send();
  ajax.addEventListener('load',function respAjax(){
   posts = JSON.parse(ajax.response);
   posts = Object.keys(posts).map(function(key){
     //testar .title
     return posts[key];
   });
  },false);

  var searchInput = document.querySelector('#find-btn');

  searchInput.addEventListener("keyup", function() {
    var valueOfInput = new RegExp(searchInput.value,'g');
    var filterposts = [];
    if(searchInput.value.length > 2){
      filterposts = posts.filter(function(post){
        return post.title.match(valueOfInput);
      });
      console.log(JSON.stringify(filterposts));
    }
  });

  angular.module('blog',['angucomplete-alt'])
    .controller('AutoCompleteController',['$http',function($http){
        var vm =  this;
        $http.get('articles/data.json')
          .success(function(data){
           vm.posts = Object.keys(data).map(function(key){
              return data[key];
            });
          });
    }]);
})();

