(function () {
  var q = document.querySelector('#q');
  var resultList = document.querySelector('#results');
  var keyups = Rx.Observable.fromEvent(q, 'keyup');


  keyups.throttle(500)
    .map(() => q.value)
    .do(() => q.classList.add('spinner'))
    .flatMapLatest(() => Rx.DOM.ajax({
      method: 'GET',
      url: '../js/data.json',
      responseType: 'json'
    }))
    .do(() => q.classList.remove('spinner'))
    .map(r => r.response)
    .map(results => 
      results
        .filter(r => { 
          var re = q.value !== '' ? new RegExp(q.value, 'ig'): /^\w+$/
          return r.title.match(re)
         })
        .reduce((html, result) => 
      `${html}<div class="result"><a href="${result.url}">${result.title}</a></div>`, '')
    )
    .subscribe(resultsHTML => resultList.innerHTML = resultsHTML, 
      err => console.error(err))

})();
