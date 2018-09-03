let express = require('express');
let app = express();

let http = require('http');
let server = http.Server(app);

let cors = require('cors');

app.use(cors());

let socketIO = require('socket.io');
let io = socketIO(server);

const port = process.env.PORT || 3000;

let randomAvatar = "https://api.adorable.io/avatars/62/";

let bots = [
  {
    userName: 'Echo Bot',
    description: 'Lorem ipsum dolor sit amet, Echo Bot adipiscing elit.',
    id: 'EchoBot',
    avatar: `${randomAvatar}EchoBot`,
    isConnected: true
  },
  {
    userName: 'Reverse Bot',
    description: 'Lorem ipsum dolor sit amet, Revese Bot adipiscing elit.',
    id: 'ReverseBot-id',
    avatar: `${randomAvatar}ReverseBot`,
    isConnected: true
  },
  {
    userName: 'Spam Bot',
    description: 'Lorem ipsum dolor sit amet, Spam Bot adipiscing elit.',
    id: 'SpamBot',
    avatar: `${randomAvatar}SpamBot`,
    isConnected: true
  },
  {
    userName: 'Ignore Bot',
    description: 'Lorem ipsum dolor sit amet, Ignore Bot adipiscing elit.',
    id: 'IgnoreBot',
    avatar: `${randomAvatar}IgnoreBot`,
    isConnected: true
  },
];

let clientListNames = [...bots];


function randomizeName(int) {
  return `User${Math.floor(Math.random() * Math.floor(int))}`;
}

function reverseString(str) {
  return str.split("").reverse().join("");
}

app.get('/clientlist', function (req, res) {
  res.json(JSON.stringify(clientListNames))
});

io.on('connection', (socket) => {
  console.log('user connected');
  let randomName = randomizeName(9999);

  let userData = {
    userName: socket.handshake.query.userName = randomName,
    id: socket.id,
    avatar: `${randomAvatar}${randomName}`,
    isConnected: true
  };

  clientListNames.push(userData);
  io.emit("updateSocketList", clientListNames);
  io.emit("addUserToSocketList", socket.handshake.query.userName);


  socket.on('disconnect', function () {
    console.log(`${socket.handshake.query.userName} disconnected`);

    for (let key in clientListNames) {


      if (clientListNames[key].id === socket.id) {
        clientListNames[key].isConnected = false;
      }

    }
  });

  socket.on('sendMessageToBot', (id, message, userData) =>{

    if(id === bots[0].id){
      let userMessage = message;
      setTimeout(function(){
        this.join() = () => {
            socket.emit('add user', id);
            socket.emit('EchoBotAnswer', message);

            socket.on('user joined', userData.userName);
            socket.on('user left', userData.userName);
            socket.on('new message', userMessage);
            socket.on('client left', this.userId);
          };
      }, 5000);


      socket.to(id).emit(message,userData);
      console.log(id, message, userData);
    }

    if(id === bots[1].id){
      let userMessage = message;
      setTimeout(function(){
        this.join() = () => {
          socket.emit('add user', id);
          socket.emit('ReverseBotAnswer', reverseString(userMessage));

          socket.on('user joined', userData.userName);
          socket.on('user left', userData.userName);
          socket.on('new message', userMessage);
          socket.on('client left', this.userId);
        };
      }, 3000);


      socket.to(id).emit(message,userData);
      console.log(id, message, userData);
    }

  })



  socket.on('new-message', (message) => {
    console.log(message);
    io.emit('new-message', message, userData);
  });
  // console.log(socket.id);
  // console.log(clientListNames);
});

server.listen(port, () => {
  console.log(`started on port: ${port}`);
});
