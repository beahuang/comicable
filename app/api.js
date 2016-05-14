module.exports = server => {

  server.route({

      method: 'GET',
      path: '/',
      handler: ( request, reply ) => {
        reply('Hello, world!');
      }

  });

};
