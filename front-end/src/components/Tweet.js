import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import { getFromStorage, setInStorage } from "./storage";
import axios from 'axios';
import "../App.css";


function Block(props){
  //alert(props.name);
 // alert(getFromStorage('id'));

  if(props.name==getFromStorage('id')){
  return (
    <div>
      <div className="div">
        <h5>{props.name}</h5>
        <small>{props.time}</small><br/>
        Tweet
        <p>{props.tweet}</p>
        
        <p></p>
        <Link to={{pathname:"/edit/" + props.item._id
      
      }} >Edit </Link> 
        <button

          type="button"
          class="btn btn-danger"
          onClick={() => {
            props.delete(props.item._id);
          }}
        >
          Delete Post
        </button>
      </div>
    </div>
  );
        }
        else{

          return (
            <div>
              <div className="div">
                <h5>{props.name}</h5>
              
                <button style={{float:"right"}}type="button" class="btn btn-primary" 
                
                onClick={()=>{
                  props.follow(props.name)
                }}
                >
                  {props.status}
                </button>

                <small>{props.time}</small>
                <br />
                Tweet
                <p>{props.tweet}</p>
              </div>
            </div>
          );

        }

}

class Tweet extends Component{

    constructor(props){
        super(props);
        this.state = {
          tweets: [
            {
              name: "Alien",
              tweet: "This is aliens tweet",
            },
            {
              name: "Sani",
              tweet: "This is sani tweet",
            },

            {
              name: "Nanu",
              tweet: "This is nanus tweet",
            },
            
          ],
          newTweets:[],
          tweet:'',
          status:'follow'
        };
        this.delete=this.delete.bind(this);
        this.onChangeTweet=this.onChangeTweet.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.update=this.update.bind(this);
        this.follow=this.follow.bind(this);
        this.check=this.check.bind(this);
       
    
    }

    componentDidMount(){
         axios
           .get("http://localhost:4000/tweets")
           .then((res) => {
             this.setState({ newTweets: res.data });
           })
           .catch((err) => console.log(err));
         
          
    }
    
    update(index,tweet){

      const newList=[...this.state.tweets];
      newList[index].tweet=tweet;
      this.setState({
          tweets:newList
      })
    }

delete(id){
  alert("delete");
  alert(id);
  
  axios
    .delete("http://localhost:4000/tweets/" + id)
    .then((res) => {
      console.log(res.data)
    });
  this.setState({
    newTweets: this.state.newTweets.filter((list) => list._id !== id),
  });
  
}


onChangeTweet(e){
    this.setState({
        tweet:e.target.value,
    })
    
}

onSubmit(e){
e.preventDefault();
//alert(this.state.tweet);
const newPost={
    userId:getFromStorage("id"),
    tweet:this.state.tweet
}

axios.post("http://localhost:4000/postTweets",newPost)
.then((res)=>{
  //alert(res.data);
})


this.setState({
    tweet:''
})

this.componentDidMount();

}


follow(id){
  
  alert("follow");
  const users={
    userId:getFromStorage("id"),
    follows:id
  }
  
  if(this.state.status==="follow"){
    axios
      .post("http://localhost:4000/follow", users)
      .then((res) => alert(res.data))
      .catch((err) => alert(err));

  this.setState({
    status:"Following"

  })
  }

  
}

check(id){
    alert(id);
axios.get('http://localhost:4000/tweets/follows',{
  params:{
  
    userId:getFromStorage("id"),
    follows:id

  }
})
.then((res)=>{
  alert(res.data)
  if(res.data.status=="followed"){
    this.setState({
      status:"following"
    })
  }
  else{
    this.setState({
      status:"follow"
    })
    
  }
}).catch((err)=>{
  console.log(err)
})


}





    render(){

    return (
      <div>
        <p>From Component Tweet</p>
        <form onSubmit={this.onSubmit}>
            <input value={this.state.tweet} onChange={this.onChangeTweet} />
            <input type="submit" value="Tweet"/>
            
        </form>
        <br/><br/>


        {this.state.newTweets.reverse().map((item,index)=>(
        
            <Block tweets={this.state.tweets} key={item._id} name={item.userId} time={item.createdAt} tweet={item.tweet} delete={this.delete} status={this.state.status} update={this.update} item={item} follow={this.follow} check={this.check}/>
        ))}

       

       </div>
    );

    }
}


export default Tweet;