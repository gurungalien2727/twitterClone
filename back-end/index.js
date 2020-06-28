
const app=require('express')();
const bodyParser=require('body-parser');
const cors=require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

const data={
    email:'a@gmail.com',
    password:'pass'
}

app.post('/',(req,res)=>{
//console.log(req.body.username+" "+req.body.password); 
if(req.body.email==data.email){

     if(req.body.password==data.password){
         res.send({
             login:"sucessful"
         })
     }

     else{
         res.send({login:"unsucessful"})
     }
}
else{
res.send({
    login:"unsucessful"
});}

})


app.listen(4000,()=>{
    console.log("Serving running on port 4000");
})