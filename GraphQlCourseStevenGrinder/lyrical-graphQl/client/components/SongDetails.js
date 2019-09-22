import React,{Component} from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import {Link} from 'react-router';
import LyricCreate from './LyricsCreate';
import LyricList from './LyricList';

class SongDetails extends Component{
   
 
    render(){

        const {song}=this.props.data;

        if(!song){
            return <div>loading...</div>
        }
        return(
            <div>
                <Link to="/">back</Link>
                <h3>Song Details</h3>
                <h5>{song.title}</h5>
                <LyricList lyrics={song.lyrics}/>
                <LyricCreate songId={this.props.params.id}/>
            </div>
        );
    }
}

const query= gql `query SongQuery($id:ID!){
    song(id:$id){
      id,
      title,
      lyrics{
          id,
          content,
          likes
      }
    }
  }`
export default graphql(query,{
    options:(props)=>{ return {variables:{id:props.params.id}}}
})(SongDetails);