module.exports = {
    apps : [{
      name        : "image-server",
      script      : "./image-server.js",
      watch       : true,
      env: {
        "NODE_ENV": "development",
      },
      env_production : {
         "NODE_ENV": "production"
      }
    }]
  }