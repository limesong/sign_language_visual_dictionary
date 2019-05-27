$(document).ready(function() {

  function encodeQueryData(data)
  {
    var ret = [];
    for (var d in data)
    ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
    return ret.join("&");
  }

  function httpGetAsync(theUrl, callback)
  {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
  }


  function getGif(query) {
    // console.log(query);
    var tempQuery = query;
    query = query.replace(' ', '+');
    var params = { 'api_key': apikey, 'q': query};
    params = encodeQueryData(params);


    httpGetAsync('http://api.giphy.com/v1/gifs/search?' + params, function(data) {

      var gifs = JSON.parse(data);
      var firstgif = gifs.data[0].images.fixed_width.url;

      console.log(tempQuery);
      objectGifs.push({
        className: tempQuery,
        url: firstgif
      })
    });
  }


  $("#submitButton").on("click", function() {

    objectGifs = [];
    for (let i = 0; i < objects.length; i++) {
      getGif(objects[i].className);
    }

  });

});
