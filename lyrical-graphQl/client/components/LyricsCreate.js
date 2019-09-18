import React,{Component} from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

class LyricsCreate extends Component{
    constructor(props){
        super(props)
        
        this.state = {
            content:" "
        }
    }

    onSubmitHandler(){
        event.preventDefault();
        this.props.mutate({
            variables:{
                content:this.state.content,
                songId:this.props.songId
            }
        })
        .then(()=>this.setState({content:""}));
    }
    
    render(){

        return(
            <form onSubmit={this.onSubmitHandler.bind(this)}>
                <label>Add lyric</label>
                <input
                value={this.state.content}
                onChange={event=>this.setState({content:event.target.value})}
                />
            </form>
        );
    }
}

const mutation=gql`mutation AddLyric($content:String,$songId:ID!){
    addLyricToSong(content:$content,songId:$songId){
      id,
      title,
      lyrics{
        id,
        content,
        likes
      }
    }
  }`;
export default  graphql(mutation)(LyricsCreate);