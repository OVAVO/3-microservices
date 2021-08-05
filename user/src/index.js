const express = require('express')
const session = require("express-session");
const bodyParser = require("body-parser");
const connectFlash = require("connect-flash");
const connectEnsureLogin = require('connect-ensure-login');
const passport = require('passport');

const localStrategy = require('./config/local-strategy');
localStrategy(passport);


const app = express()
const port = 3000

app.use(express.static("public"));
app.use(session({ secret: "javascriptifySecret", resave: true, saveUninitialized: false }));
app.use(connectFlash());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

const mongoose = require('mongoose');
mongoose.connect('mongodb://root:rootpassword@user-database:27017/control-panel?authSource=admin', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

const kittySchema = new mongoose.Schema({
    name: String
  });

const Kitten = mongoose.model('Kitten', kittySchema);

const silence = new Kitten({ name: 'Silence' });
console.log(silence.name);

app.get('/hello', (req, res) => {
  res.send('Hello World!')
})

// // Local strategy routing
// app.get('/login', (req, res) => {
//   res.sendFile('public/login.html', {root: __dirname });
// });
// app.post('/login',
//   passport.authenticate('local', {
//       successRedirect: '/',
//       failureRedirect: '/login',
//       failureFlash: true
//   })
// );

// app.get('/', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
//   console.log(req.user); // { id: 1, username: 'umutcakir', password: 'salt:test', salt: 'salt' }
//   res.send('Hello World!');
// });

app.use('/', require('./router/index.js'));
app.use('/users', require('./router/user.js'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})