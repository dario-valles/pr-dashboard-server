const app = require('express')();
const port = process.env.PORT || 3001;
const io = require('socket.io')();
const mongoose = require('mongoose');
require('./models/User');
const User = require('./models/User.js');

let socket;

io.on('connection', async function(client) {
  socket = client;

  // A connection with a client has been established
  console.log('New connection: ', client.id);

  client.on('hook-id-to-user', async function(username) {
    // Ensure the ID is assigned to the user
    console.log(`Ensure the user ${username} has the SocketID ${client.id}`);
    const existingSocket = await User.findOne({
      loginName: username,
      'socket.socketId': client.id
    });

    if (!existingSocket) {
      await User.findOneAndUpdate(
        { loginName: username },
        {
          $push: {
            socket: {
              socketId: client.id
            }
          }
        }
      );
    }
  });

  client.on('disconnect', async function() {
    // Ensure the `client.id` does not exist for any user in the database
    console.log(`Connection dropped: ${client.id}`);
    const remSocket = await User.findOne({
      'socket.socketId': client.id
    });

    if (remSocket) {
      await remSocket.update({
        $pull: {
          socket: { socketId: client.id }
        }
      });
    }
  });
});

const tearDown = () =>
  new Promise(resolve => {
    // console.log('MONGOOSE CONNECTION', mongoose.connection);
    io.close(async (err, data) => {
      // await mongoose.connection.close(true, () => {
      // http.close((err, data) => {
      console.log('HTTP SERVER CLOSED', err, data);
      resolve();
      // });
      // });
    });
  });

module.exports = {
  app,
  io,
  socket,
  tearDown
};
