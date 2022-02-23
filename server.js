/* CREATING THE SERVER IN EXPRESS TO RUN OUR WEBSITE */
/* CREATING THE VARIABLES WHICH ARE REQUIRED TO STORE THE MODUES */
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const port = 8000;
const mongoose = require('mongoose');

/* SETTING THE TEMPLATE ENGINE AS HTML ALONG WITH STATIC FOLDER */
app.set('/views', path.join(__dirname, 'views'));

app.use('/static', express.static('static'));
app.use(express.urlencoded());

/* BACKEND FOR RENDERING THE PAGES ACCORDING TO GET REQUEST */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/home.html'));
})
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/home.html'));
})

app.get('/subscription', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/subscription.html'));
})
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/contact.html'));
})
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/login.html'));
})
app.get('/guide', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/guide.html'));
})
app.get('/payment', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/payment.html'));
})
app.get('/map', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/map.html'));
})
app.get('/aboutus', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/aboutus.html'));
})



/*------------------------*/
/* SETTING UP THE MONGO DATABASE FOR THE BACKEND */
/* LOGIN PAGE DATABASE*/
mongoose.connect("mongodb://localhost/EV-finder", { UseNewUrlParser: true });

var charging_signup = new mongoose.Schema({
    username: String,
    email: String,
    password: String
})


var signup = new mongoose.model('signup', charging_signup);

app.post('/signup', (req, res) => {
    let data = new signup(req.body);
    data.save().then(() => {
        res.sendFile(path.join(__dirname + '/views/homemsg.html'));
    }).catch(() => {
        res.send("Error !!! Can't connect to the database");
    })
})


app.post('/login', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const username = await signup.findOne({ email: email });
        if (username.password === password) {
            res.sendFile(path.join(__dirname + '/views/home.html'));
        }
        else {
            res.sendFile(path.join(__dirname + '/views/homeerror.html'));
        }
    }
    catch {
        res.send("Details are Invalid");
    }
})

/* SUBSCRIPTION PAGE DATABASE */
var charging_sub = new mongoose.Schema({
    firstname: String,
    email: String,
    address: String,
    city: String,
    state: String,
    zip: String,
    cardname: String,
    cardnumber: String,
    expmonth: String,
    expyear: String,
    cvv: String,

})

var sub = new mongoose.model('sub', charging_sub);

app.post('/subscription1', (req, res) => {
    let data = new sub(req.body);
    data.save().then(() => {
        res.send("Your data Has been saved successfully");
    }).catch(() => {
        res.send("Error ! Can't connect to the database");
    })
})

/* CONTACT PAGE DATABASE*/
var charging_contact = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
})

var contact = new mongoose.model('contact', charging_contact);

app.post('/contact', (req, res) => {
    let data = new contact(req.body);
    data.save().then(() => {
        res.send("Your Data has been saved successfully");
    }).catch(() => {
        res.send("Error ! Can't connect to Database")
    })
})


/* THIS IS TO RUN THE WEBSITE ON PARTICULAR HOST */
app.listen(port, () => {
    console.log(`Server is successfully running on http://localhost:${port}`);
})

/*----------------------------------------------*/
