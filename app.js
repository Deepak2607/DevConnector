const express= require('express');
const mongoose= require("mongoose");
const bodyParser= require('body-parser');

const auth= require('./routes/api/auth');
const posts= require('./routes/api/posts');
const profile= require('./routes/api/profile');
const users= require('./routes/api/users');
const app= express();

const PORT= process.env.PORT || 8000;


//mongoose-driver
mongoose.Promise= global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/DevConnector',{ useNewUrlParser: true }).then((db)=> {
    console.log('MONGO connected');
}).catch((error)=> {
    console.log("error");
})


//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



app.use('/api/users',users);
app.use('/api/auth',auth);
app.use('/api/posts',posts);
app.use('/api/profile',profile);


app.listen(PORT, ()=> {
    console.log(`Server started on port ${PORT}`);
})