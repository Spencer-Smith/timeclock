const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('dist')) 

/*
user {
  username: string,
  password: string,
  punches: []
}
punch {
  in: date,
  out: date,
}
*/
let users = new Map();

function guid() {
  function s4() {
    return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + '-' + s4() + s4();
}

app.post('/api/user/', (req, res) => {
  let id = req.body.username;
  if (! users.has(id)) {
    let user = { username: id, password: req.body.password, punches: [] };
    users.set(id, user);
    res.send(user);
    return;
  }
  res.status(404).send("Username already exists");
});

app.get('/api/user/:id/:password', (req, res) => {
  let id = req.params.id;
  if (! users.has(id)) {
    res.status(404).send("Username does not exist");
    return;
  }
  let user = users.get(id);
  let password = req.params.password;
  if (password === user.password)
    res.send(user);
  else
    res.status(404).send("Incorrect password");
});

app.post('/api/punch/', (req, res) => {
  let id = req.body.user.username;
  let password = req.body.user.password;
  let punch = req.body.punch;
  if (! users.has(id)) {
    res.status(404).send("Could not find record of user with that id");
    return;
  }
  if (password === users.get(id).password) {
    user = users.get(id).punches.push(punch);
    res.sendStatus(200);
    return;
  }
  res.status(404).send("Incorrect password");
});

app.listen(8080, () => console.log('Server listening on port 8080!'))
