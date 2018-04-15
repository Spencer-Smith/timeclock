//-- Setup --//
// Express
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('dist'));

// Knex
const env = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[env];
const knex = require('knex')(config);

// bcrypt
let bcrypt = require('bcrypt');
const saltRounds = 10;


//-- Login and Register --//
app.post('/api/user', (req, res) => {
  if (!req.body.username || !req.body.password)
    return res.status(400).send();
  knex('users').where('username', req.body.username).first().then(user => {
    if (user !== undefined) {
      res.status(403).send("Username already exists");
      throw new Error('abort');
    }
    return bcrypt.hash(req.body.password, saltRounds);
  }).then(hash => {
    return knex('users').insert({ username:req.body.username, hash:hash,
     role:'user'});
  }).then(ids => {
    return knex('users').where('id', ids[0]).first();
  }).then(user => {
    res.status(200).json({ user:user });
    return;
  }).catch(error => {
    if (error.message !== 'abort') {
      console.log(error);
      res.status(500).json({ error });
    }
  });   
});

app.post('/api/user/login', (req, res) => {
  if (!req.body.username || !req.body.password)
    return res.status(400).send();
  knex('users').where('username', req.body.username).first().then(user => {
    if (user === undefined) {
      res.status(403).send("Invalid credentials");
      throw new Error('abort');
    }
    return [bcrypt.compare(req.body.password, user.hash), user];
  }).spread((result, user) => {
    if(result)
      res.status(200).json({ user:user });
    else
      res.status(403).send("Invalid credentials");
  }).catch(error => {
    if (error.message !== 'abort') {
      console.log(error);
      res.status(500).json({ error });
    }
  });
});


//-- Punching --//
app.get('/api/user/:id/punch', (req, res) => {
  let id = parseInt(req.params.id);
  knex('users').join('punches', 'users.id', 'punches.user_id')
  .where('users.id', id)
  .orderBy('punch_in')
  .select('punch_in', 'punch_out').then(punches => {
    res.status(200).json({ punches:punches });
  }).catch(error => {
    res.status(500).json({ error });
  });
});

app.post('/api/punch', (req, res) => {
  let id = req.body.id;
  let punch = req.body.punch;
  knex('users').where('id', id).first().then(user => {
    return knex('punches').insert({ user_id:id, punch_in:punch.punch_in,
     punch_out:punch.punch_out});
  }).then(ids => {
    return knex('punches').where('id',ids[0]).first()
    .orderBy('punch_in')
    .select('punch_in', 'punch_out');
  }).then(punches => {
    res.status(200).json({ punches:punches });
  }).catch(error => {
    res.status(500).json({ error });
  });
});

app.listen(8080, () => console.log('Server listening on port 8080!'))
