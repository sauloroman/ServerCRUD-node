const fs = require('fs');
const path = require('path');

const filePath = path.resolve('./db/data.json');

const getMethod = () => {

      if ( !fs.existsSync( filePath ) ) {
            fs.writeFileSync( filePath, JSON.stringify([]))
      }

      const fileContent = fs.readFileSync( filePath, { encoding: 'utf-8'} );

      return fileContent;
}

const postMethod = ( data ) => {
      const tasks = getMethod();

      let tasksArr = JSON.parse( tasks );

      tasksArr = [ JSON.parse( data ), ...tasksArr ];

      fs.writeFileSync( filePath, JSON.stringify( tasksArr ))
}

const updateMethod = ( id, data ) => {
      const tasks = getMethod();

      let tasksArr = JSON.parse( tasks );

      tasksArr = tasksArr.map( task => {
            if ( task.id === id ) {
                  return JSON.parse( data );
            }

            return task;
      });
      
      fs.writeFileSync( filePath, JSON.stringify( tasksArr ))
}

const deleteMethod = ( id ) => {
      const tasks = getMethod();

      let tasksArr = JSON.parse( tasks );

      tasksArr = tasksArr.filter( task => task.id !== id );

      fs.writeFileSync( filePath, JSON.stringify( tasksArr ))
}

module.exports = {
      getMethod,
      postMethod,
      deleteMethod,
      updateMethod
}