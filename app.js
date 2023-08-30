const express = require("express");
const path = require("path");
const app = express();

const port = process.env.PORT || 2711;
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Portfolio')
.then(()=>{
    console.log(`CONNECTED`);
}).catch(`not connected`);

//Define Mongoose Schema
const contactSchema = new mongoose.Schema({
    name : {
        type:"string",
        required:true
    },
   age : {
        type: Number,
        required:true
    },
    mobile : {
        type: Number,
        required:true,
        unique: true
    },
    address: {
        type:"string",
        required:true
    },
    more: {
        type:"string",
        required:true
    }
});
const Contact = mongoose.model("Contact", contactSchema);


// EXPRESS SPECIFIC STUFF
app.use(bodyParser.json())
app.use('/static', express.static('static')) // For serving static files
app.use(bodyParser.urlencoded({ extended: false }))

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = { }
    res.status(200).render('home.pug', params);
})
app.get('/contacts', (req, res)=>{
    const params = { }
    res.status(200).render('contacts.pug', params);
})
app.get('/experiences', (req, res)=>{
    const params = { }
    res.status(200).render('experiences.pug', params);
})
app.get('/about', (req, res)=>{
    const params = { }
    res.status(200).render('about.pug', params);
})
//Api
app.post('/contacts', (req, res)=>{
    const contact= new Contact({
        name : req.body.name,
        age : req.body.age,
        mobile : req.body.mobile,
        address :req.body.address,
        more :req.body.more
    })
    contact.save(contact)
    .then((data)=>{
         res.send(data)
    })
    .catch(err=>console.log(err))
   

});


// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});

