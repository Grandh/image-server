var Service = require('node-windows').Service;
 
// Create a new service object 
var svc = new Service({
  name:'Image-server',
  description: 'A general Image server.',
  script: 'D:\COPDProject\image-server\image-server.config.js'
});
 
// Listen for the "install" event, which indicates the 
// process is available as a service. 
svc.on('install',function(){
  svc.start();
});
 
svc.install();