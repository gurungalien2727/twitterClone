
import React,{Component} from 'react';
import axios from 'axios';

class Edit extends Component{


    constructor(props){
        super(props);
         this.state = {
           tweet: "",
         };
         this.onChange=this.onChange.bind(this);
         this.onSubmit=this.onSubmit.bind(this);
    }

    componentDidMount(){
      alert(this.props.match.params.id);
      //localhost:4000/tweets
      http: axios
              .get("http://localhost:4000/" + this.props.match.params.id)
              .then((res) => {
                this.setState({
                  tweet: res.data.tweet,
                });
              })
              .catch((err) => {
                alert(err);
              });
      }
      


    onChange(e){
        this.setState({
            tweet:e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();
        axios.put("http://localhost:4000/update/"+this.props.match.params.id,{newTweet:this.state.tweet})
        .then((res)=>alert(res.data))
        .catch((err)=>alert(err));

      window.location="/homepage";
    }

    render(){

  return (
    <div className="divTweet">
     
      <textarea
        class="form-control"
        id="exampleFormControlTextarea1"
        rows="3"
        type="textarea"
        value={this.state.tweet}
        onChange={this.onChange}
      ></textarea>
      <button
        style={{ float: "right" }}
        type="button"
        class="btn btn-primary"
        onClick={this.onSubmit}
      >
        Edit
      </button>
    </div>
  );
    }


}

export default Edit;