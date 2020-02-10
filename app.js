var express = require('express');
var bodyParser = require('body-parser');
var app = express();

let users = [];

app.set('view engine' ,'ejs');
app.use(express.static('./views'));
app.set('views', __dirname + '/views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

// GET REQ
app.get('/',(req , res)=>{
    res.redirect('/login');
})

app.get('/login',(req , res)=>{
    res.render('login')
})

app.get('/reg',(req , res)=>{
    res.render('register')
})

app.get('/list', (req, res)=> {
	res.render('list', {
        arr: users
    })
})

// POST REQ
app.post('/user/add', (req, res)=> {
    let newUser = {
        name: req.body.name,
        email: req.body.email,
        pass: req.body.pass,
        phone: req.body.phone,
        address: req.body.address,
    }
    users.push(newUser)
    res.redirect('/');
})

app.post('/user/login', (req, res)=> {
    let found = false
    let loginUser = {
        email: req.body.email,
        pass: req.body.pass,
    }
    for (x of users) {
        if(x.email == req.body.email && x.pass == req.body.pass) {
            found = true
            res.redirect('/list')
        }
    }
    if (!found) {
        res.redirect('/');
    }
})

app.listen(3000, ()=>{
    console.log('app is running at port 3000')
});
