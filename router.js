function route(handle, pathname, response, request) {
  console.log('Route a request for ' + pathname)
  var displayUrl = '/show'
  if ('/start' === pathname) {
    handle[pathname](response, request)
  }
  else if ('/upload' === pathname) {
    handle[pathname](response, request)
  }
  else if (pathname.indexOf(displayUrl) >= 0) {
    handle[displayUrl](response, request, pathname.split(displayUrl)[1])
  }
  else{
    console.log("No request handler found for " + pathname);
    response.writeHead(404, {"Content-Type": "text/html"});
    response.write("404 Not found");
    response.end();
  }
}

exports.route = route