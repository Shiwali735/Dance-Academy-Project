const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser")
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});
const port = 8000;

//Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    address: String,
    email: String,
    desc: String,
    about: String
  });

  const contact = mongoose.model('contact', contactSchema);
// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'))// for serving static files
app.use(express.urlencoded())//for 26th line for parsing

// PUG SPECIFIC STUFF
app.set('view engine', 'pug')// Set the template engine as pug
app.set('views', path.join(__dirname, 'views'))// Set the views directory

app.get('/', (req, res)=>{
    const params = { }
res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = { }
res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
    res.send("This item has been saved to the database");
    }).catch(()=>{
    res.status(400).send("item was not saved to the databse");
    });
    // res.status(200).render('contact.pug');
})
app.get('/index', (req, res)=>{
    const params = { }
res.status(200).render('index.pug', params);
})
// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started on port ${port}`);
});