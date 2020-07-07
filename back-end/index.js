const app=require('express')();
const bodyParser=require('body-parser');
const cors=require('cors');
const mongoose=require('mongoose');
const User=require('./models/User');
const Tweet=require('./models/Tweets');
const Follows=require('./models/Follows');
const e = require('express');
const ts= Date.now();


mongoose.connect(
  "mongodb+srv://alien:alien@cluster0-lwriy.gcp.mongodb.net/Twitter?retryWrites=true&w=majority",
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
);

const connection = mongoose.connection;
connection.openUri("open", () => {
  console.log("Database connection established sucessfully");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

const data={
    email:'a@gmail.com',
    password:'pass'
}


app.post('/',(req,res)=>{
console.log(req.body.username+" "+req.body.password); 
User.findOne({ username: req.body.username, password: req.body.password }).then(function (doc) {
  if (!doc) {console.log("No record found")
     res.json({login:"unsucessful"});
}
  else {
    console.log(doc._id);
    res.json({login:"sucessful",id:doc._id,username:doc.username});
  }
});
})
//registration
app.post('/register',(req,res)=>{
  const username=req.body.username;
  const password=req.body.password;
  const newUser=new User({
      username,password
  });
   newUser
     .save()
     .then(() => res.json("New User Registered"))
     .catch((err) => { res.json(err);
    console.log(err)});
})

//add tweets
app.post('/postTweets',(req,res)=>{
  console.log("Endpoint hit");
  const username=req.body.username;
  const tweet=req.body.tweet;
  const date=ts;
  const newTweet=new Tweet({
      username,tweet,date
  })
  newTweet.save().then(()=>res.json("New Tweet Added"))
  .catch((err)=>res.status(400).json("Error:"+err))
});


//getting tweets
app.get('/tweets',(req,res)=>{
  
  Tweet.find().then((tweet)=>res.json(tweet))

 .catch(err=>res.status(400).json('Error: '+ err));
}
)

//deleting tweets
app.delete('/tweets/:id',(req,res)=>{
  console.log("delete point hit");
  
  Tweet.findByIdAndDelete(req.params.id)
  .then((tweet)=>{res.json("Tweet Deleted")})
  .catch((err)=>{
    res.status(400).json("Error:"+err);
  })
})

//updating tweet

app.put('/update/:id',(req,res)=>{
  console.log("update point hit");
  
  Tweet.findById(req.params.id)
  .then((tweet)=>{
    console.log(tweet);
      tweet.tweet=req.body.newTweet;
      tweet.date=ts;
console.log(tweet);
      tweet.save()
      .then(()=>res.json("Tweet Updated"))
      .catch((err)=>res.status(400).json("Error:"+err));
})  
.catch((err)=>res.status(400).json("Error"+err));
})


//get single tweet
app.get('/:id',(req,res)=>{
  console.log(req.params.id);
  Tweet.findById(req.params.id)
  .then((tweet)=>{res.json(tweet)})
  .catch((err)=>{
    res.json("Error:"+err);
  })
})


/


app.listen(4000,()=>{
    console.log("Server running on port 4000");
})