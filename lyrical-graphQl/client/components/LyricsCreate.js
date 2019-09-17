import React,{Component} from 'react';
import gql from 'graphql-tag';
import graphql from 'react-apollo';
import Link from 'react-router';

class LyricsCreate extends Component{


    render(){

        return(
            <form>
                <label>Add lyric</label>
                <input></input>
            </form>
        );
    }
}

export default LyricsCreate;