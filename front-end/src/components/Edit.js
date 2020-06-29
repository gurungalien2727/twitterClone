
import React,{Component} from 'react';

class Edit extends Component{


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
           tweet: "",
         };
         this.onChange=this.onChange.bind(this);
         this.onSubmit=this.onSubmit.bind(this);
    }

    componentDidMount(){

        this.setState({
           tweet: this.state.tweets[this.props.match.params.id].tweet
        })


    }

  
    onChange(e){
        this.setState({
            tweet:e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();
        const newList=[...this.state.tweets];
        newList[this.props.match.params.id].tweet=this.state.tweet;
        this.setState({
            tweets:newList
        })
     
        this.setState({
            tweet:''
        })
        
        //window.location="/homepage";
    }



    render(){


        return (<div>

From Component Edit
         <form onSubmit={this.onSubmit}>

<input type="text" value={this.state.tweet} onChange={this.onChange}/>
<input type="submit" value="Edit"/>


         </form>

         {this.state.tweets.map((item)=>(
             <p>{item.tweet}</p>
         ))}



        </div>)



    }


}

export default Edit;