const http = require('http');
const { 
      getMethod, 
      postMethod, 
      deleteMethod, 
      updateMethod } = require('./helpers/dbOperations.js');

const server = http.createServer( async ( request, response ) => {
      
      const requestMethod = request.method;
      const requestUrl = request.url;

      if ( requestUrl.startsWith('/apiv1/tasks') ) {
            
            switch( requestMethod ) {
            
                  case 'GET':
                        const fileContent = getMethod();
                        response.writeHead('200', 'Content-Type', "application/json" );   
                        response.write( fileContent );
                  break;
            
                  case 'POST':
                        request.on( 'data', data => {
                              postMethod( data );      
                        } );
                        response.writeHead('201', 'Content-Type', "application/json");
                  break;
            
                  case 'PUT':
                        const idUpdate = Number(requestUrl.at(-1));
                        request.on('data', data => {
                              updateMethod( idUpdate, data );
                        })
                        response.writeHead('200', 'Content-Type', "application/json");
                  break;
            
                  case 'DELETE':
                        const idDelete = Number(requestUrl.at(-1));
                        deleteMethod(idDelete);
                        response.writeHead('200', 'Content-Type', "application/json");
                  break;
            }

      } else {
            response.writeHead('503');
      }

      response.end();

}).listen( 8000 );