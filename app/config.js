const data = {
  mongoURL : {
    development: 'mongodb://localhost:27017/comicable',
    test: 'mongodb://localhost:27017/comicabletest',
    production: 'mongodb://localhost:27017/comicable',
  }
}

let get = key => {
  console.log( process.env.ENV );
  let env = process.env.NODE_ENV || 'development';
  return data[ key ][ env ];
}

module.exports = get;
