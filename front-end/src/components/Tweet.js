import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import '../App.css';



function Block(props){



  return (
    <div>
      <div className="div">
        <h3>{props.name}</h3>
        <p>{props.tweet}</p>
        <Link to={{pathname:"/edit/" + props.index,
      
      }} >Edit </Link> 
        <button

          type="button"
          class="btn btn-danger"
          onClick={() => {
            props.delete(props.index);
          }}
        >
          Delete Post
        </button>
      </div>
    </div>
  );


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
          tweet:''
        };
        this.delete=this.delete.bind(this);
        this.onChangeTweet=this.onChangeTweet.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.update=this.update.bind(this);
    
    }

    update(index,tweet){

      const newList=[...this.state.tweets];
      newList[index].tweet=tweet;
      this.setState({
          tweets:newList
      })


    }




delete(index){
  alert("delete");
  alert(index);
  const newTweets=[...this.state.tweets];
  newTweets.splice(index,1);
  this.setState({
      tweets:newTweets
  })
  
}




onChangeTweet(e){
    this.setState({
        tweet:e.target.value,
    })
    
}

onSubmit(e){
e.preventDefault();
alert(this.state.tweet);
const newPost={
    name:"newName",
    tweet:this.state.tweet
}

const newTweets=[...this.state.tweets,newPost];
this.setState({
    tweets:newTweets
})

this.setState({
    tweet:''
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


        {this.state.tweets.map((item,index)=>(
            <Block tweets={this.state.tweets} index={index} name={item.name} tweet={item.tweet} delete={this.delete} update={this.update} />
        ))}

       

       </div>
    );

    }
}


export default Tweet;