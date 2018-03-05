var querystring = require('querystring')
fs = require('fs')
uuid = require('uuid')
var iconv = require('iconv-lite')
formidable = require('formidable')

exports.start = function(response) {
  console.log('=== start was called ===')
  var body = '<html>'+
  '<head>'+
  '<meta http-equiv="Content-Type" content="text/html; '+
  'charset=UTF-8" />'+
  '</head>'+
  '<body>'+
  '<form action="/upload" enctype="multipart/form-data" '+
  'method="post">'+
  '<input type="file" name="imageFile" multiple="multiple">'+
  '<input type="submit" value="Upload file" />'+
  '</form>'+
  '</body>'+
  '</html>';
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(body);
  response.end();
}

exports.upload = function(response, request) {
  console.log('=== upload was called ===');
  var form = new formidable.IncomingForm()
  form.uploadDir = './public/upload'

  form.parse(request, function(err, fields, files){
    // 唯一的保存文件名
    var originFilename = files.imageFile.name.split('\.')
    var prefix = iconv.encode(originFilename[0], 'utf-8');
    // var prefix = originFilename[0]
    var suffix = originFilename[1]
    // var filename = prefix + '_' + uuid.v1() + '.' + suffix
    var filename = uuid.v1() + '.' + suffix

    fs.renameSync(files.imageFile.path, './public/images/' + filename)
    response.writeHead(200, {"Content-Type":'text/json;charset=utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'})
    imageUrl = 'http://' + request.headers.host + '/show/' + filename
    response.write(JSON.stringify({'url': imageUrl}));
    response.end();
  })
}

exports.show = function(response, request, imageFilename){
  console.log('=== show image was called ===');
  fs.readFile('./public/images' + imageFilename, 'binary', function(err, file) {
    if(err){
      response.writeHead(200, {"Content-Type": "text/html"})
      response.write('<img src="https://dummyimage.com/600x400/ffffff/000000&text=No Found">')
      response.end();
    }else{
      response.writeHead(200, {"Content-Type": "image/jpeg"})
      response.write(file, 'binary')
      response.end();
    }
  });
}