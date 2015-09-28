(function(){
  var ajax =  new XMLHttpRequest();
  var posts = [];
  var titles = [];
  ajax.open('get','articles/data.json',true);
  ajax.send();
  ajax.addEventListener('load',function respAjax(){
   posts = JSON.parse(ajax.response);
   posts = Object.keys(posts).map(function(key){
     return posts[key];
   });
  },false);
  var searchInput = document.querySelector('#find-btn');
  var result = document.querySelector('.result');

  searchInput.addEventListener("keyup", function(ev) {
      var valueOfInput = new RegExp(searchInput.value,'ig');
      var filterposts = [];
      if(searchInput.value.length){
        filterposts = posts.filter(function(post, index, arr){
          return post.title.match(valueOfInput);
        });
        //filterposts.forEach(print);
        
        function print(data){
          var a = document.createElement("a");
          a.href = data.url;
          a.className = 'search'
          a.innerHTML = data.title.toLowerCase();
          var br = document.createElement("br");
          result.appendChild(br);
          result.appendChild(a);
        }

      } 
  });
  function log(data){
    return console.log(data);
  }
})();

