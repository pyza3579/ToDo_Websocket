const express = require('express');
const socket = require('socket.io');
const app = express();

let tasks = [
  { id: 'dfsadf324s', name: 'Shopping'}, 
  { id: 'dfs2ad6724s', name: 'Go out with a dog'},
];

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);  

io.on('connection', (socket) => {
  //console.log('New client! Its id – ' + task);
  socket.emit('updateData', tasks);

  socket.on('addTask', ({id, name}) => {
    tasks.push({
      id: id,
      name: name,
    });
    socket.broadcast.emit('addTask', ({id, name}));
  });
  socket.on('removeTask', (id) => {
    console.log('Task removed: ' + task);
    tasks.filter((task) => {return task.id != id});
    socket.broadcast.emit('removeTask', id);  
  });

});

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});
